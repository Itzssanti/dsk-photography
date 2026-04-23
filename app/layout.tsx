import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DSK — Real Estate Photography · San Jose, CA",
  description: "Architectural and real estate photography for South Bay agents. Cinematic frames, honest light, 24-hour delivery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
