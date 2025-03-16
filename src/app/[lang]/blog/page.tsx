import { Metadata } from 'next';
import { getBlogPosts, getCategories, getContentfulLocales } from '@/lib/contentful/client';
import { Locale } from '@/config/i18n.config';
import BlogCard from '@/components/blog/BlogCard';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogFilters from '@/components/blog/BlogFilters';
import Pagination from '@/components/blog/Pagination';
import Header from '@/components/Header';
import { getTranslations, getBaseLocale } from '../translations';
import BackgroundEffect from '@/components/BackgroundEffect';

interface BlogPageProps {
  params: {
    lang: Locale;
  };
  searchParams: {
    page?: string;
    tag?: string;
    category?: string;
  };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang } = params;
  const t = getTranslations(lang);
  
  const title = t.blog.title;
  const description = t.blog.subtitle;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://perfectwedding.ai/${lang}/blog`,
      images: [
        {
          url: 'https://perfectwedding.ai/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Perfect Wedding Blog',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://perfectwedding.ai/images/og-image.jpg'],
    },
  };
}

// Função para extrair todas as tags únicas dos posts
const extractUniqueTags = (posts: any[], locale: Locale): string[] => {
  const tagsSet = new Set<string>();
  
  posts.forEach((post) => {
    if (post.fields.tags && Array.isArray(post.fields.tags)) {
      post.fields.tags.forEach((tag: string) => {
        if (tag && typeof tag === 'string') {
          tagsSet.add(tag);
        }
      });
    }
  });
  
  return Array.from(tagsSet).sort();
};

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { lang } = params;
  const { page = '1', tag, category } = searchParams;
  
  // Verificar locales configurados no Contentful
  await getContentfulLocales();
  
  const currentPage = parseInt(page, 10) || 1;
  const postsPerPage = 9;
  const skip = (currentPage - 1) * postsPerPage;
  
  // Buscar posts com paginação e filtros
  const postsResponse = await getBlogPosts(lang, {
    limit: postsPerPage,
    skip,
    tag,
    category,
  });
  
  // Buscar todas as categorias
  const categoriesResponse = await getCategories(lang);
  
  // Buscar todos os posts para extrair tags (limitado a 100 para performance)
  const allPostsResponse = await getBlogPosts(lang, { limit: 100 });
  const uniqueTags = extractUniqueTags(allPostsResponse.items, lang);
  
  const totalPages = Math.ceil(postsResponse.total / postsPerPage);
  
  // Obter as traduções para o idioma atual
  const t = getTranslations(lang);
  
  // Extrair o idioma base (ex: 'pt-BR' -> 'pt')
  const baseLocale = getBaseLocale(lang);
  
  return (
    <>
      <Header lang={lang as any} t={t} />
      
      <BackgroundEffect>
        <div className="container mx-auto px-4 py-12 mt-24">
          <BlogHeader locale={lang} />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            <div className="lg:col-span-1">
              <BlogFilters
                categories={categoriesResponse.items}
                tags={uniqueTags}
                locale={lang}
                activeCategory={category}
                activeTag={tag}
              />
            </div>
            
            <div className="lg:col-span-3">
              {postsResponse.items.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {postsResponse.items.map((post) => (
                      <BlogCard key={post.sys.id} post={post} locale={lang} />
                    ))}
                  </div>
                  
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    locale={lang}
                    baseUrl={`/${lang}/blog`}
                  />
                </>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                    {t.blog.notFound.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {t.blog.notFound.description}
                    {category ? t.blog.notFound.withCategory : ''}
                    {tag ? t.blog.notFound.withTag : ''}
                  </p>
                  <p className="text-gray-600">
                    {t.blog.notFound.checkOtherLanguage}
                  </p>
                  <div className="mt-6">
                    <a 
                      href={`/${baseLocale === 'pt' ? 'en' : 'pt'}/blog${category ? `?category=${category}` : ''}${tag ? `${category ? '&' : '?'}tag=${tag}` : ''}`} 
                      className="inline-block bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition"
                    >
                      {t.blog.notFound.viewInOtherLanguage}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </BackgroundEffect>
    </>
  );
} 