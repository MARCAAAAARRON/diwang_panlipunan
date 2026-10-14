import type { Metadata } from "next";
import { Source_Serif_4, Public_Sans } from "next/font/google";
import "./globals.css";

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
  weight: ["400", "600", "700"],
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diwang Panlipunan",
  description: "Pag-unawa sa Lipunan, Pagmulat sa Kinabukasan — Isang platapormang pang-edukasyon para sa kamalayang panlipunan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fil" className={`${sourceSerif4.variable} ${publicSans.variable}`}>
      <body className="min-h-screen font-sans bg-page text-text antialiased">
        {children}
      </body>
    </html>
  );
}
