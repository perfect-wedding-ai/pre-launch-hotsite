"use client";

import { useRouter } from 'next/navigation';
import { Locale } from '@/config/i18n.config';

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
  const router = useRouter();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    const localePost = availableLocales[locale];
    if (localePost?.fields?.slug) {
      // Usar window.location para navegação completa, pois precisamos mudar o idioma
      window.location.href = `/${locale}/blog/${localePost.fields.slug}`;
    }
  };

  // Não renderizar nada se tiver apenas um idioma disponível
  if (Object.keys(availableLocales).length <= 1) {
    return null;
  }

  return (
    <div className="relative inline-block text-xs">
      <select
        className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-1 px-2 pr-6 rounded-md leading-tight focus:outline-none focus:border-gray-400"
        defaultValue={currentLocale}
        onChange={handleLanguageChange}
      >
        {Object.entries(availableLocales).map(([locale, localePost]) => {
          if (localePost?.fields?.slug) {
            return (
              <option key={locale} value={locale}>
                {localeNames[locale] || locale.toUpperCase()}
                {locale === canonicalLocale && locale !== currentLocale ? ' (original)' : ''}
              </option>
            );
          }
          return null;
        })}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
} 