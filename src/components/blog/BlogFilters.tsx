"use client";

import { Category } from '@/lib/contentful/types';
import { Locale } from '@/config/i18n.config';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { getTranslations, getBaseLocale } from '@/app/[lang]/translations';
import { useState } from 'react';

interface BlogFiltersProps {
  categories: Category[];
  tags: string[];
  locale: Locale;
  activeCategory?: string;
  activeTag?: string;
}

export default function BlogFilters({ categories, tags, locale, activeCategory, activeTag }: BlogFiltersProps) {
  // Verificar se estamos no cliente
  const isClient = typeof window !== 'undefined';
  const router = isClient ? useRouter() : null;
  
  // Usar useSearchParams apenas do lado do cliente
  const searchParamsObj = isClient ? useSearchParams() : null;
  
  // Estado para controlar carregamento
  const [isLoading, setIsLoading] = useState(false);
  
  // Obter as traduções para o idioma atual
  const t = getTranslations(locale);
  
  // Extrair o idioma base para URLs (ex: 'pt-BR' -> 'pt')
  const baseLocale = getBaseLocale(locale);
  
  const createFilterUrl = (type: 'category' | 'tag', value: string | null, categoryName?: string, categorySlug?: string) => {
    // Criar uma cópia dos parâmetros de busca ou um objeto vazio se estiver do lado do servidor
    const params = new URLSearchParams(isClient && searchParamsObj ? searchParamsObj.toString() : '');
    
    // Remove current filters
    params.delete('category');
    params.delete('category_name');
    params.delete('tag');
    params.delete('page');
    
    // Add new filter if provided
    if (value) {
      if (type === 'category' && (categorySlug || categoryName)) {
        // Preferir slug (mais confiável para URL) ou usar nome se não tiver slug
        params.set('category_name', categorySlug || categoryName || '');
      } else {
        params.set(type, value);
      }
    }
    
    const queryString = params.toString();
    return `/${baseLocale}/blog${queryString ? `?${queryString}` : ''}`;
  };
  
  const clearFiltersUrl = `/${baseLocale}/blog`;
  const hasActiveFilters = activeCategory || activeTag;
  
  // Handler para navegação client-side com feedback
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isClient && router) {
      e.preventDefault();
      setIsLoading(true);
      
      // Timeout para garantir que a navegação não fique presa
      const navigationTimeout = setTimeout(() => {
        setIsLoading(false);
        // Fallback para navegação tradicional se a navegação client-side falhar
        window.location.href = href;
      }, 5000);
      
      try {
        // Navegar usando o router do Next.js
        router.push(href);
        clearTimeout(navigationTimeout);
      } catch (error) {
        // Fallback para navegação tradicional se houver erro
        clearTimeout(navigationTimeout);
        setIsLoading(false);
        window.location.href = href;
      }
    }
  };
  
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-xl font-playfair font-bold text-gray-900">
          {t.blog.filters}
        </h2>
        
        {isLoading && (
          <span className="text-sm text-gray-500">
            Carregando...
          </span>
        )}
        
        {hasActiveFilters && !isLoading && (
          <Link
            href={clearFiltersUrl}
            className="text-sm text-pink-700 hover:text-pink-900 transition-colors"
            onClick={(e) => handleNavigation(e, clearFiltersUrl)}
          >
            {t.blog.clearFilters}
          </Link>
        )}
      </div>
      
      {/* Categories */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            {t.blog.categories}
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category.sys.id;
              const href = isActive 
                ? clearFiltersUrl 
                : createFilterUrl('category', category.sys.id, category.fields.name, category.fields.slug);
              
              return (
                <Link
                  key={category.sys.id}
                  href={href}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={isLoading ? (e) => e.preventDefault() : (e) => handleNavigation(e, href)}
                  aria-disabled={isLoading}
                >
                  {category.fields.name || t.blog.noCategory}
                </Link>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            {t.blog.tags}
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const isActive = activeTag === tag;
              const href = isActive ? clearFiltersUrl : createFilterUrl('tag', tag);
              
              return (
                <Link
                  key={tag}
                  href={href}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-pink-600 text-white hover:bg-pink-700'
                      : 'bg-pink-100 text-pink-800 hover:bg-pink-200'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={isLoading ? (e) => e.preventDefault() : (e) => handleNavigation(e, href)}
                  aria-disabled={isLoading}
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
} 