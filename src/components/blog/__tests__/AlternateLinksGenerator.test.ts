import { generateAlternateLinks, generateCanonicalUrl, AlternateLink, getHrefLangCode } from '../AlternateLinksGenerator';
import { Locale } from '@/config/i18n.config';

describe('AlternateLinksGenerator', () => {
  const baseUrl = 'https://perfectwedding.ai';
  
  describe('getHrefLangCode', () => {
    it('deve converter o código do locale para o código hrefLang correto', () => {
      expect(getHrefLangCode('pt')).toBe('pt-BR');
      expect(getHrefLangCode('en')).toBe('en-US');
      expect(getHrefLangCode('es')).toBe('es-ES');
      expect(getHrefLangCode('fr')).toBe('fr'); // locale não mapeado
    });
  });
  
  describe('generateCanonicalUrl', () => {
    it('deve gerar a URL canônica correta baseada no locale canônico e slug', () => {
      const canonicalLocale = 'pt';
      const canonicalSlug = 'vestido-de-noiva';
      
      const result = generateCanonicalUrl({
        baseUrl,
        canonicalLocale,
        canonicalSlug
      });
      
      expect(result).toBe('https://perfectwedding.ai/pt/blog/vestido-de-noiva');
    });
  });
  
  describe('generateAlternateLinks', () => {
    it('deve gerar os links alternados para todos os locales disponíveis', () => {
      const blogPost = {
        sys: { id: '123', createdAt: '', updatedAt: '' },
        fields: {
          slug: {
            'pt': 'vestido-de-noiva',
            'en': 'wedding-dress'
          },
          canonicalSlug: 'vestido-de-noiva',
          canonicalLocale: 'pt',
          title: 'Título do Post',
          body: {} as any,
          tags: ['vestido', 'noiva'],
          publishDate: '2023-01-01',
          lastUpdateDate: '2023-01-02'
        }
      };
      
      const result = generateAlternateLinks({
        baseUrl,
        blogPost: blogPost as any,
        availableLocales: ['pt', 'en', 'es'] as Locale[]
      });
      
      // Verificar se foram gerados links para PT e EN (ES não tem slug)
      expect(result).toHaveLength(3); // 2 alternates + 1 x-default
      
      // Verificar URL para PT
      const ptLink = result.find((link: AlternateLink) => link.hrefLang === 'pt-BR');
      expect(ptLink).toBeDefined();
      expect(ptLink?.href).toBe('https://perfectwedding.ai/pt/blog/vestido-de-noiva');
      
      // Verificar URL para EN
      const enLink = result.find((link: AlternateLink) => link.hrefLang === 'en-US');
      expect(enLink).toBeDefined();
      expect(enLink?.href).toBe('https://perfectwedding.ai/en/blog/wedding-dress');
      
      // Verificar URL x-default (deve apontar para a URL canônica)
      const xDefaultLink = result.find((link: AlternateLink) => link.hrefLang === 'x-default');
      expect(xDefaultLink).toBeDefined();
      expect(xDefaultLink?.href).toBe('https://perfectwedding.ai/pt/blog/vestido-de-noiva');
    });
    
    it('deve lidar com formato complexo de slug da API do Contentful', () => {
      const blogPost = {
        sys: { id: '123', createdAt: '', updatedAt: '' },
        fields: {
          // Formato que pode vir da API do Contentful
          slug: {
            fields: {
              'pt': 'vestido-de-noiva',
              'en': 'wedding-dress'
            }
          },
          canonicalSlug: 'vestido-de-noiva',
          canonicalLocale: 'pt',
          title: 'Título do Post',
          body: {} as any,
          tags: ['vestido', 'noiva'],
          publishDate: '2023-01-01',
          lastUpdateDate: '2023-01-02'
        }
      };
      
      const result = generateAlternateLinks({
        baseUrl,
        blogPost: blogPost as any,
        availableLocales: ['pt', 'en', 'es'] as Locale[]
      });
      
      // Verificar se foram gerados links para PT e EN
      expect(result.length).toBeGreaterThanOrEqual(2);
      
      // Verificar URL para PT
      const ptLink = result.find((link: AlternateLink) => link.hrefLang === 'pt-BR');
      expect(ptLink).toBeDefined();
      expect(ptLink?.href).toBe('https://perfectwedding.ai/pt/blog/vestido-de-noiva');
      
      // Verificar URL para EN
      const enLink = result.find((link: AlternateLink) => link.hrefLang === 'en-US');
      expect(enLink).toBeDefined();
      expect(enLink?.href).toBe('https://perfectwedding.ai/en/blog/wedding-dress');
    });
    
    it('deve gerar somente links para locales com slug definido', () => {
      const blogPost = {
        sys: { id: '123', createdAt: '', updatedAt: '' },
        fields: {
          slug: {
            'pt': 'vestido-de-noiva'
            // EN não tem slug definido
          },
          canonicalSlug: 'vestido-de-noiva',
          canonicalLocale: 'pt',
          title: 'Título do Post',
          body: {} as any,
          tags: ['vestido', 'noiva'],
          publishDate: '2023-01-01',
          lastUpdateDate: '2023-01-02'
        }
      };
      
      const result = generateAlternateLinks({
        baseUrl,
        blogPost: blogPost as any,
        availableLocales: ['pt', 'en', 'es'] as Locale[]
      });
      
      // Verificar se foi gerado apenas um link para PT e o x-default
      expect(result).toHaveLength(2);
      
      // Verificar URL para PT
      const ptLink = result.find((link: AlternateLink) => link.hrefLang === 'pt-BR');
      expect(ptLink).toBeDefined();
      expect(ptLink?.href).toBe('https://perfectwedding.ai/pt/blog/vestido-de-noiva');
      
      // Não deve haver link para EN
      const enLink = result.find((link: AlternateLink) => link.hrefLang === 'en-US');
      expect(enLink).toBeUndefined();
      
      // Verificar URL x-default
      const xDefaultLink = result.find((link: AlternateLink) => link.hrefLang === 'x-default');
      expect(xDefaultLink).toBeDefined();
      expect(xDefaultLink?.href).toBe('https://perfectwedding.ai/pt/blog/vestido-de-noiva');
    });
    
    it('deve lidar com slug como string simples (não localizado)', () => {
      const blogPost = {
        sys: { id: '123', createdAt: '', updatedAt: '' },
        fields: {
          slug: 'vestido-de-noiva', // slug como string simples
          canonicalSlug: 'vestido-de-noiva',
          canonicalLocale: 'pt',
          title: 'Título do Post',
          body: {} as any,
          tags: ['vestido', 'noiva'],
          publishDate: '2023-01-01',
          lastUpdateDate: '2023-01-02'
        }
      };
      
      const result = generateAlternateLinks({
        baseUrl,
        blogPost: blogPost as any,
        availableLocales: ['pt', 'en', 'es'] as Locale[]
      });
      
      // Verificar se foi gerado apenas o link para PT e o x-default
      expect(result).toHaveLength(2);
      
      // Verificar URL para PT
      const ptLink = result.find((link: AlternateLink) => link.hrefLang === 'pt-BR');
      expect(ptLink).toBeDefined();
      expect(ptLink?.href).toBe('https://perfectwedding.ai/pt/blog/vestido-de-noiva');
      
      // Verificar URL x-default
      const xDefaultLink = result.find((link: AlternateLink) => link.hrefLang === 'x-default');
      expect(xDefaultLink).toBeDefined();
      expect(xDefaultLink?.href).toBe('https://perfectwedding.ai/pt/blog/vestido-de-noiva');
    });
  });
}); 