import { Document } from '@contentful/rich-text-types';

export interface BlogPost {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    body: Document;
    image?: {
      fields: {
        file: {
          url: string;
          details: {
            image: {
              width: number;
              height: number;
            };
          };
        };
        title: string;
        description?: string;
      };
    };
    tags: string[];
    metadescription?: string;
    category?: {
      fields: {
        name: string;
        slug: string;
      };
      sys: {
        id: string;
      };
    };
    publishDate: string;
    lastUpdateDate: string;
    recommendedPosts?: {
      sys: {
        id: string;
      };
    }[];
    slug: string;
  };
}

export interface BlogPostCollection {
  items: BlogPost[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    slug: string;
    description?: string;
  };
}

export interface CategoryCollection {
  items: Category[];
  total: number;
  skip: number;
  limit: number;
} 