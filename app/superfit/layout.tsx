import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Script from "next/script";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neetishtewari.co"),
  title: "Superfit | The Easiest Way to Reach Your Fitness Goals",
  description: "Ditch the tedious calorie math. Speak your meals, track your workouts, sync your steps automatically, and keep your health 100% private. Built for Android.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neetishtewari.co/superfit",
    title: "Superfit | The Easiest Way to Reach Your Fitness Goals",
    description: "Effortless voice meal logging, automatic step sync, and adaptive nutrition targets. The modern AI fitness companion for Android.",
    siteName: "Superfit",
    images: [
      {
        url: "/superfit_screen_light.jpg",
        width: 1200,
        height: 900,
        alt: "Superfit Android App",
      },
    ],
  },
};

export default function SuperfitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body>
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
        {children}
      </body>
    </html>
  );
}
