import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { getBlogPostBySlug, getRelatedPosts, getContentfulImageUrl } from '@/lib/contentful/client';
import { Locale } from '@/config/i18n.config';
import RichTextRenderer from '@/components/blog/RichTextRenderer';
import BlogHeader from '@/components/blog/BlogHeader';
import RelatedPosts from '@/components/blog/RelatedPosts';
import BlogImage from '@/components/blog/BlogImage';

interface BlogPostPageProps {
  params: {
    lang: Locale;
    slug: string;
  };
}

// Função auxiliar para obter o URL da imagem de forma segura
function getImageUrl(image: any): string | null {
  try {
    if (!image) {
      console.log('Image is null or undefined');
      return null;
    }
    
    // Para debug - versão simplificada para evitar logs enormes
    console.log('Image type:', typeof image);
    console.log('Image has fields:', !!image.fields);
    console.log('Image has sys:', !!image.sys);
    
    if (image.fields) {
      console.log('Image fields keys:', Object.keys(image.fields));
      if (image.fields.file) {
        console.log('File type:', typeof image.fields.file);
        if (typeof image.fields.file === 'object') {
          console.log('File keys:', Object.keys(image.fields.file));
        }
      }
    }
    
    // CASO 1: Formato da Content Delivery API
    if (image.fields && image.fields.file && image.fields.file.url) {
      console.log('CASO 1: Formato CDA padrão');
      return `https:${image.fields.file.url}`;
    }
    
    // CASO 2: Formato da Content Management API (campos localizados)
    if (image.fields && image.fields.file && typeof image.fields.file === 'object') {
      console.log('CASO 2: Campos localizados');
      // Verificar se o campo file é um objeto com chaves de locale
      const fileField = image.fields.file;
      
      // Tentar encontrar qualquer chave de locale (en, pt, etc.)
      for (const locale in fileField) {
        console.log(`Verificando locale ${locale} em file`);
        if (fileField[locale] && fileField[locale].url) {
          console.log(`URL encontrada em locale ${locale}:`, fileField[locale].url);
          return `https:${fileField[locale].url}`;
        }
      }
    }
    
    // CASO 3: Verificar se a imagem tem um campo url diretamente
    if (image.fields && image.fields.url) {
      console.log('CASO 3: URL direto nos fields');
      return image.fields.url.startsWith('http') ? 
        image.fields.url : `https:${image.fields.url}`;
    }
    
    // CASO 4: Verificar se a imagem tem uma URL aninhada em algum lugar
    if (image.fields) {
      for (const key in image.fields) {
        const field = image.fields[key];
        
        // Se o campo é um objeto e tem uma propriedade url
        if (field && typeof field === 'object' && field.url) {
          console.log(`CASO 4: URL encontrada em fields.${key}`);
          return field.url.startsWith('http') ? field.url : `https:${field.url}`;
        }
        
        // Se o campo é um objeto que pode ter propriedades aninhadas
        if (field && typeof field === 'object') {
          for (const subkey in field) {
            const subfield = field[subkey];
            
            // Verificar se o subcampo tem uma url
            if (subfield && typeof subfield === 'object' && subfield.url) {
              console.log(`CASO 4: URL aninhada encontrada em fields.${key}.${subkey}`);
              return subfield.url.startsWith('http') ? 
                subfield.url : `https:${subfield.url}`;
            }
          }
        }
      }
    }
    
    // CASO 5: O próprio image é a URL ou tem uma propriedade url direta
    if (typeof image === 'string') {
      console.log('CASO 5: Image é uma string');
      return image.startsWith('http') ? image : `https:${image}`;
    }
    
    if (image.url) {
      console.log('CASO 5: Image tem url direta');
      return image.url.startsWith('http') ? image.url : `https:${image.url}`;
    }
    
    // CASO 6: Verificar se há uma referência com ID e usar uma URL construída para o Contentful
    if (image.sys && typeof image.sys === 'object' && image.sys.id) {
      // Log detalhado para diagnóstico
      console.log('CASO 6: Objeto completo da imagem:', JSON.stringify(image));
      console.log('CASO 6: Imagem é referência com ID', image.sys.id);
      console.log('CASO 6: Tipo de referência:', image.sys.linkType);
      
      // Verificar se é realmente um link para um asset
      if (image.sys.linkType === 'Asset') {
        const assetId = image.sys.id;
        
        // Este formato parece funcionar melhor com a Images API do Contentful
        const spaceId = process.env.CONTENTFUL_SPACE_ID;
        if (!spaceId) {
          console.error('CONTENTFUL_SPACE_ID não está definido');
          return null;
        }
        
        // Retornamos null para forçar o uso do fallback - o componente BlogImage
        // vai tentar várias URLs diferentes usando o assetId e spaceId
        return null;
      }
      
      // Se chegou aqui, não é um link para Asset ou tem outro formato
      return getContentfulImageUrl(image.sys.id);
    }
    
    console.error('Estrutura de imagem não reconhecida:', image);
    return null;
  } catch (error) {
    console.error('Error getting image URL:', error);
    return null;
  }
}

// Função para extrair dimensões da imagem com segurança
function getImageDimensions(image: any): { width: number; height: number } {
  try {
    // Formato da Content Delivery API
    if (
      image?.fields?.file?.details?.image?.width &&
      image?.fields?.file?.details?.image?.height
    ) {
      return {
        width: image.fields.file.details.image.width,
        height: image.fields.file.details.image.height
      };
    }
    
    // Formato da Content Management API com campos localizados
    if (image?.fields?.file) {
      const fileField = image.fields.file;
      if (typeof fileField === 'object') {
        // Tentar encontrar qualquer chave de locale
        for (const locale in fileField) {
          if (fileField[locale]?.details?.image) {
            return {
              width: fileField[locale].details.image.width || 1200,
              height: fileField[locale].details.image.height || 630
            };
          }
        }
      }
    }
  } catch (error) {
    console.error('Error getting image dimensions:', error);
  }
  
  // Valores padrão
  return { width: 1200, height: 630 };
}

// Função para extrair título da imagem
function getImageTitle(image: any): string {
  try {
    // Formato da Content Delivery API
    if (image?.fields?.title) {
      return image.fields.title;
    }
    
    // Formato da Content Management API com campos localizados
    if (image?.fields?.title && typeof image.fields.title === 'object') {
      for (const locale in image.fields.title) {
        if (image.fields.title[locale]) {
          return image.fields.title[locale];
        }
      }
    }
  } catch (error) {
    console.error('Error getting image title:', error);
  }
  
  return 'Blog post image';
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
  const imageUrl = getImageUrl(image);
  const { width, height } = getImageDimensions(image);
  const imageTitle = getImageTitle(image);
  
  // URL de fallback para quando não conseguimos extrair a URL da imagem
  const fallbackImageUrl = "/assets/images/placeholder-blog.jpeg";
  
  return {
    title: `${title} | Perfect Wedding Blog`,
    description: metadescription || undefined,
    openGraph: {
      title: `${title} | Perfect Wedding Blog`,
      description: metadescription || undefined,
      type: 'article',
      url: `https://perfectwedding.ai/${lang}/blog/${slug}`,
      images: imageUrl ? [
        {
          url: imageUrl,
          width,
          height,
          alt: imageTitle,
        },
      ] : [
        {
          url: fallbackImageUrl,
          width: 2048,
          height: 1152,
          alt: 'Perfect Wedding Blog',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Perfect Wedding Blog`,
      description: metadescription || undefined,
      images: imageUrl ? [imageUrl] : [fallbackImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = params;
  
  const post = await getBlogPostBySlug(slug, lang);
  
  if (!post) {
    notFound();
  }
  
  const { title, body, image, tags = [], publishDate, lastUpdateDate, category } = post.fields;
  console.log("Post data:", { title, hasImage: !!image, imageType: image ? typeof image : 'undefined' });
  
  // Se disponível no console, imprimir apenas os campos mais importantes para não poluir
  if (image) {
    const hasSys = typeof image === 'object' && 'sys' in image && typeof image.sys === 'object';
    const hasFields = typeof image === 'object' && 'fields' in image;
    
    console.log("Image estrutura:", {
      hasFields,
      hasSys,
      fieldsKeys: hasFields ? Object.keys(image.fields) : [],
      sysKeys: hasSys ? Object.keys((image as any).sys) : []
    });
  }
  
  // Adicionar configurações do Contentful para acesso a imagens
  const spaceId = process.env.CONTENTFUL_SPACE_ID || '';
  
  // URL de fallback para quando não conseguimos extrair a URL da imagem
  const fallbackImageUrl = "/assets/images/placeholder-blog.jpeg";
  
  // Extrair o ID do asset se a imagem for uma referência
  // Usando tipagem 'any' temporariamente para acessar .sys sem erro de TypeScript
  const imageAny = image as any;
  const assetId = imageAny?.sys?.id;
  
  // Log para debug
  console.log("Image object:", JSON.stringify(image, null, 2));
  console.log("Asset ID:", assetId);
  console.log("Space ID:", spaceId);
  
  const imageUrl = getImageUrl(image);
  console.log("Image URL extracted:", imageUrl);
  
  // Formatar datas
  const dateLocale = lang === 'pt' ? ptBR : enUS;
  
  // Tratar datas potencialmente inválidas
  let formattedPublishDate = '';
  let formattedUpdateDate = '';
  
  try {
    if (publishDate) {
      const pubDate = new Date(publishDate);
      if (!isNaN(pubDate.getTime())) {
        formattedPublishDate = format(pubDate, 'dd MMMM, yyyy', { locale: dateLocale });
      }
    }
    
    if (lastUpdateDate) {
      const updateDate = new Date(lastUpdateDate);
      if (!isNaN(updateDate.getTime())) {
        formattedUpdateDate = format(updateDate, 'dd MMMM, yyyy', { locale: dateLocale });
      }
    }
  } catch (error) {
    console.error('Error formatting dates:', error);
  }
  
  // Buscar posts relacionados
  const relatedPosts = await getRelatedPosts(post.sys.id, Array.isArray(tags) ? tags : [], lang);
  
  // Estruturar dados para JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': title,
    'image': imageUrl || fallbackImageUrl,
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
            {formattedPublishDate && (
              <time dateTime={publishDate}>
                {lang === 'pt' ? 'Publicado em' : 'Published on'} {formattedPublishDate}
              </time>
            )}
            
            {formattedPublishDate !== formattedUpdateDate && formattedUpdateDate && (
              <time dateTime={lastUpdateDate}>
                {lang === 'pt' ? 'Atualizado em' : 'Updated on'} {formattedUpdateDate}
              </time>
            )}
            
            {category && category.fields && category.fields.name && (
              <span className="text-purple-700">
                {lang === 'pt' ? 'Categoria:' : 'Category:'} {category.fields.name}
              </span>
            )}
          </div>
          
          {image && (
            <BlogImage 
              src={imageUrl || ''}
              fallbackSrc={fallbackImageUrl}
              alt={post.fields.title || 'Blog post image'}
              objectFit="contain"
              aspectRatio="2048/1152"
              maxHeight="600px"
              assetId={assetId}
              spaceId={spaceId}
            />
          )}
          
          <div className="flex flex-wrap gap-2 mb-8">
            {Array.isArray(tags) && tags.map((tag) => (
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