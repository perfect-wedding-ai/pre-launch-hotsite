import Link from 'next/link';
import { Locale } from '@/config/i18n.config';

export default function BlogPostNotFound({ params }: { params: { lang: Locale } }) {
  const lang = params?.lang || 'pt';
  
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
        {lang === 'pt' ? 'Post não encontrado' : 'Post not found'}
      </h1>
      
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        {lang === 'pt'
          ? 'O post que você está procurando não existe ou foi removido.'
          : 'The post you are looking for does not exist or has been removed.'}
      </p>
      
      <Link
        href={`/${lang}/blog`}
        className="inline-block px-6 py-3 bg-pink-600 text-white font-medium rounded-md hover:bg-pink-700 transition-colors"
      >
        {lang === 'pt' ? 'Voltar para o blog' : 'Back to blog'}
      </Link>
    </div>
  );
} 