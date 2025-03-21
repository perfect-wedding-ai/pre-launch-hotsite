"use client";

import { Locale } from '@/config/i18n.config';
import { Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

interface LocalePost {
  fields: {
    slug: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface LanguageSwitcherProps {
  currentLocale: Locale;
  availableLocales: Record<string, LocalePost>;
  canonicalLocale: string;
  localeNames: Record<string, string>;
}

export default function LanguageSwitcher({
  currentLocale,
  availableLocales,
  canonicalLocale,
  localeNames
}: LanguageSwitcherProps) {
  // Não renderizar nada se tiver apenas um idioma disponível
  if (Object.keys(availableLocales).length <= 1) {
    return null;
  }

  const handleLanguageChange = (locale: string) => {
    const localePost = availableLocales[locale];
    if (localePost?.fields?.slug) {
      // Usar window.location para navegação completa, pois precisamos mudar o idioma
      window.location.href = `/${locale}/blog/${localePost.fields.slug}`;
    }
  };

  // Obter o nome do idioma atual para mostrar no botão
  const currentLocaleName = localeNames[currentLocale] || currentLocale.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-pink-50 border border-pink-100 rounded-md text-gray-700 hover:bg-pink-100 transition-colors">
        <Globe className="h-3 w-3 text-pink-500" />
        <span>{currentLocaleName}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white min-w-[120px] rounded-md shadow-md border border-pink-50 text-xs">
        {Object.entries(availableLocales).map(([locale, localePost]) => {
          if (localePost?.fields?.slug) {
            const isOriginal = locale === canonicalLocale;
            const isCurrent = locale === currentLocale;
            
            return (
              <DropdownMenuItem
                key={locale}
                className={cn(
                  "py-1.5 px-3 cursor-pointer text-gray-700 hover:bg-pink-50 hover:text-gray-900 transition-colors",
                  isCurrent && "bg-pink-100 font-medium"
                )}
                onClick={() => handleLanguageChange(locale)}
              >
                <span className="flex items-center justify-between w-full">
                  {localeNames[locale] || locale.toUpperCase()}
                  {isOriginal && locale !== currentLocale && (
                    <span className="text-[10px] bg-pink-100 text-pink-800 px-1.5 py-0.5 rounded-full ml-1">
                      original
                    </span>
                  )}
                </span>
              </DropdownMenuItem>
            );
          }
          return null;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 