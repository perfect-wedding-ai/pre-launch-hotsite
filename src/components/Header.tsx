"use client"

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
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
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    // Renderizar o botão de usuário
    const userButton = (
        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors">
            <FontAwesomeIcon 
                icon={faUser} 
                className="text-neutral-600 h-5 w-5" 
            />
        </div>
    );
    
    return (
        <>
            {mounted && <ScrollbarPreserver />}
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
                                <li><Link href={`/${lang}#${t.anchors.howItWorks}`} className="nav-link">{t.nav.howItWorks}</Link></li>
                                <li><Link href={`/${lang}#${t.anchors.benefits}`} className="nav-link">{t.nav.benefits}</Link></li>
                                <li><Link href={`/${lang}#${t.anchors.faq}`} className="nav-link">{t.nav.faq}</Link></li>
                                {lang !== 'es' && (
                                    <li><Link href={`/${lang}/blog`} className="nav-link">{t.nav.blog}</Link></li>
                                )}
                            </ul>
                        </nav>
                        <div className="flex items-center gap-4">
                            <div className="cta-button">
                                <Link href={`/${lang}#${t.anchors.signup}`} className="btn-primary">{t.nav.tryFree}</Link>
                            </div>
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
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
} 