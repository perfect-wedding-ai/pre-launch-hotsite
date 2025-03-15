import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { BlogPost } from '@/lib/contentful/types';
import { Locale } from '@/config/i18n.config';
import BlogImage from './BlogImage';
import { getTranslations, getBaseLocale } from '@/app/[lang]/translations';

interface BlogCardProps {
  post: BlogPost;
  locale: Locale;
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

export default function BlogCard({ post, locale }: BlogCardProps) {
  const { title, publishDate, tags = [], image, metadescription, category, slug } = post.fields;
  
  // Obter as traduções para o idioma atual
  const t = getTranslations(locale);
  
  // Extrair o idioma base (ex: 'pt-BR' -> 'pt')
  const baseLocale = getBaseLocale(locale);
  
  const imageUrl = getImageUrl(image);
  
  // Extrair assetId de referências
  const imageAny = image as any;
  const assetId = imageAny?.sys?.id;
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  
  // Fallback image
  const fallbackImageUrl = "/assets/images/placeholder-blog.jpeg";
  
  const dateLocale = baseLocale === 'pt' ? ptBR : enUS;
  
  // Tratar datas potencialmente inválidas
  let formattedDate = '';
  try {
    const dateObj = publishDate ? new Date(publishDate) : new Date();
    // Verificar se a data é válida
    if (!isNaN(dateObj.getTime())) {
      formattedDate = format(dateObj, 'dd MMM, yyyy', { locale: dateLocale });
    }
  } catch (error) {
    formattedDate = '';
  }
  
  const postUrl = `/${locale}/blog/${slug}`;
  
  // Verificar se temos uma referência ou uma URL direta
  const hasImageReference = image && !imageUrl && assetId && spaceId;
  
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={postUrl} className="block">
        {imageUrl ? (
          <div className="relative h-64 w-full">
            <Image
              src={imageUrl}
              alt={title || 'Blog post image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : hasImageReference ? (
          <div className="relative h-64 w-full">
            <BlogImage
              src=""
              fallbackSrc={fallbackImageUrl}
              alt={title || 'Blog post image'}
              aspectRatio="16/9"
              assetId={assetId}
              spaceId={spaceId}
              className="h-64"
            />
          </div>
        ) : (
          <div className="relative h-64 w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-lg">{t.blog.title}</span>
          </div>
        )}
      </Link>
      
      <div className="p-6">
        <Link href={postUrl} className="block">
          <h2 className="text-xl font-playfair font-bold mb-2 text-gray-900 hover:text-pink-700 transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>
        
        {metadescription && (
          <p className="text-gray-600 mb-4 line-clamp-3">{metadescription}</p>
        )}
        
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          {formattedDate && (
            <time dateTime={publishDate}>{formattedDate}</time>
          )}
          
          <Link
            href={postUrl}
            className="font-medium text-pink-700 hover:text-pink-900 transition-colors"
          >
            {t.blog.readMore}
          </Link>
        </div>
      </div>
    </article>
  );
} 