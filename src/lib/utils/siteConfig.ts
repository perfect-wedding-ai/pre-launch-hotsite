/**
 * Configurações centralizadas do site para URLs e informações básicas
 */

/**
 * Retorna a URL base do site a partir da variável de ambiente ou um valor padrão
 */
export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://perfectwedding.ai';
};

/**
 * Retorna a URL da API a partir da variável de ambiente ou um valor padrão
 */
export const getApiUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL || 'https://perfectwedding.ai/api';
};

/**
 * Configuração do site
 */
export const siteConfig = {
  name: 'Perfect Wedding',
  description: 'Uma plataforma completa para planejamento de casamentos',
  logoUrl: '/images/logo.png',
  ogImage: '/images/og-image.jpg',
  contactEmail: 'contact@perfectwedding.ai',
  privacyEmail: 'private@perfectwedding.ai',
}; 