import { Locale } from '@/config/i18n.config';
import Link from 'next/link';

interface BlogHeaderProps {
  locale: Locale;
  title?: string;
  description?: string;
  showBackLink?: boolean;
}

export default function BlogHeader({ locale, title, description, showBackLink = false }: BlogHeaderProps) {
  const defaultTitle = locale === 'pt' ? 'Blog Perfect Wedding' : 'Perfect Wedding Blog';
  const defaultDescription = locale === 'pt' 
    ? 'Dicas, inspirações e tendências para o seu casamento perfeito'
    : 'Tips, inspirations and trends for your perfect wedding';
  
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
            {locale === 'pt' ? 'Voltar para o blog' : 'Back to blog'}
          </Link>
        </div>
      )}
      
      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
        {title || defaultTitle}
      </h1>
      
      {description && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      )}
      
      {!description && !title && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {defaultDescription}
        </p>
      )}
    </div>
  );
} 