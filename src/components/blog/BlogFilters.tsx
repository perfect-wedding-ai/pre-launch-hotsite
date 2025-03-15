"use client";

import { Category } from '@/lib/contentful/types';
import { Locale } from '@/config/i18n.config';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface BlogFiltersProps {
  categories: Category[];
  tags: string[];
  locale: Locale;
  activeCategory?: string;
  activeTag?: string;
}

export default function BlogFilters({ categories, tags, locale, activeCategory, activeTag }: BlogFiltersProps) {
  const searchParams = useSearchParams();
  
  // Colapsar variantes de idioma (en-US -> en, pt-BR -> pt)
  const baseLocale = locale.split('-')[0];
  
  const createFilterUrl = (type: 'category' | 'tag', value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Remove current filters
    params.delete('category');
    params.delete('tag');
    params.delete('page');
    
    // Add new filter if provided
    if (value) {
      params.set(type, value);
    }
    
    const queryString = params.toString();
    return `/${baseLocale}/blog${queryString ? `?${queryString}` : ''}`;
  };
  
  const clearFiltersUrl = `/${baseLocale}/blog`;
  const hasActiveFilters = activeCategory || activeTag;
  
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-xl font-playfair font-bold text-gray-900">
          {baseLocale === 'pt' ? 'Filtros' : 'Filters'}
        </h2>
        
        {hasActiveFilters && (
          <Link
            href={clearFiltersUrl}
            className="text-sm text-pink-700 hover:text-pink-900 transition-colors"
          >
            {baseLocale === 'pt' ? 'Limpar filtros' : 'Clear filters'}
          </Link>
        )}
      </div>
      
      {/* Categories */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            {baseLocale === 'pt' ? 'Categorias' : 'Categories'}
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category.sys.id;
              
              return (
                <Link
                  key={category.sys.id}
                  href={isActive ? clearFiltersUrl : createFilterUrl('category', category.sys.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                  }`}
                >
                  {category.fields.name || 'Sem nome'}
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
            {baseLocale === 'pt' ? 'Tags' : 'Tags'}
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const isActive = activeTag === tag;
              
              return (
                <Link
                  key={tag}
                  href={isActive ? clearFiltersUrl : createFilterUrl('tag', tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-pink-600 text-white hover:bg-pink-700'
                      : 'bg-pink-100 text-pink-800 hover:bg-pink-200'
                  }`}
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