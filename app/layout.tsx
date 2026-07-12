import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const title = "Pacific Pure Wash | Pressure Washing & Softwashing";
const description = "Get an instant driveway, siding, or roofing cleaning estimate from Pacific Pure Wash, a small local eco-friendly exterior-cleaning business.";

export const metadata: Metadata = {
  metadataBase: new URL("https://pacificpurewash.com"),
  title,
  description,
  alternates: { canonical: "https://pacificpurewash.com/" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://pacificpurewash.com/",
    siteName: "Pacific Pure Wash",
    locale: "en_US",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Pacific Pure Wash pressure washing and softwashing" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={geist.variable}>{children}</body></html>;
}
