import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-serif", weight: ["500", "600"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://neetishtewari.co"),
  title: {
    template: '%s | Neetish Tewari',
    default: 'Neetish Tewari | AI Product Manager',
  },
  description: "AI Product Manager with 18 years in product. Launched startup products from zero, one acquired. Builds AI apps around problems he spots and writes about evals, agents and document AI.",
  alternates: {
    canonical: 'https://neetishtewari.co',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neetishtewari.co',
    title: 'Neetish Tewari | AI Product Manager',
    description: 'AI Product Manager with 18 years in product. Launched startup products from zero, one acquired. Still builds.',
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
    title: 'Neetish Tewari | AI Product Manager',
    description: 'AI Product Manager with 18 years in product. Launched startup products from zero, one acquired. Still builds.',
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
      <body className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}>
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
