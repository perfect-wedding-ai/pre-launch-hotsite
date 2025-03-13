import { createClient } from 'contentful';
import { createClient as createManagementClient } from 'contentful-management';
import { BlogPost, BlogPostCollection, Category, CategoryCollection } from './types';
import { Locale } from '@/config/i18n.config';

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
          const locale = query.locale || 'en';
          
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
    const response = await getClient().getEntries({
      content_type: 'blogPost',
      limit,
      skip,
      order: '-fields.publishDate' as any,
      locale,
      ...(tag && { 'fields.tags': tag }),
      ...(category && { 'fields.category.sys.id': category }),
    });

    return response as unknown as BlogPostCollection;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { items: [], total: 0, skip: 0, limit: 0 };
  }
};

export const getBlogPostBySlug = async (slug: string, locale: Locale, preview: boolean = false): Promise<BlogPost | null> => {
  try {
    const response = await getClient(preview).getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      locale,
      include: 2,
    });

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
    const response = await getClient().getEntries({
      content_type: 'blogPost',
      'fields.tags[in]': tags.join(','),
      'sys.id[ne]': postId,
      locale,
      limit,
      order: '-fields.publishDate' as any,
    });

    return response.items as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
};

export const getCategories = async (locale: Locale): Promise<CategoryCollection> => {
  try {
    console.log("locale", locale);
    const response = await getClient().getEntries({
      content_type: 'category',
      locale,
      order: 'fields.name' as any,
    });

    return response as unknown as CategoryCollection;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { items: [], total: 0, skip: 0, limit: 0 };
  }
}; 