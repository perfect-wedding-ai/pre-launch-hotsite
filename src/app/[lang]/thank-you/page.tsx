"use client";

import Link from "next/link";
import { getTranslations } from '../translations';
import Header from "@/components/Header";
import BackgroundEffect from "@/components/BackgroundEffect";
import Footer from "@/components/Footer";

export default function ThankYou({ params }: { params: { lang: 'pt' | 'en' | 'es' } }) {
  const lang = params?.lang || 'pt';
  const t = getTranslations(lang);

  return (
    <>
      <Header lang={lang} t={t} />

      <BackgroundEffect className="min-h-screen flex items-center justify-center pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="thank-you-content text-center bg-white p-12 rounded-lg shadow-xl border border-pink-100 max-w-2xl mx-auto">
            <i className="fas fa-check-circle text-[80px] text-[rgb(255,192,203)] mb-8 block"></i>
            <h1 className="text-4xl mb-4 text-[rgb(90,90,90)] font-playfair">{t.thankYou.title}</h1>
            <p className="text-lg mb-2 text-[rgb(122,122,122)]">{t.thankYou.subtitle}</p>
            <p className="text-lg mb-8 text-[rgb(122,122,122)]">{t.thankYou.description}</p>
            <div className="thank-you-buttons">
              <Link href={`/${lang}`} className="btn-primary inline-block hover:scale-105 transition-transform duration-300">
                {t.thankYou.backToHome}
              </Link>
            </div>
          </div>
        </div>
      </BackgroundEffect>

      <Footer lang={lang} t={t} />
    </>
  );
} 