import type { Metadata } from "next";
import { Source_Serif_4, Public_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { DrawerProvider } from "@/components/navigation/drawer-context";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { ContentDrawer } from "@/components/navigation/content-drawer";

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
  icons: {
    icon: [
      { url: "/images/LOGO.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/images/LOGO.png",
    apple: "/images/LOGO.png",
  },
};

const zeroFOUCScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme');
      var isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fil" suppressHydrationWarning className={`${sourceSerif4.variable} ${publicSans.variable}`}>
      <head>
        <link rel="icon" href="/images/LOGO.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/LOGO.png" />
        <script dangerouslySetInnerHTML={{ __html: zeroFOUCScript }} />
      </head>
      <body className="min-h-screen font-sans bg-page text-text antialiased flex flex-col transition-colors duration-150">
        <ThemeProvider>
          <DrawerProvider>
            <Header />
            <ContentDrawer />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
          </DrawerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
