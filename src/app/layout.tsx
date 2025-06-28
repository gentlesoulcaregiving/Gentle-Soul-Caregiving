import type { Metadata } from "next";
import { Karla, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "Gentle Soul Caregiving",
  description: "Compassionate in-home senior care in Adams, WI, including respite and companion care.",
  keywords: ["in-home senior care Adams WI", "respite caregiver Baraboo", "solo caregiver Wisconsin Dells"],
  openGraph: {
    title: "Gentle Soul Caregiving",
    description: "Compassionate in-home senior care in Adams, WI, including respite and companion care.",
    url: "https://gentle-soul-caregiving.com",
    siteName: "Gentle Soul Caregiving",
    images: [
      {
        url: "https://gentle-soul-caregiving.com/og-image.jpg", // Replace with your actual Open Graph image
        width: 1200,
        height: 630,
        alt: "Gentle Soul Caregiving",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gentle Soul Caregiving",
    description: "Compassionate in-home senior care in Adams, WI, including respite and companion care.",
    images: ["https://gentle-soul-caregiving.com/og-image.jpg"], // Replace with your actual Twitter image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${karla.variable} ${playfairDisplay.variable} antialiased`}>
        <Navbar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context":"https://schema.org",
            "@type":"LocalBusiness",
            "name":"Gentle Soul Caregiving",
            "areaServed":"Adams County, WI",
            "serviceType":["Companion care","Respite care"],
            "url":"https://gentle-soul-caregiving.com",
            "telephone":"+1-608-555-0199"
          })}}
        />
        {children}
      </body>
    </html>
  );
}
