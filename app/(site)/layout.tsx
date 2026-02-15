import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    template: '%s | Neetish Tewari',
    default: 'Neetish Tewari | Personal AI Research Portfolio',
  },
  description: "Personal research into GenAI and agentic systems. Exploring the development of AI ideas into clean, practical, scalable products.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neetish.ai',
    title: 'Neetish Tewari | Personal AI Research Portfolio',
    description: 'Personal research into GenAI and agentic systems. Exploring the boundaries of product management and AI.',
    siteName: 'Neetish Tewari',
    images: [
      {
        url: '/neetish.jpg',
        width: 800,
        height: 600,
        alt: 'Neetish Tewari',
      },
    ],
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
