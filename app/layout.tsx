import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flowly - Project management that flows",
  description:
    "Flowly is the simple project management tool that keeps your team in sync, on time, and out of endless meetings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
