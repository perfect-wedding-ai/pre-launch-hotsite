import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { BlogPost } from '@/lib/contentful/types';
import { Locale } from '@/config/i18n.config';
import BlogImage from './BlogImage';

interface BlogCardProps {
  post: BlogPost;
  locale: Locale;
}

// Função para extrair URL da imagem de maneira segura, similar à da página de post individual
function getImageUrl(image: any): string | null {
  try {
    if (!image) {
      return null;
    }
    
    // CASO 1: Formato da Content Delivery API
    if (image.fields && image.fields.file && image.fields.file.url) {
      return `https:${image.fields.file.url}`;
    }
    
    // CASO 2: Referência com ID
    if (image.sys && typeof image.sys === 'object' && image.sys.id) {
      // No lugar de gerar uma URL estática com "image.jpg", vamos usar a mesma
      // lógica da página de post individual, retornando null para usar o componente
      // BlogImage que testa diversas URLs até encontrar uma que funcione
      return null;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting image URL:', error);
    return null;
  }
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  const { title, publishDate, tags = [], image, metadescription, category, slug } = post.fields;
  
  const imageUrl = getImageUrl(image);
  
  // Extrair assetId de referências
  const imageAny = image as any;
  const assetId = imageAny?.sys?.id;
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  
  // Fallback image
  const fallbackImageUrl = "/assets/images/placeholder-blog.jpeg";
  
  const dateLocale = locale === 'pt' ? ptBR : enUS;
  
  // Tratar datas potencialmente inválidas
  let formattedDate = '';
  try {
    const dateObj = publishDate ? new Date(publishDate) : new Date();
    // Verificar se a data é válida
    if (!isNaN(dateObj.getTime())) {
      formattedDate = format(dateObj, 'dd MMM, yyyy', { locale: dateLocale });
    }
  } catch (error) {
    console.error('Error formatting date:', error);
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
            <span className="text-gray-400 text-lg">Perfect Wedding Blog</span>
          </div>
        )}
      </Link>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {Array.isArray(tags) && tags.map((tag) => (
            <Link
              key={tag}
              href={`/${locale}/blog?tag=${encodeURIComponent(tag)}`}
              className="text-xs font-semibold bg-pink-100 text-pink-800 px-2 py-1 rounded-full hover:bg-pink-200 transition-colors"
            >
              {tag}
            </Link>
          ))}
          
          {category && category.fields && category.fields.name && (
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
          {formattedDate && (
            <time dateTime={publishDate}>{formattedDate}</time>
          )}
          
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