import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { BlogPost } from '@/lib/contentful/types';
import { Locale } from '@/config/i18n.config';

interface BlogCardProps {
  post: BlogPost;
  locale: Locale;
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  const { title, publishDate, tags, image, metadescription, category, slug } = post.fields;
  
  const dateLocale = locale === 'pt' ? ptBR : enUS;
  const formattedDate = format(new Date(publishDate), 'dd MMM, yyyy', { locale: dateLocale });
  
  const postUrl = `/${locale}/blog/${slug}`;
  
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={postUrl} className="block">
        {image ? (
          <div className="relative h-64 w-full">
            <Image
              src={`https:${image.fields.file.url}`}
              alt={image.fields.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="relative h-64 w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-lg">Perfect Wedding Blog</span>
          </div>
        )}
      </Link>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/${locale}/blog?tag=${encodeURIComponent(tag)}`}
              className="text-xs font-semibold bg-pink-100 text-pink-800 px-2 py-1 rounded-full hover:bg-pink-200 transition-colors"
            >
              {tag}
            </Link>
          ))}
          
          {category && (
            <Link
              href={`/${locale}/blog?category=${category.sys.id}`}
              className="text-xs font-semibold bg-purple-100 text-purple-800 px-2 py-1 rounded-full hover:bg-purple-200 transition-colors"
            >
              {category.fields.name}
            </Link>
          )}
        </div>
        
        <Link href={postUrl} className="block">
          <h2 className="text-xl font-playfair font-bold mb-2 text-gray-900 hover:text-pink-700 transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>
        
        {metadescription && (
          <p className="text-gray-600 mb-4 line-clamp-3">{metadescription}</p>
        )}
        
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <time dateTime={publishDate}>{formattedDate}</time>
          
          <Link
            href={postUrl}
            className="font-medium text-pink-700 hover:text-pink-900 transition-colors"
          >
            {locale === 'pt' ? 'Leia mais' : 'Read more'}
          </Link>
        </div>
      </div>
    </article>
  );
} 