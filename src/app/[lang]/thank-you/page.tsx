"use client";

import Link from "next/link";
import { useEffect } from "react";
import { translations, getTranslations } from '../translations';

export default function ThankYou({ params }: { params: { lang: 'pt' | 'en' | 'es' } }) {
  const lang = params?.lang || 'pt';
  const t = getTranslations(lang);

  useEffect(() => {
    // Redirecionar para a página inicial após 5 segundos
    const timer = setTimeout(() => {
      window.location.href = `/${lang}?mailchimp=success`;
    }, 5000);

    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <>
      <header className="fixed w-full top-0 left-0 z-[1000] bg-white py-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="logo">
              <h1 className="text-[28.8px] m-0 text-[rgb(90,90,90)]">Perfect Wedding</h1>
            </div>
            <nav>
              <ul className="flex gap-6">
                <li><Link href={`/${lang}#como-funciona`} className="nav-link">{t.nav.howItWorks}</Link></li>
                <li><Link href={`/${lang}#beneficios`} className="nav-link">{t.nav.benefits}</Link></li>
                <li><Link href={`/${lang}#faq`} className="nav-link">{t.nav.faq}</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <section className="thank-you min-h-screen flex items-center justify-center bg-gray-50 pt-24">
        <div className="container">
          <div className="thank-you-content text-center bg-white p-12 rounded-lg shadow-[0px_5px_15px_0px_rgba(0,0,0,0.08)] max-w-2xl mx-auto">
            <i className="fas fa-check-circle text-[80px] text-[rgb(255,192,203)] mb-8 block"></i>
            <h1 className="text-4xl mb-4 text-[rgb(90,90,90)]">{t.thankYou.title}</h1>
            <p className="text-lg mb-2 text-[rgb(122,122,122)]">{t.thankYou.subtitle}</p>
            <p className="text-lg mb-8 text-[rgb(122,122,122)]">{t.thankYou.description}</p>
            <div className="thank-you-buttons">
              <Link href={`/${lang}`} className="btn-primary inline-block">
                {t.thankYou.backToHome}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white text-gray-600 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="footer-logo">
              <h2 id="footer-title" className="text-2xl text-[rgb(90,90,90)] after:content-none">Perfect Wedding</h2>
              <p className="text-[rgb(90,90,90)]">{t.footer.description}</p>
            </div>
            <div className="footer-links">
              <h3 className="text-lg text-[rgb(90,90,90)] mb-4 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-12 after:h-[2px] after:bg-[rgb(255,192,203)]">{t.footer.quickLinks.title}</h3>
              <ul className="space-y-2">
                <li><Link href={`/${lang}#como-funciona`} className="hover:text-[rgb(255,192,203)] hover:translate-x-2 transition-all duration-300 inline-block text-[rgb(90,90,90)]">{t.footer.quickLinks.items.howItWorks}</Link></li>
                <li><Link href={`/${lang}#beneficios`} className="hover:text-[rgb(255,192,203)] hover:translate-x-2 transition-all duration-300 inline-block text-[rgb(90,90,90)]">{t.footer.quickLinks.items.benefits}</Link></li>
                <li><Link href={`/${lang}#faq`} className="hover:text-[rgb(255,192,203)] hover:translate-x-2 transition-all duration-300 inline-block text-[rgb(90,90,90)]">{t.footer.quickLinks.items.faq}</Link></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3 className="text-lg text-[rgb(90,90,90)] mb-4 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-12 after:h-[2px] after:bg-[rgb(255,192,203)]">{t.footer.contact.title}</h3>
              <p className="pl-[2px] text-[rgb(90,90,90)]">{t.footer.contact.email}</p>
            </div>
          </div>
          <div className="footer-bottom text-center border-t border-gray-200 pt-8 mt-12 flex flex-col items-center">
            <p className="mb-2 text-[rgb(90,90,90)] text-sm font-['Playfair Display'] text-center max-w-4xl mx-auto">{t.footer.copyright.text}</p>
            <p className="text-[rgb(90,90,90)] text-sm font-['Playfair Display'] text-center max-w-4xl mx-auto">{t.footer.copyright.tagline}</p>
          </div>
        </div>
      </footer>
    </>
  );
} 