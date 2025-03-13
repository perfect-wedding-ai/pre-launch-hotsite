import { BlogPost } from '@/lib/contentful/types';
import { Locale } from '@/config/i18n.config';
import Link from 'next/link';
import Image from 'next/image';

interface RelatedPostsProps {
  posts: BlogPost[];
  locale: Locale;
  title?: string;
}

export default function RelatedPosts({ posts, locale, title }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  const defaultTitle = locale === 'pt' ? 'Posts Relacionados' : 'Related Posts';

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-playfair font-bold mb-6 text-gray-900">
        {title || defaultTitle}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => {
          const { title, slug, image } = post.fields;
          const postUrl = `/${locale}/blog/${slug}`;
          
          return (
            <article key={post.sys.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <Link href={postUrl} className="block">
                {image ? (
                  <div className="relative h-40 w-full">
                    <Image
                      src={`https:${image.fields.file.url}`}
                      alt={image.fields.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative h-40 w-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Perfect Wedding Blog</span>
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
                  {locale === 'pt' ? 'Leia mais' : 'Read more'}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
} 