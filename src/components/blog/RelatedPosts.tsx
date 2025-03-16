import { BlogPost } from '@/lib/contentful/types';
import { Locale } from '@/config/i18n.config';
import Link from 'next/link';
import Image from 'next/image';
import BlogImage from './BlogImage';
import { getTranslations } from '@/app/[lang]/translations';

interface RelatedPostsProps {
  posts: BlogPost[];
  locale: Locale;
  title?: string;
}

// Função para extrair URL da imagem de maneira segura
function getImageUrl(image: any): string | null {
  try {
    if (!image) {
      return null;
    }
    
    // Formato da Content Delivery API
    if (image.fields && image.fields.file && image.fields.file.url) {
      return `https:${image.fields.file.url}`;
    }
    
    // Referência com ID
    if (image.sys && typeof image.sys === 'object' && image.sys.id) {
      return null;
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

export default function RelatedPosts({ posts, locale, title }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  // Obter as traduções para o idioma atual
  const t = getTranslations(locale);
  
  // Fallback image
  const fallbackImageUrl = "/assets/images/placeholder-blog.jpeg";
  // ID do espaço Contentful
  const spaceId = process.env.CONTENTFUL_SPACE_ID;

  return (
    <section className="mt-12 border-t border-gray-200 pt-8 w-full">
      <div>
        <h2 className="text-2xl font-playfair font-bold mb-6 text-gray-900 w-full relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-32 after:h-[2px] after:bg-pink-300">
          {title || t.blog.relatedPosts}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
          {posts.map((post) => {
            const { title, slug, image } = post.fields;
            const postUrl = `/${locale}/blog/${slug}`;
            const imageUrl = getImageUrl(image);
            
            // Extrair assetId de referências
            const imageAny = image as any;
            const assetId = imageAny?.sys?.id;
            
            // Verificar se temos uma referência ou uma URL direta
            const hasImageReference = image && !imageUrl && assetId && spaceId;
            
            return (
              <article key={post.sys.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <Link href={postUrl} className="block">
                  {imageUrl ? (
                    <div className="relative h-40 w-full">
                      <Image
                        src={imageUrl}
                        alt={title || 'Related post image'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                  ) : hasImageReference ? (
                    <div className="relative h-40 w-full">
                      <BlogImage
                        src=""
                        fallbackSrc={fallbackImageUrl}
                        alt={title || 'Related post image'}
                        aspectRatio="16/9"
                        assetId={assetId}
                        spaceId={spaceId}
                        className="h-40"
                      />
                    </div>
                  ) : (
                    <div className="relative h-40 w-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">{t.blog.title}</span>
                    </div>
                  )}
                </Link>
                
                <div className="p-4">
                  <Link href={postUrl} className="block">
                    <h3 className="text-lg font-playfair font-bold text-gray-900 hover:text-pink-700 transition-colors line-clamp-2">
                      {title}
                    </h3>
                  </Link>
                  
                  <Link
                    href={postUrl}
                    className="mt-2 inline-block text-sm font-medium text-pink-700 hover:text-pink-900 transition-colors"
                  >
                    {t.blog.readMore}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
} 