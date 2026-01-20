import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import GoogleAdsense from "@/components/GoogleAdsense";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Justin Jacob Saju | Engineering Ideas & Tech Insights",
  description: "Exploring embedded systems, VLSI, 5G communications, and AI-driven solutions. A blog by Justin Jacob Saju, engineering student at SRM IST KTR.",
  keywords: ["engineering", "embedded systems", "VLSI", "5G", "AI", "technology", "SRM IST", "blog"],
  authors: [{ name: "Justin Jacob Saju" }],
  openGraph: {
    title: "Justin Jacob Saju | Engineering Ideas & Tech Insights",
    description: "Exploring embedded systems, VLSI, 5G communications, and AI-driven solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <GoogleAdsense pId="ca-pub-6510223775923718" />
      </body>
    </html>
  );
}
