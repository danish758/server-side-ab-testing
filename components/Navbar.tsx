import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#" },
  { label: "Blog", href: "#" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 font-bold">
            F
          </span>
          <span className="text-lg font-semibold tracking-tight">Flowly</span>
        </Link>

        {/* Nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="hidden text-sm text-slate-300 transition hover:text-white sm:block"
          >
            Sign in
          </a>
          <a
            href="#pricing"
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
          >
            Get Flowly
          </a>
        </div>
      </nav>
    </header>
  );
}
