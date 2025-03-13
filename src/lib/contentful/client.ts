import { createClient } from 'contentful';
import { BlogPost, BlogPostCollection, Category, CategoryCollection } from './types';
import { Locale } from '@/config/i18n.config';

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: 'preview.contentful.com',
});

export const getClient = (preview: boolean = false) => {
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
      locale: locale === 'en' ? 'en-US' : locale,
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
      locale: locale === 'en' ? 'en-US' : locale,
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
      locale: locale === 'en' ? 'en-US' : locale,
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
    const response = await getClient().getEntries({
      content_type: 'category',
      locale: locale === 'en' ? 'en-US' : locale,
      order: 'fields.name' as any,
    });

    return response as unknown as CategoryCollection;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { items: [], total: 0, skip: 0, limit: 0 };
  }
}; 