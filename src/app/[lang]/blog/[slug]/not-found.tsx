'use client';

import Link from 'next/link';
import { Locale } from '@/config/i18n.config';
import { getTranslations } from '../../translations';
import { useEffect, useState } from 'react';

export default function BlogPostNotFound({ params }: { params: { lang: Locale } }) {
  // Estado para armazenar o idioma detectado
  const [detectedLang, setDetectedLang] = useState<Locale>(params?.lang || 'en');
  
  // Extrair o idioma da URL no carregamento do componente
  useEffect(() => {
    if (!params?.lang) {
      // Se não tiver o idioma nos parâmetros, extrair da URL atual
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0 && ['en', 'pt', 'es'].includes(pathSegments[0])) {
        setDetectedLang(pathSegments[0] as Locale);
      }
    } else {
      console.log('Using language from params:', params.lang);
    }
  }, [params?.lang]);
  
  // Usar o idioma detectado para obter as traduções
  const t = getTranslations(detectedLang);
  
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
        {t.blog.postNotFound || 'Post not found'}
      </h1>
      
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        {t.blog.postNotFoundDescription}
      </p>
      
      <Link
        href={`/${detectedLang}/blog`}
        className="inline-block px-6 py-3 bg-pink-600 text-white font-medium rounded-md hover:bg-pink-700 transition-colors"
      >
        {t.blog.backToHome}
      </Link>
    </div>
  );
} 