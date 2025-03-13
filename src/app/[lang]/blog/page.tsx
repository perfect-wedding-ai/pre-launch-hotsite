import { Metadata } from 'next';
import { getBlogPosts, getCategories } from '@/lib/contentful/client';
import { Locale } from '@/config/i18n.config';
import BlogCard from '@/components/blog/BlogCard';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogFilters from '@/components/blog/BlogFilters';
import Pagination from '@/components/blog/Pagination';

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
  
  const title = lang === 'pt' ? 'Blog Perfect Wedding' : 'Perfect Wedding Blog';
  const description = lang === 'pt'
    ? 'Dicas, inspirações e tendências para o seu casamento perfeito'
    : 'Tips, inspirations and trends for your perfect wedding';
  
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
const extractUniqueTags = (posts: any[]): string[] => {
  const tagsSet = new Set<string>();
  
  posts.forEach((post) => {
    if (post.fields.tags && Array.isArray(post.fields.tags)) {
      post.fields.tags.forEach((tag: string) => tagsSet.add(tag));
    }
  });
  
  return Array.from(tagsSet).sort();
};

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { lang } = params;
  const { page = '1', tag, category } = searchParams;
  
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
  const uniqueTags = extractUniqueTags(allPostsResponse.items);
  
  const totalPages = Math.ceil(postsResponse.total / postsPerPage);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <BlogHeader locale={lang} />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                {lang === 'pt' ? 'Nenhum post encontrado' : 'No posts found'}
              </h2>
              <p className="text-gray-600">
                {lang === 'pt'
                  ? 'Não encontramos posts com os filtros selecionados. Tente outros filtros ou volte mais tarde.'
                  : 'We couldn\'t find any posts with the selected filters. Try other filters or check back later.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 