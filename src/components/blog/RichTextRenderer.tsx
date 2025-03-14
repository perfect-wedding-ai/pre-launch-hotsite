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

// Função para processar markdown em texto simples
function processMarkdownHeadings(node: any, children: React.ReactNode) {
  // Debug para analisar o conteúdo
  console.log('Node content:', node);
  console.log('Children type:', typeof children);
  console.log('Children content:', children);
  
  // Verificar se temos um texto ou um array de elementos
  if (!children) {
    return <p className="mb-6 leading-relaxed text-gray-800"></p>;
  }
  
  // Converter para string se for um texto simples ou tentar extrair o texto se for um elemento complexo
  let textContent = '';
  
  if (typeof children === 'string') {
    textContent = children;
    console.log('Text content (string):', textContent);
  } else if (Array.isArray(children)) {
    // Se for um array, verificar o primeiro elemento
    console.log('Children array:', children);
    if (children.length > 0 && typeof children[0] === 'string') {
      textContent = children[0];
      console.log('Text content (array[0]):', textContent);
    } else {
      // Tentar extrair texto do array mais complexo
      const childrenText = children.map(child => {
        if (typeof child === 'string') return child;
        if (typeof child === 'object' && child !== null) {
          // Tentar acessar propriedades de texto
          if ('props' in child && typeof child.props.children === 'string') {
            return child.props.children;
          }
        }
        return '';
      }).join('');
      
      if (childrenText) {
        textContent = childrenText;
        console.log('Text extracted from complex children:', textContent);
      } else {
        // Se não conseguir extrair texto, retorna o parágrafo normal
        console.log('Could not extract text from children array');
        return <p className="mb-6 leading-relaxed text-gray-800">{children}</p>;
      }
    }
  } else if (typeof children === 'object' && children !== null) {
    // Tentar extrair texto de objetos React
    console.log('Children is object:', children);
    if ('props' in children && typeof children.props.children === 'string') {
      textContent = children.props.children;
      console.log('Text content (object.props.children):', textContent);
    } else {
      // Retorna o parágrafo normal para outros casos
      console.log('Could not extract text from object');
      return <p className="mb-6 leading-relaxed text-gray-800">{children}</p>;
    }
  } else {
    // Retorna o parágrafo normal para outros casos
    console.log('Unknown children type');
    return <p className="mb-6 leading-relaxed text-gray-800">{children}</p>;
  }
  
  // Se chegou aqui, temos algum texto para verificar
  if (textContent.startsWith('### ')) {
    console.log('Converting to h3:', textContent);
    return <h3 className="text-2xl font-bold mb-4 mt-6 font-playfair">{textContent.substring(4)}</h3>;
  } else if (textContent.startsWith('#### ')) {
    console.log('Converting to h4:', textContent);
    return <h4 className="text-xl font-bold mb-3 mt-5 font-playfair">{textContent.substring(5)}</h4>;
  } else if (textContent.startsWith('## ')) {
    console.log('Converting to h2:', textContent);
    return <h2 className="text-3xl font-bold mb-5 mt-8 font-playfair">{textContent.substring(3)}</h2>;
  } else if (textContent.startsWith('# ')) {
    console.log('Converting to h1:', textContent);
    return <h1 className="text-4xl font-bold mb-6 mt-8 font-playfair">{textContent.substring(2)}</h1>;
  } else if (textContent.startsWith('##### ')) {
    console.log('Converting to h5:', textContent);
    return <h5 className="text-lg font-bold mb-2 mt-4 font-playfair">{textContent.substring(6)}</h5>;
  } else if (textContent.startsWith('###### ')) {
    console.log('Converting to h6:', textContent);
    return <h6 className="text-base font-bold mb-2 mt-3 font-playfair">{textContent.substring(7)}</h6>;
  }
  
  // Caso não seja nenhum título, retorna o parágrafo normal
  console.log('Not a heading, returning paragraph');
  return <p className="mb-6 leading-relaxed text-gray-800">{children}</p>;
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
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => 
        processMarkdownHeadings(node, children),
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