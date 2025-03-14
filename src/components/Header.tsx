import Link from "next/link";

type ValidLang = 'pt' | 'en' | 'es';

interface HeaderProps {
    lang: ValidLang;
    t: {
        nav: {
            howItWorks: string;
            benefits: string;
            faq: string;
            blog: string;
            tryFree: string;
        };
    };
}

export default function Header({ lang, t }: HeaderProps) {
    return (
        <header className="fixed w-full top-0 left-0 z-[1000] bg-white py-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
            <div className="container">
                <div className="flex justify-between items-center">
                    <div className="logo">
                        <Link href={`/${lang}`}>
                            <h1 className="text-[28.8px] m-0 text-[rgb(90,90,90)]">Perfect Wedding</h1>
                        </Link>
                    </div>
                    <nav>
                        <ul className="flex gap-6">
                            <li><Link href={`/${lang}#como-funciona`} className="nav-link">{t.nav.howItWorks}</Link></li>
                            <li><Link href={`/${lang}#beneficios`} className="nav-link">{t.nav.benefits}</Link></li>
                            <li><Link href={`/${lang}#faq`} className="nav-link">{t.nav.faq}</Link></li>
                            <li><Link href={`/${lang}/blog`} className="nav-link">{t.nav.blog}</Link></li>
                        </ul>
                    </nav>
                    <div className="cta-button">
                        <Link href={`/${lang}#cadastro`} className="btn-primary">{t.nav.tryFree}</Link>
                    </div>
                </div>
            </div>
        </header>
    );
} 