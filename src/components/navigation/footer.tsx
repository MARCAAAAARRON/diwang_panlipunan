import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-page text-text mt-auto py-12 md:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-8 border-b border-border">
          {/* Brand Info */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 shrink-0 overflow-hidden rounded">
                <Image
                  src="/images/LOGO.png"
                  alt="Diwang Panlipunan Logo"
                  width={28}
                  height={28}
                  className="object-contain w-full h-full"
                />
              </div>
              <h2 className="font-serif text-xl font-bold text-text tracking-tight">
                Diwang Panlipunan
              </h2>
            </div>
            <p className="text-sm font-medium text-text-muted italic">
              Diwang Panlipunan — Pag-unawa sa Lipunan, Pagmulat sa Kinabukasan.
            </p>
            <p className="text-sm text-text-muted max-w-xl leading-relaxed">
              Malayang espasyo para sa diskursong sibiko, pananaliksik, at pagsusuring panlipunan sa Pilipinas.
              Walang kinikilingang partidista at bukas para sa mga guro, mag-aaral, at mamamayan.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-5 flex flex-col sm:flex-row sm:justify-end gap-8 sm:gap-12">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Mga Nilalaman
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/home" className="hover:text-primary hover:underline transition-colors">
                    Mga Paksa
                  </Link>
                </li>
                <li>
                  <Link href="/tungkol-sa-amin" className="hover:text-primary hover:underline transition-colors">
                    Tungkol sa Amin
                  </Link>
                </li>
                <li>
                  <Link href="/makipag-ugnayan" className="hover:text-primary hover:underline transition-colors">
                    Makipag-ugnayan
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Patakaran & Sanggunian
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/patakaran-sa-privacy" className="hover:text-primary hover:underline transition-colors">
                    Patakaran sa Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/home#sanggunian" className="hover:text-primary hover:underline transition-colors">
                    Mga Sanggunian
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-text-muted">
          <div>
            <span>© 2025 Diwang Panlipunan. Lahat ng karapatan ay nakalaan.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium text-text">Pakikipag-ugnayan:</span>
            <a
              href="mailto:ugnayan@diwangpanlipunan.ph"
              className="text-primary hover:underline"
            >
              ugnayan@diwangpanlipunan.ph
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
