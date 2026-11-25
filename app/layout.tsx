import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samay Nandan | Team Lead – MERN & AI | Distributed Systems Architect",
  description:
    "Engineering Team Lead and Full-Stack Architect with 6 years of experience: Distributed Systems, RabbitMQ, Electron.js, Node.js, React, AWS, Generative AI & Agentic Workflows. Based in Chandigarh Tricity, open to remote / hybrid.",
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
