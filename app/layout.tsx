import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://dsk-photography.vercel.app";
const OG_IMG = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&auto=format";

export const metadata: Metadata = {
  title: "DSK — Cinematic Real Estate Photography · San Jose, CA",
  description:
    "Cinematic real estate photography for South Bay agents. Shot on Sony FX30. Clean frames, honest light, 48-hour delivery.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "DSK — Cinematic Real Estate Photography · San Jose, CA",
    description:
      "Cinematic real estate photography for South Bay agents. Shot on Sony FX30. Clean frames, honest light, 48-hour delivery.",
    url: SITE_URL,
    siteName: "DSK Photography",
    images: [{ url: OG_IMG, width: 1200, height: 630, alt: "DSK Photography — South Bay" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DSK — Cinematic Real Estate Photography",
    description: "Cinematic real estate photography for South Bay agents. Shot on Sony FX30.",
    images: [OG_IMG],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
