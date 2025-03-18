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
import Footer from '@/components/Footer';

interface BlogPageProps {
  params: {
    lang: Locale;
  };
  searchParams: {
    page?: string;
    tag?: string;
    category?: string;
    category_name?: string;
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

// Helper para timeout em chamadas de API
const fetchWithTimeout = async (fetchPromise: Promise<any>, timeoutMs = 8000) => {
  let timeoutId: NodeJS.Timeout | undefined;

  // Criando uma promise que rejeita após o timeout
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Request timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    // Corrida entre a promise original e o timeout
    const result = await Promise.race([fetchPromise, timeoutPromise]);
    if (timeoutId) clearTimeout(timeoutId);
    return result;
  } catch (error) {
    if (timeoutId) clearTimeout(timeoutId);
    throw error;
  }
};

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { lang } = params;
  const { page = '1', tag, category, category_name } = searchParams;
  
  // Verificar locales configurados no Contentful
  await getContentfulLocales();
  
  // Buscar todas as categorias
  const categoriesResponse = await getCategories(lang);
  
  // Se temos um nome de categoria, tentar encontrar o ID correspondente
  let categoryId = category;
  
  if (category_name && !category) {
    // Cache local para ID de categoria
    const categoryNameLowerCase = category_name.toLowerCase().trim();
    
    // Verificar se há algum caractere especial ou formato inválido no nome da categoria
    const hasSpecialChars = /[^\w\s-]/.test(categoryNameLowerCase);
    
    // Busca mais flexível (case insensitive e ignorando espaços extras)
    const searchName = categoryNameLowerCase;
    
    const foundCategory = categoriesResponse.items.find(
      cat => {
        const catName = cat.fields.name?.toLowerCase()?.trim();
        const catSlug = cat.fields.slug?.toLowerCase()?.trim();
        
        const nameMatch = catName === searchName;
        const slugMatch = catSlug === searchName;
        
        return nameMatch || slugMatch;
      }
    );
    
    if (foundCategory) {
      categoryId = foundCategory.sys.id;
    } else {
      // Se não encontrou pelo nome exato, tentar uma busca parcial
      const similarCategory = categoriesResponse.items.find(
        cat => {
          // Proteger contra valores nulos ou undefined
          const catNameLower = cat.fields.name?.toLowerCase() || '';
          return catNameLower.includes(searchName) || searchName.includes(catNameLower);
        }
      );
      
      if (similarCategory) {
        categoryId = similarCategory.sys.id;
      }
    }
  }
  
  const currentPage = parseInt(page, 10) || 1;
  const postsPerPage = 9;
  const skip = (currentPage - 1) * postsPerPage;
  
  // Buscar posts com paginação e filtros
  let postsResponse;
  try {
    const postsPromise = getBlogPosts(lang, {
      limit: postsPerPage,
      skip,
      tag,
      category: categoryId,
    });
    
    // Aplicar timeout para evitar espera infinita
    postsResponse = await fetchWithTimeout(postsPromise, 10000);
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Fallback: buscar posts sem filtro
    try {
      const fallbackPromise = getBlogPosts(lang, {
        limit: postsPerPage,
        skip
      });
      
      // Aplicar timeout para o fallback também
      postsResponse = await fetchWithTimeout(fallbackPromise, 8000);
    } catch (fallbackError) {
      console.error("Error fetching fallback posts:", fallbackError);
      // Fornecer uma resposta vazia para evitar erros
      postsResponse = { items: [], total: 0 };
    }
  }
  
  // Garantir que postsResponse sempre tenha uma estrutura válida
  if (!postsResponse || !postsResponse.items) {
    postsResponse = { items: [], total: 0 };
  }
  
  // Buscar todos os posts para extrair tags (limitado a 100 para performance)
  let allPostsResponse;
  let uniqueTags: string[] = [];
  try {
    // Aplicar timeout para evitar espera infinita
    allPostsResponse = await fetchWithTimeout(getBlogPosts(lang, { limit: 100 }), 5000);
    uniqueTags = extractUniqueTags(allPostsResponse.items || [], lang);
  } catch (error) {
    console.error("Error fetching tags:", error);
    // Deixar tags vazias em caso de erro
  }
  
  const totalPages = Math.ceil((postsResponse.total || 0) / postsPerPage) || 1;
  
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
            {/* Filtros - visíveis apenas em telas grandes (lg:) na coluna 1 */}
            <div className="hidden lg:block lg:col-span-1 order-1">
              <BlogFilters
                categories={categoriesResponse.items}
                tags={uniqueTags}
                locale={lang}
                activeCategory={categoryId}
                activeTag={tag}
              />
            </div>
            
            {/* Posts do blog - em telas grandes ocupam 3 colunas */}
            <div className="lg:col-span-3 order-2 lg:order-2">
              {postsResponse.items.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {postsResponse.items.map((post: any) => (
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
                    {category_name ? 
                      `${t.blog.notFound.title} "${category_name}"` : 
                      t.blog.notFound.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {t.blog.notFound.description}
                    {category ? t.blog.notFound.withCategory : ''}
                    {category_name ? t.blog.notFound.withCategory : ''}
                    {tag ? t.blog.notFound.withTag : ''}
                  </p>
                  <p className="text-gray-600">
                    {t.blog.notFound.checkOtherLanguage}
                  </p>
                  <div className="mt-6">
                    <a 
                      href={`/${lang}/blog`} 
                      className="inline-block bg-primary text-white py-2 px-6 mr-4 rounded-md hover:bg-primary-dark transition"
                    >
                      {"Ver todos os posts"}
                    </a>
                    <a 
                      href={`/${baseLocale === 'pt' ? 'en' : 'pt'}/blog`} 
                      className="inline-block bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 transition"
                    >
                      {t.blog.notFound.viewInOtherLanguage}
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {/* Filtros - visíveis apenas em telas pequenas (abaixo de lg) após os posts */}
            <div className="lg:hidden col-span-1 order-3 mt-8">
              <BlogFilters
                categories={categoriesResponse.items}
                tags={uniqueTags}
                locale={lang}
                activeCategory={categoryId}
                activeTag={tag}
              />
            </div>
          </div>
        </div>
      </BackgroundEffect>
      
      <Footer lang={lang as any} t={t} />
    </>
  );
} 