import { Locale } from '@/config/i18n.config';
import Link from 'next/link';
import { getTranslations } from '@/app/[lang]/translations';

interface BlogHeaderProps {
  locale: Locale;
  title?: string;
  description?: string;
  showBackLink?: boolean;
}

export default function BlogHeader({ locale, title, description, showBackLink = false }: BlogHeaderProps) {
  // Obter as traduções para o idioma atual
  const t = getTranslations(locale);
  
  return (
    <div className="mb-10 text-center">
      {showBackLink && (
        <div className="mb-6">
          <Link 
            href={`/${locale}/blog`}
            className="inline-flex items-center text-pink-700 hover:text-pink-900 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            {t.blog.backToHome}
          </Link>
        </div>
      )}
      
      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
        {title || t.blog.title}
      </h1>
      
      {description && (
        <p className="text-lg text-gray-600">
          {description}
        </p>
      )}
      
      {!description && !title && (
        <p className="text-lg text-gray-600">
          {t.blog.subtitle}
        </p>
      )}
    </div>
  );
} 