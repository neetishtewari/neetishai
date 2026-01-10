import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    template: '%s | Neetish Tewari',
    default: 'Neetish Tewari | AI Product Expert and Automation Consultant',
  },
  description: "AI Product Expert and Automation Consultant. Helping teams turn AI ideas into clean, practical, scalable products through workshops, audits, and MVPs.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neetish.ai',
    title: 'Neetish Tewari | AI Product Expert',
    description: 'AI Product Expert and Automation Consultant. Helping teams turn ideas into practical AI products.',
    siteName: 'Neetish Tewari',
    images: [
      {
        url: '/neetish.jpg', // Assuming this exists, based on usage in page.tsx
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
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
