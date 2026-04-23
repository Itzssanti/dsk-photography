import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DSK — Real Estate Photography · San Jose, CA",
  description: "Architectural and real estate photography in San Jose and the Bay Area. Cinematic, clean, and built to sell.",
  openGraph: {
    title: "DSK Real Estate Photography",
    description: "Architectural and real estate photography in San Jose and the Bay Area.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
