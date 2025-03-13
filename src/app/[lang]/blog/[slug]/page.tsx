import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { getBlogPostBySlug, getRelatedPosts } from '@/lib/contentful/client';
import { Locale } from '@/config/i18n.config';
import RichTextRenderer from '@/components/blog/RichTextRenderer';
import BlogHeader from '@/components/blog/BlogHeader';
import RelatedPosts from '@/components/blog/RelatedPosts';

interface BlogPostPageProps {
  params: {
    lang: Locale;
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = params;
  
  const post = await getBlogPostBySlug(slug, lang);
  
  if (!post) {
    return {
      title: 'Post não encontrado | Perfect Wedding',
    };
  }
  
  const { title, metadescription, image } = post.fields;
  
  return {
    title: `${title} | Perfect Wedding Blog`,
    description: metadescription || undefined,
    openGraph: {
      title: `${title} | Perfect Wedding Blog`,
      description: metadescription || undefined,
      type: 'article',
      url: `https://perfectwedding.ai/${lang}/blog/${slug}`,
      images: image ? [
        {
          url: `https:${image.fields.file.url}`,
          width: image.fields.file.details.image.width,
          height: image.fields.file.details.image.height,
          alt: image.fields.title,
        },
      ] : [
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
      title: `${title} | Perfect Wedding Blog`,
      description: metadescription || undefined,
      images: image ? [`https:${image.fields.file.url}`] : ['https://perfectwedding.ai/images/og-image.jpg'],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = params;
  
  const post = await getBlogPostBySlug(slug, lang);
  
  if (!post) {
    notFound();
  }
  
  const { title, body, image, tags, publishDate, lastUpdateDate, category } = post.fields;
  
  // Formatar datas
  const dateLocale = lang === 'pt' ? ptBR : enUS;
  const formattedPublishDate = format(new Date(publishDate), 'dd MMMM, yyyy', { locale: dateLocale });
  const formattedUpdateDate = format(new Date(lastUpdateDate), 'dd MMMM, yyyy', { locale: dateLocale });
  
  // Buscar posts relacionados
  const relatedPosts = await getRelatedPosts(post.sys.id, tags, lang);
  
  // Estruturar dados para JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': title,
    'image': image ? `https:${image.fields.file.url}` : 'https://perfectwedding.ai/images/og-image.jpg',
    'datePublished': publishDate,
    'dateModified': lastUpdateDate,
    'author': {
      '@type': 'Organization',
      'name': 'Perfect Wedding',
      'url': 'https://perfectwedding.ai',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Perfect Wedding',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://perfectwedding.ai/images/logo.png',
      },
    },
    'description': post.fields.metadescription || '',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://perfectwedding.ai/${lang}/blog/${slug}`,
    },
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        <BlogHeader 
          locale={lang} 
          showBackLink={true}
        />
        
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <time dateTime={publishDate}>
              {lang === 'pt' ? 'Publicado em' : 'Published on'} {formattedPublishDate}
            </time>
            
            {publishDate !== lastUpdateDate && (
              <time dateTime={lastUpdateDate}>
                {lang === 'pt' ? 'Atualizado em' : 'Updated on'} {formattedUpdateDate}
              </time>
            )}
            
            {category && (
              <span className="text-purple-700">
                {lang === 'pt' ? 'Categoria:' : 'Category:'} {category.fields.name}
              </span>
            )}
          </div>
          
          {image && (
            <div className="relative h-96 w-full mb-8">
              <Image
                src={`https:${image.fields.file.url}`}
                alt={image.fields.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <a
                key={tag}
                href={`/${lang}/blog?tag=${encodeURIComponent(tag)}`}
                className="text-xs font-semibold bg-pink-100 text-pink-800 px-3 py-1 rounded-full hover:bg-pink-200 transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
        </header>
        
        <div className="prose prose-lg max-w-none">
          <RichTextRenderer content={body} locale={lang} />
        </div>
        
        {relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} locale={lang} />
        )}
      </article>
      
      {/* JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
} 