import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Welkom bij Medito",
    description: "Een rustige, interactieve onboarding voor de Medito meditatie-app.",
    icons: {
      icon: "/assets/logo/medito_logo.svg",
      shortcut: "/assets/logo/medito_logo.svg",
    },
    openGraph: {
      title: "Medito — Rust zonder drempels",
      description: "Ontdek Medito in vijf rustige, interactieve stappen.",
      type: "website",
      url: origin,
      images: [
        {
          url: `${origin}/og.png`,
          width: 1200,
          height: 630,
          alt: "Medito — Rust zonder drempels",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Medito — Rust zonder drempels",
      description: "Ontdek Medito in vijf rustige, interactieve stappen.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <meta name="theme-color" content="#090b0d" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500&amp;family=DM+Sans:wght@400;500;600;700&amp;display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
