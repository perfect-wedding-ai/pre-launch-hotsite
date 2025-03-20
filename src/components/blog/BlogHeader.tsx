import { Locale } from '@/config/i18n.config';
import Link from 'next/link';
import { getTranslations } from '@/app/[lang]/translations';

interface BlogHeaderProps {
  locale: Locale;
  title?: string;
  description?: string;
  showBackLink?: boolean;
  canonicalSlug?: string;
  currentSlug?: string;
}

export default function BlogHeader({ 
  locale, 
  title, 
  description, 
  showBackLink = false,
  canonicalSlug,
  currentSlug
}: BlogHeaderProps) {
  // Obter as traduções para o idioma atual
  const t = getTranslations(locale);
  
  // Verificar se tem um slug canônico diferente do atual
  const showCanonicalNotice = canonicalSlug && currentSlug && canonicalSlug !== currentSlug;
  
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
      
      {showCanonicalNotice && (
        <div className="mb-4 p-2 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-sm">
          {t.blog.canonicalNotice || 'Este conteúdo está disponível em sua versão original:'}
          <Link 
            href={`/blog/${canonicalSlug}`}
            className="ml-1 underline text-pink-700 hover:text-pink-900"
          >
            {`perfectwedding.ai/blog/${canonicalSlug}`}
          </Link>
        </div>
      )}
      
      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
        {title || t.blog.title}
      </h1>
      
      {description && (
        <p className="text-lg text-gray-600 mx-auto max-w-2xl bg-transparent">
          {description}
        </p>
      )}
      
      {!description && !title && (
        <div className="mx-auto max-w-2xl">
          <p className="text-lg text-gray-600 bg-transparent">
            {t.blog.subtitle}
          </p>
        </div>
      )}
    </div>
  );
} 