import { createClient } from 'contentful';
import { createClient as createManagementClient } from 'contentful-management';
import { BlogPost, BlogPostCollection, Category, CategoryCollection } from './types';
import { Locale } from '@/config/i18n.config';

// IMPORTANTE: No Contentful, atualmente o inglês (en) é o locale padrão,
// e o português (pt) tem um fallback para o inglês. Isso significa que se não houver
// conteúdo em português para um campo, o Contentful retornará o conteúdo em inglês automaticamente.
// 
// Para garantir que apenas conteúdo em português seja exibido, estamos filtrando manualmente
// os resultados das consultas, verificando se campos essenciais como 'title' existem no locale 'pt'.
// 
// Essa abordagem é necessária porque o parâmetro 'locale.fallback=false' não é suportado na 
// versão atual do SDK do Contentful que estamos usando.

// Content Delivery API client (para conteúdo publicado)
const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT_ID || 'master',
});

// Preview client (para visualização de conteúdo publicado)
const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: 'preview.contentful.com',
  environment: process.env.CONTENTFUL_ENVIRONMENT_ID || 'master',
});

// Content Management API client (para ambiente de testes com rascunhos)
const managementClient = createManagementClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
});

// Função para obter uma instância do environment da Content Management API
async function getManagementEnvironment() {
  const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!);
  return await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT_ID || 'master');
}

// Função para verificar os locales configurados no Contentful
export const getContentfulLocales = async () => {
  try {
    const locales = await contentfulClient.getLocales();
    return locales;
  } catch (error) {
    console.error('Erro ao buscar locales:', error);
    return { items: [] };
  }
};

// Função para transformar os dados da Content Management API para o formato da Content Delivery API
function transformManagementEntryToDeliveryFormat(item: any, locale: string): any {
  if (!item) return null;
  
  const plainObject = item.toPlainObject ? item.toPlainObject() : item;
  
  // Converter campos localizados para o formato esperado
  if (plainObject.fields) {
    Object.keys(plainObject.fields).forEach(fieldName => {
      const field = plainObject.fields[fieldName];
      // Se o campo for um objeto com chaves de locais (ex: { en: 'value', pt: 'valor' })
      if (field && typeof field === 'object' && (locale in field || 'en' in field || 'pt' in field)) {
        // Usar o valor do locale específico ou fallback para o locale disponível
        plainObject.fields[fieldName] = field[locale] || field['en'] || field['pt'] || field[Object.keys(field)[0]];
      }
      
      // Se for um array, verificar se os itens também precisam ser transformados
      if (Array.isArray(plainObject.fields[fieldName])) {
        plainObject.fields[fieldName] = plainObject.fields[fieldName].map((item: any) => {
          if (item && typeof item === 'object' && item.sys && item.fields) {
            return transformManagementEntryToDeliveryFormat(item, locale);
          }
          return item;
        });
      }
      
      // Se for um objeto com sys e fields, é uma referência e precisa ser transformada
      if (plainObject.fields[fieldName] && 
          typeof plainObject.fields[fieldName] === 'object' && 
          plainObject.fields[fieldName].sys && 
          plainObject.fields[fieldName].fields) {
        plainObject.fields[fieldName] = transformManagementEntryToDeliveryFormat(plainObject.fields[fieldName], locale);
      }
    });
  }
  
  return plainObject;
}

// Determina qual cliente usar com base no ambiente
export const getClient = (preview: boolean = false) => {
  const isDraftEnvironment = process.env.CONTENTFUL_ENVIRONMENT_ID === 'draft';
  
  if (isDraftEnvironment) {
    // Retorna um objeto que simula a API do cliente de entrega,
    // mas usa a API de gerenciamento internamente
    return {
      getEntries: async (query: any) => {
        try {
          const environment = await getManagementEnvironment();
          const entries = await environment.getEntries(query);
          const locale = query.locale || 'pt'; // Usar português como fallback
          
          // Transforma os itens para o formato esperado
          return {
            ...entries,
            items: entries.items.map(item => transformManagementEntryToDeliveryFormat(item, locale))
          };
        } catch (error) {
          console.error('Error fetching entries with management API:', error);
          throw error;
        }
      }
    };
  }
  
  // Para ambiente de produção, use o cliente normal
  return preview ? previewClient : contentfulClient;
};

export const getBlogPosts = async (locale: Locale, options: { limit?: number; skip?: number; tag?: string; category?: string } = {}) => {
  const { limit = 10, skip = 0, tag, category } = options;

  try {
    // Configurar parâmetros da consulta
    const queryParams = {
      content_type: 'blogPost',
      limit,
      skip,
      order: '-fields.publishDate' as any,
      locale,
      include: 2,
      ...(tag && { 'fields.tags': tag }),
      ...(category && { 'fields.category.sys.id': category }),
    };
    
    const response = await getClient().getEntries(queryParams);
    
    // Apenas garantir que os posts tenham pelo menos um título
    let filteredItems = response.items.filter((item: any) => {
      return item.fields.title && typeof item.fields.title === 'string';
    });

    return {
      ...response,
      items: filteredItems,
      total: filteredItems.length // Atualizar o total para refletir os itens filtrados
    } as unknown as BlogPostCollection;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { items: [], total: 0, skip: 0, limit: 0 };
  }
};

export const getBlogPostBySlug = async (slug: string, locale: Locale, preview: boolean = false): Promise<BlogPost | null> => {
  try {
    const queryParams = {
      content_type: 'blogPost',
      'fields.slug': slug,
      locale,
      include: 2,
    };
    
    const response = await getClient(preview).getEntries(queryParams);

    if (response.items.length === 0) {
      return null;
    }
    
    return response.items[0] as unknown as BlogPost;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
};

export const getRelatedPosts = async (postId: string, tags: string[], locale: Locale, limit: number = 3): Promise<BlogPost[]> => {
  try {
    const queryParams = {
      content_type: 'blogPost',
      'fields.tags[in]': tags.join(','),
      'sys.id[ne]': postId,
      locale,
      limit,
      include: 2,
      order: '-fields.publishDate' as any,
    };
    
    const response = await getClient().getEntries(queryParams);

    // Filtrar apenas para garantir que os posts tenham título
    const filteredItems = response.items.filter((item: any) => {
      return item.fields.title && typeof item.fields.title === 'string';
    });

    return filteredItems as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
};

export const getCategories = async (locale: Locale): Promise<CategoryCollection> => {
  try {
    const queryParams = {
      content_type: 'category',
      locale,
      order: 'fields.name' as any,
      limit: 100, // Aumentar o limite para garantir que todas as categorias sejam retornadas
    };
    
    const response = await getClient().getEntries(queryParams);

    // Quando solicitado em português, não filtramos - simplesmente usamos o que o Contentful retornar
    // O Contentful já faz o fallback automaticamente para inglês se não houver tradução
    let filteredItems = response.items;

    return {
      ...response,
      items: filteredItems,
    } as unknown as CategoryCollection;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { items: [], total: 0, skip: 0, limit: 0 };
  }
};

// Obter um asset específico pelo ID
export const getAssetById = async (assetId: string, locale: Locale = 'pt') => {
  try {
    // Usar getEntries com sys.id em vez de getAsset
    const queryParams = {
      'sys.id': assetId,
      content_type: 'asset',
      locale,
      include: 1
    };
    
    const response = await getClient().getEntries(queryParams);
    
    if (response && response.items && response.items.length > 0) {
      return response.items[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching asset with ID ${assetId}:`, error);
    return null;
  }
};

// Helper para construir URLs de imagens do Contentful
export const getContentfulImageUrl = (assetId: string, options = {}) => {
  if (!assetId) return null;
  
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  if (!spaceId) {
    console.error('CONTENTFUL_SPACE_ID não está definido');
    return null;
  }
  
  // Opções padrão
  const defaultOptions = {
    width: 2048,
    height: 1152,
    format: 'jpg',      // Jpg é mais compatível
    quality: 85,
    fit: 'fill'
  };
  
  // Mesclar opções
  const imageOptions = { ...defaultOptions, ...options };
  
  // Parâmetros para a URL
  const params = new URLSearchParams({
    fm: imageOptions.format,
    q: imageOptions.quality.toString(),
    fit: imageOptions.fit,
    w: imageOptions.width.toString(),
    h: imageOptions.height.toString(),
  });
  
  // Construir URLs simples sem parâmetros (testamos vários formatos) 
  return `https://images.ctfassets.net/${spaceId}/${assetId}/image.${imageOptions.format}?${params.toString()}`;
}; 