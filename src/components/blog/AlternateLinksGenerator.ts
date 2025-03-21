import { Locale } from '@/config/i18n.config';
import { BlogPost } from '@/lib/contentful/types';

export interface AlternateLink {
  hrefLang: string;
  href: string;
}

interface GenerateCanonicalUrlParams {
  baseUrl: string;
  canonicalLocale: string;
  canonicalSlug: string;
}

/**
 * Converte código do locale (pt, en, es) para código hrefLang (pt-BR, en-US, es-ES)
 */
export function getHrefLangCode(locale: string): string {
  switch (locale) {
    case 'pt': return 'pt-BR';
    case 'en': return 'en-US';
    case 'es': return 'es-ES';
    default: return locale;
  }
}

/**
 * Gera a URL canônica para um post de blog
 */
export function generateCanonicalUrl({ 
  baseUrl, 
  canonicalLocale, 
  canonicalSlug 
}: GenerateCanonicalUrlParams): string {
  return `${baseUrl}/${canonicalLocale}/blog/${canonicalSlug}`;
}

// Estende a interface BlogPost para incluir campos necessários para o hreflang
interface BlogPostWithCanonical extends Omit<BlogPost, 'fields'> {
  fields: BlogPost['fields'] & {
    canonicalSlug: string;
    canonicalLocale: string;
    slug: string | Record<string, string> | any;
  };
}

interface GenerateAlternateLinksParams {
  baseUrl: string;
  blogPost: BlogPostWithCanonical;
  availableLocales: Locale[];
}

/**
 * Extrai o slug localizado do post do blog, lidando com diferentes formatos que o Contentful pode retornar
 */
function extractLocalizedSlug(post: BlogPostWithCanonical, locale: string): string | undefined {
  const { slug } = post.fields;

  // Caso 1: slug é uma string simples (não localizada)
  if (typeof slug === 'string') {
    return post.fields.canonicalLocale === locale ? slug : undefined;
  }

  // Caso 2: slug é um objeto com chaves de locale diretas
  if (slug && typeof slug === 'object' && typeof slug[locale] === 'string') {
    return slug[locale];
  }

  // Caso 3: Para objetos mais complexos provenientes da API do Contentful
  try {
    // Tenta acessar usando a notação direta de locale
    if (slug && typeof slug === 'object' && slug[locale]) {
      return slug[locale];
    }
    
    // Tenta acessar usando campos localizados
    if (slug && typeof slug === 'object' && slug.fields && slug.fields[locale]) {
      return slug.fields[locale];
    }
    
    // Tenta extrair de uma estrutura aninhada
    if (slug && typeof slug === 'object' && slug.content && Array.isArray(slug.content)) {
      const content = slug.content.find((item: any) => item.locale === locale);
      if (content && content.value) {
        return content.value;
      }
    }
  } catch (error) {
    console.error(`Erro ao extrair slug para locale ${locale}:`, error);
  }
  
  return undefined;
}

/**
 * Gera os links alternativos (hreflang) para um post de blog
 */
export function generateAlternateLinks({
  baseUrl,
  blogPost,
  availableLocales
}: GenerateAlternateLinksParams): AlternateLink[] {
  const alternateLinks: AlternateLink[] = [];
  const { canonicalSlug, canonicalLocale } = blogPost.fields;
  
  // URL canônica que será usada também como x-default
  const canonicalUrl = generateCanonicalUrl({
    baseUrl,
    canonicalLocale,
    canonicalSlug
  });
  
  // Adiciona x-default apontando para a URL canônica
  alternateLinks.push({
    hrefLang: 'x-default',
    href: canonicalUrl
  });
  
  // Adiciona link para cada locale disponível com a URL apropriada
  availableLocales.forEach((locale) => {
    // Extrair o slug para este locale
    const localizedSlug = extractLocalizedSlug(blogPost, locale);
    
    // Se encontrou um slug válido para este locale, adiciona ao array de alternates
    if (localizedSlug) {
      alternateLinks.push({
        hrefLang: getHrefLangCode(locale),
        href: `${baseUrl}/${locale}/blog/${localizedSlug}`
      });
    }
  });
  
  // Garante que pelo menos o alternate para o locale canônico existe
  if (!alternateLinks.some(link => link.hrefLang === getHrefLangCode(canonicalLocale))) {
    alternateLinks.push({
      hrefLang: getHrefLangCode(canonicalLocale),
      href: canonicalUrl
    });
  }
  
  return alternateLinks;
} 