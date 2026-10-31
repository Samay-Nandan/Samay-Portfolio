import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samay Nandan, Technical Project Manager & Engineering Lead, Full Stack, Generative AI",
  description:
    "Technical Project Manager and Team Lead: requirement analysis, project delivery, resource planning, Agile, client management. Full stack Node.js, React, Next.js, AWS and generative AI products. Based in Chandigarh Tricity, open to remote work.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Loaded at runtime rather than via next/font so the build never needs network access. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Poppins:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
