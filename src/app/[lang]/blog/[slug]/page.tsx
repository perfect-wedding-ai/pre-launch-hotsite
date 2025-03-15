import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { getBlogPostBySlug, getRelatedPosts, getContentfulImageUrl } from '@/lib/contentful/client';
import { Locale } from '@/config/i18n.config';
import RichTextRenderer from '@/components/blog/RichTextRenderer';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import BlogHeader from '@/components/blog/BlogHeader';
import RelatedPosts from '@/components/blog/RelatedPosts';
import BlogImage from '@/components/blog/BlogImage';
import Header from '@/components/Header';
import { getTranslations } from '../../translations';
import { Document } from '@contentful/rich-text-types';

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
      return null;
    }
    
    // CASO 1: Formato da Content Delivery API
    if (image.fields && image.fields.file && image.fields.file.url) {
      return `https:${image.fields.file.url}`;
    }
    
    // CASO 2: Formato da Content Management API (campos localizados)
    if (image.fields && image.fields.file && typeof image.fields.file === 'object') {
      // Verificar se o campo file é um objeto com chaves de locale
      const fileField = image.fields.file;
      
      // Tentar encontrar qualquer chave de locale (en, pt, etc.)
      for (const locale in fileField) {
        if (fileField[locale] && fileField[locale].url) {
          return `https:${fileField[locale].url}`;
        }
      }
    }
    
    // CASO 3: Verificar se a imagem tem um campo url diretamente
    if (image.fields && image.fields.url) {
      return image.fields.url.startsWith('http') ? 
        image.fields.url : `https:${image.fields.url}`;
    }
    
    // CASO 4: Verificar se a imagem tem uma URL aninhada em algum lugar
    if (image.fields) {
      for (const key in image.fields) {
        const field = image.fields[key];
        
        // Se o campo é um objeto e tem uma propriedade url
        if (field && typeof field === 'object' && field.url) {
          return field.url.startsWith('http') ? field.url : `https:${field.url}`;
        }
        
        // Se o campo é um objeto que pode ter propriedades aninhadas
        if (field && typeof field === 'object') {
          for (const subkey in field) {
            const subfield = field[subkey];
            
            // Verificar se o subcampo tem uma url
            if (subfield && typeof subfield === 'object' && subfield.url) {
              return subfield.url.startsWith('http') ? 
                subfield.url : `https:${subfield.url}`;
            }
          }
        }
      }
    }
    
    // CASO 5: O próprio image é a URL ou tem uma propriedade url direta
    if (typeof image === 'string') {
      return image.startsWith('http') ? image : `https:${image}`;
    }
    
    if (image.url) {
      return image.url.startsWith('http') ? image.url : `https:${image.url}`;
    }
    
    // CASO 6: Verificar se há uma referência com ID e usar getContentfulImageUrl
    if (image.sys && typeof image.sys === 'object' && image.sys.id) {
      // Verificar se é realmente um link para um asset
      if (image.sys.linkType === 'Asset') {
        // Retornamos null para forçar o uso do fallback - o componente BlogImage
        // vai tentar várias URLs diferentes usando o assetId e spaceId
        return null;
      }
      
      return getContentfulImageUrl(image.sys.id);
    }
    
    return null;
  } catch (error) {
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

// Função auxiliar para converter rich text para texto markdown
function richTextToString(document: Document): string {
  if (!document) return '';
  
  try {
    // Definir tipos para listType
    type ListType = null | { type: 'ol' | 'ul', index?: number };
    
    const extractTextFromNode = (node: any, listType: ListType = null, listDepth = 0): string => {
      // Se não for um nó válido
      if (!node) return '';
      
      // Se for nó de texto
      if (node.nodeType === 'text') {
        let text = node.value || '';
        
        // Aplicar formatações do Contentful
        if (node.marks && Array.isArray(node.marks)) {
          node.marks.forEach((mark: any) => {
            if (mark.type === 'bold') {
              text = `**${text}**`;
            } else if (mark.type === 'italic') {
              text = `*${text}*`;
            } else if (mark.type === 'underline') {
              text = `<u>${text}</u>`;
            } else if (mark.type === 'code') {
              text = `\`${text}\``;
            }
          });
        }
        
        return text;
      }
      
      // Para outros tipos de nós
      let result = '';
      
      // Processar diferentes tipos de nós
      switch (node.nodeType) {
        case 'document':
          if (node.content) {
            result = node.content.map((child: any) => extractTextFromNode(child)).join('');
          }
          break;
          
        case 'paragraph':
          if (node.content) {
            // Se estivermos dentro de uma lista, não adicione quebras de linha extras
            result = node.content.map((child: any) => extractTextFromNode(child)).join('');
            if (!listType) {
              result += '\n\n';
            }
          }
          break;
          
        case 'heading-1':
          if (node.content) {
            result = '# ' + node.content.map((child: any) => extractTextFromNode(child)).join('') + '\n\n';
          }
          break;
          
        case 'heading-2':
          if (node.content) {
            result = '## ' + node.content.map((child: any) => extractTextFromNode(child)).join('') + '\n\n';
          }
          break;
          
        case 'heading-3':
          if (node.content) {
            result = '### ' + node.content.map((child: any) => extractTextFromNode(child)).join('') + '\n\n';
          }
          break;
          
        case 'heading-4':
          if (node.content) {
            result = '#### ' + node.content.map((child: any) => extractTextFromNode(child)).join('') + '\n\n';
          }
          break;
          
        case 'heading-5':
          if (node.content) {
            result = '##### ' + node.content.map((child: any) => extractTextFromNode(child)).join('') + '\n\n';
          }
          break;
          
        case 'heading-6':
          if (node.content) {
            result = '###### ' + node.content.map((child: any) => extractTextFromNode(child)).join('') + '\n\n';
          }
          break;
          
        case 'unordered-list':
          if (node.content) {
            result = node.content.map((child: any) => extractTextFromNode(child, { type: 'ul' }, listDepth + 1)).join('') + '\n';
          }
          break;
          
        case 'ordered-list':
          if (node.content) {
            result = node.content.map((child: any, index: number) => {
              // Passar explicitamente o índice e o tipo da lista
              return extractTextFromNode(child, { type: 'ol', index: index + 1 }, listDepth + 1);
            }).join('') + '\n';
          }
          break;
          
        case 'list-item':
          if (node.content) {
            // Formatar o item baseado no tipo de lista
            const prefix = listType && listType.type === 'ol' && listType.index 
              ? `${listType.index}. ` 
              : '- ';
            const indent = '  '.repeat(listDepth);
            const content = node.content.map((child: any) => extractTextFromNode(child, listType, listDepth)).join('');
            result = `${indent}${prefix}${content}\n`;
          }
          break;
          
        case 'hyperlink':
          if (node.content) {
            const text = node.content.map((child: any) => extractTextFromNode(child)).join('');
            result = `[${text}](${node.data.uri})`;
          }
          break;
          
        case 'embedded-asset-block':
          result = '\n![Embedded Asset](embedded-asset)\n\n';
          break;
          
        case 'hr':
          result = '\n---\n\n';
          break;
          
        case 'blockquote':
          if (node.content) {
            const quote = node.content.map((child: any) => extractTextFromNode(child)).join('');
            result = `> ${quote.replace(/\n/g, '\n> ')}\n\n`;
          }
          break;
          
        default:
          // Se o nó tiver conteúdo, processar recursivamente
          if (node.content && Array.isArray(node.content)) {
            result = node.content.map((child: any) => extractTextFromNode(child, listType, listDepth)).join('');
          }
      }
      
      return result;
    };
    
    // Processar documento inteiro
    const result = extractTextFromNode(document);
    
    return result;
  } catch (error) {
    console.error('Error converting rich text to string:', error);
    return '';
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = params;
  
  const post = await getBlogPostBySlug(slug, lang);
  
  // Obter as traduções para o idioma atual
  const t = getTranslations(lang);
  
  if (!post) {
    return {
      title: t.blog.postNotFound,
    };
  }
  
  const { title, metadescription, image } = post.fields;
  const imageUrl = getImageUrl(image);
  const { width, height } = getImageDimensions(image);
  const imageTitle = getImageTitle(image);
  
  // URL de fallback para quando não conseguimos extrair a URL da imagem
  const fallbackImageUrl = "/assets/images/placeholder-blog.jpeg";
  
  return {
    title: `${title} | ${t.blog.title}`,
    description: metadescription || undefined,
    openGraph: {
      title: `${title} | ${t.blog.title}`,
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
          alt: t.blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${t.blog.title}`,
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
  
  // Obter as traduções para o idioma atual
  const t = getTranslations(lang);
  
  // Extrair o idioma base para formatação de datas
  const baseLocale = lang.split('-')[0];
  
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
  const dateLocale = baseLocale === 'pt' ? ptBR : enUS;
  
  // Tratar datas potencialmente inválidas
  let formattedPublishDate = '';
  let formattedUpdateDate = '';
  
  try {
    if (publishDate) {
      const pubDate = new Date(publishDate);
      if (!isNaN(pubDate.getTime())) {
        formattedPublishDate = format(pubDate, 'PPP', { locale: dateLocale });
      }
    }
    
    if (lastUpdateDate) {
      const updateDate = new Date(lastUpdateDate);
      if (!isNaN(updateDate.getTime())) {
        formattedUpdateDate = format(updateDate, 'PPP', { locale: dateLocale });
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
    <>
      <Header lang={lang as any} t={t} />
      
      <div className="container mx-auto px-4 py-16 mt-24">
        <BlogHeader locale={lang} showBackLink={false} />
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
              {title}
            </h1>
            
            <div className="flex flex-wrap items-center text-gray-600 text-sm mb-4 gap-6">
              {publishDate && (
                <span>
                  <time dateTime={publishDate}>
                    {format(
                      new Date(publishDate),
                      'PPP',
                      { locale: dateLocale }
                    )}
                  </time>
                </span>
              )}
              
              {lastUpdateDate && (
                <span>
                  {t.blog.updatedOn}{' '}
                  <time dateTime={lastUpdateDate}>
                    {format(
                      new Date(lastUpdateDate),
                      'PPP',
                      { locale: dateLocale }
                    )}
                  </time>
                </span>
              )}
              
              {category && category.fields && category.fields.name && (
                <span className="text-purple-700">
                  {t.blog.category} {category.fields.name}
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
            <MarkdownRenderer content={richTextToString(body)} locale={lang} />
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
    </>
  );
} 