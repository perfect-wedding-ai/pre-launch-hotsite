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
import ScrollbarPreserver from "./ScrollbarPreserver";

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
        userMenu?: {
            profile: string;
            dashboard: string;
            settings: string;
            signOut: string;
        };
    };
}

// Componente que só renderiza no cliente
function ClientOnly({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    if (!mounted) {
        return null;
    }
    
    return <>{children}</>;
}

export default function Header({ lang, t }: HeaderProps) {
    // Default user menu translations if not provided
    const userMenuTexts = t.userMenu || {
        profile: 'Perfil',
        dashboard: 'Painel',
        settings: 'Configurações',
        signOut: 'Sair'
    };

    // Renderizar o botão de usuário independentemente de estar montado ou não
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
            <ScrollbarPreserver />
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
                                {lang !== 'es' && (
                                    <li><Link href={`/${lang}/blog`} className="nav-link">{t.nav.blog}</Link></li>
                                )}
                            </ul>
                        </nav>
                        <div className="flex items-center gap-4">
                            <div className="cta-button">
                                <Link href={`/${lang}#cadastro`} className="btn-primary">{t.nav.tryFree}</Link>
                            </div>
                            <div className="user-menu">
                                <ClientOnly>
                                    <NoScrollLockDropdownMenu>
                                        <DropdownMenuTrigger className="focus:outline-none">
                                            {userButton}
                                        </DropdownMenuTrigger>
                                        <CustomDropdownMenuContent className="min-w-48 z-[1001]" sideOffset={5} align="end">
                                            <DropdownMenuLabel>Conta do usuário</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link href={`/${lang}/profile`} className="w-full">
                                                    {userMenuTexts.profile}
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href={`/${lang}/dashboard`} className="w-full">
                                                    {userMenuTexts.dashboard}
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href={`/${lang}/settings`} className="w-full">
                                                    {userMenuTexts.settings}
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <button className="w-full text-left text-red-500">
                                                    {userMenuTexts.signOut}
                                                </button>
                                            </DropdownMenuItem>
                                        </CustomDropdownMenuContent>
                                    </NoScrollLockDropdownMenu>
                                </ClientOnly>
                                {/* Renderiza este botão no servidor para evitar problemas de hidratação */}
                                <noscript>{userButton}</noscript>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
} 