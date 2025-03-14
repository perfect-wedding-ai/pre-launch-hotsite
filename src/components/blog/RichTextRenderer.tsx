import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { Document } from '@contentful/rich-text-types';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/config/i18n.config';

interface RichTextRendererProps {
  content: Document;
  locale: Locale;
}

// Função auxiliar para extrair campos de assets com segurança
function getAssetFields(node: any) {
  try {
    // Para debug
    console.log('Asset node structure:', JSON.stringify(node?.data?.target, null, 2));
    
    // Tenta obter os campos no formato que a Content Delivery API retorna
    if (node.data?.target?.fields) {
      const fields = node.data.target.fields;
      
      // Verificar se os campos estão no formato localizado
      if (fields.title && typeof fields.title === 'object') {
        // Encontrar o locale correto
        const locales = Object.keys(fields.title);
        const locale = locales[0]; // Usa o primeiro locale disponível
        
        // Extrair campos localizados
        return {
          title: fields.title[locale],
          description: fields.description?.[locale],
          file: fields.file?.[locale]
        };
      }
      
      // Formato da API de entrega
      return {
        title: fields.title,
        description: fields.description,
        file: fields.file
      };
    }
    
    // Tenta acessar diretamente a propriedade file sem passar por fields
    if (node.data?.target?.file) {
      return {
        title: node.data.target.title || '',
        description: node.data.target.description || '',
        file: node.data.target.file
      };
    }
    
    return { title: '', description: '', file: null };
  } catch (error) {
    console.error('Error extracting asset fields:', error, node);
    return { title: '', description: '', file: null };
  }
}

export default function RichTextRenderer({ content, locale }: RichTextRendererProps) {
  if (!content) {
    return <div className="text-gray-500">Conteúdo indisponível</div>;
  }
  
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold">{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
      [MARKS.UNDERLINE]: (text: React.ReactNode) => <u className="underline">{text}</u>,
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="px-1 py-0.5 rounded bg-gray-100 font-mono text-sm">{text}</code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
        <p className="mb-6 leading-relaxed text-gray-800">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
        <h1 className="text-4xl font-bold mb-6 mt-8 font-playfair">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
        <h2 className="text-3xl font-bold mb-5 mt-8 font-playfair">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
        <h3 className="text-2xl font-bold mb-4 mt-6 font-playfair">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => (
        <h4 className="text-xl font-bold mb-3 mt-5 font-playfair">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node: any, children: React.ReactNode) => (
        <h5 className="text-lg font-bold mb-2 mt-4 font-playfair">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node: any, children: React.ReactNode) => (
        <h6 className="text-base font-bold mb-2 mt-3 font-playfair">{children}</h6>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
        <ul className="list-disc pl-10 mb-6 space-y-2">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
        <ol className="list-decimal pl-10 mb-6 space-y-2">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
        <li className="text-gray-800">{children}</li>
      ),
      [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-6 italic text-gray-700">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="mb-6 border-gray-300" />,
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        try {
          const { title, description, file } = getAssetFields(node);
          
          console.log('Extracted file data:', file);
          
          if (!file || !file.url) {
            console.error('File URL not found in asset', file);
            return (
              <div className="mb-6 p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-500">Imagem indisponível</p>
              </div>
            );
          }
          
          const url = file.url.startsWith('//') ? `https:${file.url}` : 
                     file.url.startsWith('/') ? `https:${file.url}` : file.url;
          
          // Tentar obter as dimensões da imagem
          let width = 800;
          let height = 600;
          
          if (file.details && file.details.image) {
            width = file.details.image.width || width;
            height = file.details.image.height || height;
          }
          
          console.log('Image URL prepared:', url);
          console.log('Image dimensions:', width, height);
          
          return (
            <div className="mb-6">
              <Image
                src={url}
                alt={description || title || 'Blog image'}
                width={width}
                height={height}
                className="rounded-lg mx-auto"
              />
              {description && (
                <p className="text-center text-sm text-gray-500 mt-2">{description}</p>
              )}
            </div>
          );
        } catch (error) {
          console.error('Error rendering embedded asset:', error);
          return (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg text-center">
              <p className="text-gray-500">Erro ao carregar imagem</p>
            </div>
          );
        }
      },
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => {
        const { uri } = node.data;
        const isExternal = uri.startsWith('http');

        return isExternal ? (
          <a
            href={uri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-700 hover:text-pink-900 underline"
          >
            {children}
          </a>
        ) : (
          <Link
            href={`/${locale}${uri}`}
            className="text-pink-700 hover:text-pink-900 underline"
          >
            {children}
          </Link>
        );
      },
      [INLINES.ENTRY_HYPERLINK]: (node: any, children: React.ReactNode) => {
        try {
          // Tenta extrair o slug de forma segura
          let slug = '';
          
          if (node.data?.target?.fields?.slug) {
            const slugField = node.data.target.fields.slug;
            // Verificar se é um objeto localizado
            if (typeof slugField === 'object') {
              slug = slugField[locale] || slugField['en'] || slugField[Object.keys(slugField)[0]];
            } else {
              slug = slugField;
            }
          }
          
          if (!slug) {
            return <span className="text-gray-500">{children}</span>;
          }
          
          return (
            <Link
              href={`/${locale}/blog/${slug}`}
              className="text-pink-700 hover:text-pink-900 underline"
            >
              {children}
            </Link>
          );
        } catch (error) {
          console.error('Error rendering entry hyperlink:', error);
          return <span className="text-gray-500">{children}</span>;
        }
      },
    },
  };

  return (
    <div className="rich-text-content">
      {documentToReactComponents(content, options)}
    </div>
  );
} 