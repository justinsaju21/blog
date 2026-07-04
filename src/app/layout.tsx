import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import GoogleAdsense from "@/components/GoogleAdsense";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CursorProvider } from "@/components/ui/CustomCursor";
import { SavedProvider } from "@/components/SavedContext";
import LenisProvider from "@/components/ui/LenisProvider";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Echo Blogs | Technical Insights",
  description: "Exploring embedded systems, VLSI, 5G communications, and AI-driven solutions.",
  keywords: ["engineering", "embedded systems", "VLSI", "5G", "AI", "technology", "blog"],
  authors: [{ name: "Justin Jacob Saju" }],
  openGraph: {
    title: "Echo Blogs | Technical Insights",
    description: "Exploring embedded systems, VLSI, 5G communications, and AI-driven solutions.",
    type: "website",
  },
  other: {
    "google-adsense-account": "ca-pub-6510223775923718",
    "google-site-verification": "y_85QgBP7TP1ilzKv4bekkIVfhhRa7tGKWFdKijxuFo",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <ThemeProvider>
          <CursorProvider>
            <SavedProvider>
              <LenisProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
              </LenisProvider>
            </SavedProvider>
          </CursorProvider>
        </ThemeProvider>
        <GoogleAdsense pId="ca-pub-6510223775923718" />
      </body>
    </html>
  );
}
