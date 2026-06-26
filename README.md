# Server-Side A/B Testing — Next.js (App Router) + GrowthBook

A demo that runs a **100% server-side** A/B test on a landing-page CTA using
**GrowthBook Cloud** via the **Flags SDK** (`flags` + `@flags-sdk/growthbook`) —
GrowthBook's recommended Next.js App Router pattern. **No client-side SDK, no
flicker, no hydration swap:** the variant is decided on the server before any
HTML is sent.

**🔗 Live demo: https://server-side-ab-testing.vercel.app/**

The demo site is **Flowly**, a fake project-management SaaS landing page. The
experiment swaps the hero CTA text:

| Variation | CTA text |
| --------- | -------- |
| A (control) | `Start Free Trial` |
| B | `Get Started — No Credit Card` |

---

## How the server-side flow works

```
HTTP request
   │
   ▼
await heroCtaFlag()    → Flags SDK evaluates the flag ON THE SERVER
   │                       ├─ identify()  → getUserId() reads cookie (or mints one)
   │                       │                returns { id: userId }
   │                       └─ GrowthBook adapter buckets the user from { id }
   │                          using the CLIENT key, against the GrowthBook CDN
   ▼
   → "Start Free Trial"  OR  "Get Started — No Credit Card"
   ▼
render <Hero ctaText={...} />   → final text is baked into the HTML
   │
   ▼
HTML sent to browser   → first paint already shows the chosen variant
```

The variant is chosen **before a single byte of HTML is sent**, so the user
never sees the text change. The browser receives plain HTML — the GrowthBook
SDK is never downloaded or executed client-side.

---

## Project structure

```
flags.ts                The flag definition (Flags SDK + GrowthBook adapter)
app/
  layout.tsx            Root layout + metadata
  page.tsx              SERVER COMPONENT — evaluates the flag, renders the page
  globals.css           Tailwind v4 entrypoint
  api/track/route.ts    Route Handler — records the "cta_clicked" conversion
components/
  Navbar.tsx            Dark navy navbar (server)
  Hero.tsx              Hero section, receives ctaText as a prop (server)
  Features.tsx          3-up feature grid (server)
  Pricing.tsx           Single pricing plan (server)
  Footer.tsx            Footer (server)
  CtaButton.tsx         CLIENT COMPONENT — fires the conversion on click
  EnsureUserCookie.tsx  CLIENT COMPONENT — persists the visitor id (no GrowthBook)
lib/
  growthbook.ts         SERVER-ONLY adapter config + exposure tracking callback
  identify.ts           Maps the visitor to GrowthBook attributes { id: userId }
  getUserId.ts          Reads/mints the userId cookie (server, deduped per request)
```

> GrowthBook is touched only in server files: `flags.ts`, `lib/growthbook.ts`,
> `lib/identify.ts`, and `app/page.tsx`. None have `"use client"`. The client
> components (`CtaButton`, `EnsureUserCookie`) never import GrowthBook or the SDK.

---

## 1. GrowthBook dashboard setup (Cloud, free tier)

1. **Create an account** at <https://app.growthbook.io> (free tier is fine).

2. **Create the feature flag**
   - Go to **Features → Add Feature**.
   - **Feature Key:** `hero-cta-text`  ← must match the code exactly.
   - **Value Type:** `String`.
   - **Default value:** `Start Free Trial` (this is the control / variant A).
   - Click **Create**.

3. **Add an Experiment to the feature** (this is what makes the value differ
   per user — a default value alone serves everyone the same text)
   - Open the `hero-cta-text` feature → **Add Experiment → Create new Experiment**.
   - A wizard opens: **Overview → Traffic → Targeting → Metrics**.
     - **Overview:** name it (e.g. `hero-cta-text`); keep the tracking key `hero-cta-text`.
     - **Traffic:**
       - **Assign value based on attribute:** `id`  ← the bucketing key (must
         match `identify()` → `{ id: userId }`).
       - **Variations (2):** `control` → `Start Free Trial`, `variant-b` →
         `Get Started — No Credit Card`.
       - **Split:** 50% / 50%, 100% coverage.
     - **Targeting:** leave default (all users).
     - **Metrics:** optional — leave **Data Source** and **Goal Metrics** empty
       (they only matter for *analyzing* results). Click **Save to Draft**.
   - Back on the feature, **Review & Publish** (or toggle the environment on) to
     push the rule live. If prompted to **Start** the experiment, do so —
     otherwise it won't bucket users yet.

4. **(Optional) Read results later**
   - Per-user assignment + the `cta_clicked` event logged in
     `app/api/track/route.ts` is the part this project demonstrates, and it works
     fully on the free tier with no warehouse.
   - To get automated win/lift stats, connect a Data Source, create a `CTA Clicked`
     metric (Binomial, pointed at the `cta_clicked` event), and add it as the
     experiment's goal metric.

5. **Get your CLIENT key**
   - Go to **SDK Connections → Add SDK Connection**.
   - **Language:** JavaScript. **Environment:** Production.
   - Copy the **Client Key** (starts with `sdk-...`).
   - ⚠️ Use the **Client key**, never the Secret key.

---

## 2. Run it locally

```bash
# install
npm install

# add your key
cp .env.local.example .env.local
#   then edit .env.local and paste your sdk-... client key into
#   GROWTHBOOK_CLIENT_KEY

# dev server
npm run dev
# open http://localhost:3000
```

Environment variables (`.env.local`):

```
GROWTHBOOK_API_HOST=https://cdn.growthbook.io
GROWTHBOOK_CLIENT_KEY=sdk-xxxxxxxxxxxx
```

---

## 3. Verify the experiment is working

**A) Both variants render & bucketing is sticky**

- Load the page — note the CTA text.
- Refresh several times → the text **never changes** (your cookie pins your
  variation).
- To see the *other* variant, open a private/incognito window (fresh cookie),
  or delete the `flowly_uid` cookie in DevTools → Application → Cookies.
- Watch the **server terminal**: every bucketed view logs
  `[GrowthBook] exposure { ... variationId: 0 | 1 }`.

**B) It's truly server-side (no client JS flicker)**

- View raw server HTML — the chosen text is already in it:
  ```bash
  curl -s http://localhost:3000 | grep -oE 'Start Free Trial|Get Started — No Credit Card'
  ```
- Confirm the SDK is **not** shipped to the browser (this prints nothing):
  ```bash
  curl -s http://localhost:3000 | grep -i growthbook
  ```
- In Chrome DevTools → **Network**, throttle to *Slow 3G* and reload. The CTA
  appears with its final text on first paint — it does not start as one value
  and swap to another.
- DevTools → **Settings → Debugger → Disable JavaScript**, then reload. The page
  (and the correct CTA text) still renders, because it's server HTML.

**C) Conversion tracking**

- Click the CTA → the server terminal logs
  `[Conversion] cta_clicked { userId, variationId, ctaText }`.
- Or test the endpoint directly:
  ```bash
  curl -X POST http://localhost:3000/api/track \
    -H 'Content-Type: application/json' \
    -d '{"event":"cta_clicked","userId":"demo","variationId":1,"ctaText":"Get Started — No Credit Card"}'
  ```