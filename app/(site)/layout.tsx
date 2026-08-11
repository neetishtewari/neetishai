import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://neetishtewari.co"),
  title: {
    template: '%s | Neetish Tewari',
    default: 'Neetish Tewari | AI Product Manager & Strategy Consultant',
  },
  description: "AI Product Manager with 17+ years in product strategy. Specializing in GenAI integration, agentic systems, and turning AI ideas into scalable products.",
  alternates: {
    canonical: 'https://neetishtewari.co',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neetishtewari.co',
    title: 'Neetish Tewari | AI Product Manager & Strategy Consultant',
    description: 'AI Product Manager specializing in GenAI integration, agentic systems, and scalable AI product strategy.',
    siteName: 'Neetish Tewari',
    images: [
      {
        url: '/neetish.jpg',
        width: 800,
        height: 600,
        alt: 'Neetish Tewari - AI Product Manager',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neetish Tewari | AI Product Manager & Strategy Consultant',
    description: 'AI Product Manager specializing in GenAI integration, agentic systems, and scalable AI product strategy.',
    images: ['/neetish.jpg'],
  },
  verification: {
    google: 'zfoIroNXlntCOeaWxirwZzbN2Mxclz49GGSykeZahMs',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T9SQGDXMWB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-T9SQGDXMWB');
          `}
        </Script>

        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
        {process.env.NODE_ENV === 'development' && <ChatWidget />}
      </body>
    </html>
  );
}
