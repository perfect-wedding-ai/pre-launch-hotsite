import Link from "next/link";

interface FooterProps {
  lang: 'pt' | 'en' | 'es';
  t: any; // Tipo das traduções
}

export default function Footer({ lang, t }: FooterProps) {
  return (
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
              <li><Link href={`/${lang}#${t.anchors.howItWorks}`} className="hover:text-[rgb(255,192,203)] hover:translate-x-2 transition-all duration-300 inline-block text-[rgb(90,90,90)]">{t.footer.quickLinks.items.howItWorks}</Link></li>
              <li><Link href={`/${lang}#${t.anchors.benefits}`} className="hover:text-[rgb(255,192,203)] hover:translate-x-2 transition-all duration-300 inline-block text-[rgb(90,90,90)]">{t.footer.quickLinks.items.benefits}</Link></li>
              <li><Link href={`/${lang}#${t.anchors.faq}`} className="hover:text-[rgb(255,192,203)] hover:translate-x-2 transition-all duration-300 inline-block text-[rgb(90,90,90)]">{t.footer.quickLinks.items.faq}</Link></li>
              {lang !== 'es' && (
                <li><Link href={`/${lang}/blog`} className="hover:text-[rgb(255,192,203)] hover:translate-x-2 transition-all duration-300 inline-block text-[rgb(90,90,90)]">{t.footer.quickLinks.items.blog}</Link></li>
              )}
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
  );
} 