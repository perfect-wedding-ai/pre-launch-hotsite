"use client"

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { 
    CustomDropdownMenuContent,
    NoScrollLockDropdownMenu 
} from "@/components/ui/custom-dropdown-menu";
import { useEffect, useState } from "react";
import ScrollbarPreserver from "@/components/ScrollbarPreserver";
import LanguageSelector from "@/components/LanguageSelector";
import { useRouter } from "next/navigation";

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
        userMenu: {
            profile: string;
            dashboard: string;
            settings: string;
            signOut: string;
            account: string;
            language: string;
            languageNames: {
                pt: string;
                en: string;
                es: string;
            };
        };
        anchors: {
            howItWorks: string;
            benefits: string;
            faq: string;
            signup: string;
        };
        footer: {
            quickLinks: {
                items: {
                    howItWorks: string;
                    benefits: string;
                    faq: string;
                    blog: string;
                };
            };
        };
    };
}

export default function Header({ lang, t }: HeaderProps) {
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    // Função para precarregar a página do blog ao passar o mouse
    const handleBlogLinkHover = () => {
        // Precarrega a página do blog
        router.prefetch(`/${lang}/blog`);
    };
    
    // Renderizar o botão de usuário
    const userButton = (
        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors">
            <FontAwesomeIcon 
                icon={faUser} 
                className="text-neutral-600 h-5 w-5" 
            />
        </div>
    );

    // Toggle do menu mobile
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Links de navegação
    const navLinks = (
        <>
            <li><Link href={`/${lang}#${t.anchors.howItWorks}`} className="nav-link">{t.nav.howItWorks}</Link></li>
            <li><Link href={`/${lang}#${t.anchors.benefits}`} className="nav-link">{t.nav.benefits}</Link></li>
            <li><Link href={`/${lang}#${t.anchors.faq}`} className="nav-link">{t.nav.faq}</Link></li>
            {lang !== 'es' && (
                <li>
                    <Link 
                        href={`/${lang}/blog`} 
                        className="nav-link"
                        onMouseEnter={handleBlogLinkHover}
                    >
                        {t.nav.blog}
                    </Link>
                </li>
            )}
        </>
    );
    
    return (
        <>
            {mounted && <ScrollbarPreserver />}
            <header className="fixed w-full top-0 left-0 z-[1000] bg-white py-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                <div className="container">
                    <div className="flex justify-between items-center">
                        <div className="logo">
                            <Link href={`/${lang}`}>
                                <h1 className="text-[28.8px] md:text-[28.8px] text-xl m-0 text-[rgb(90,90,90)]">Perfect Wedding</h1>
                            </Link>
                        </div>
                        
                        {/* Desktop Navigation */}
                        <nav className="hidden md:block">
                            <ul className="flex gap-6">
                                {navLinks}
                            </ul>
                        </nav>
                        
                        <div className="flex items-center gap-4">
                            {/* CTA Button - Hide on smallest screens */}
                            <div className="cta-button hidden sm:block">
                                <Link href={`/${lang}#${t.anchors.signup}`} className="btn-primary">{t.nav.tryFree}</Link>
                            </div>
                            
                            {/* User Menu */}
                            <div className="user-menu">
                                {mounted ? (
                                    <NoScrollLockDropdownMenu>
                                        <DropdownMenuTrigger className="focus:outline-none">
                                            {userButton}
                                        </DropdownMenuTrigger>
                                        <CustomDropdownMenuContent className="min-w-48 z-[1001]" sideOffset={5} align="end">
                                            <DropdownMenuLabel>{t.userMenu.language}</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <LanguageSelector 
                                                currentLang={lang} 
                                                t={{
                                                    language: t.userMenu.language,
                                                    languageNames: t.userMenu.languageNames
                                                }}
                                            />
                                        </CustomDropdownMenuContent>
                                    </NoScrollLockDropdownMenu>
                                ) : (
                                    userButton
                                )}
                            </div>
                            
                            {/* Mobile Menu Button */}
                            <button 
                                className="md:hidden flex items-center justify-center w-10 h-10" 
                                onClick={toggleMobileMenu}
                                aria-label="Menu"
                            >
                                <FontAwesomeIcon 
                                    icon={mobileMenuOpen ? faXmark : faBars} 
                                    className="text-neutral-600 h-5 w-5" 
                                />
                            </button>
                        </div>
                    </div>
                    
                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-4 pb-2 animate-fadeIn">
                            <nav>
                                <ul className="flex flex-col gap-3">
                                    {navLinks}
                                    <li className="sm:hidden mt-2">
                                        <Link 
                                            href={`/${lang}#${t.anchors.signup}`} 
                                            className="btn-primary inline-block"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {t.nav.tryFree}
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}
                </div>
            </header>
            {/* Overlay for mobile menu */}
            {mobileMenuOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/20 z-[999]" 
                    onClick={toggleMobileMenu}
                    aria-hidden="true"
                />
            )}
        </>
    );
} 