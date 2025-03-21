import { Metadata } from 'next'
import { getBaseLocale } from './translations'
import { getBaseUrl, siteConfig } from '@/lib/utils/siteConfig'

type MetadataTranslations = {
  [key in 'pt' | 'en' | 'es']: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
  }
}

export const metadataTranslations: MetadataTranslations = {
  pt: {
    title: 'Perfect Wedding AI - Planejamento de Casamento Inteligente',
    description: 'Um assistente de IA para tornar o planejamento de casamento mais fácil e personalizado. Automatize tarefas, receba recomendações e crie o casamento dos seus sonhos.',
    keywords: 'casamento IA, planejamento de casamento, IA para casamentos, assistente de casamento, organização de casamento, perfectwedding ai, noiva',
    ogTitle: 'Perfect Wedding AI - Revolucionando o Planejamento de Casamento com IA',
    ogDescription: 'Um assistente inteligente que ajuda casais a planejar o casamento perfeito com recomendações personalizadas, gerenciamento de tarefas e recursos exclusivos.'
  },
  en: {
    title: 'Perfect Wedding AI - Smart Wedding Planning',
    description: 'An AI assistant to make wedding planning easier and personalized. Automate tasks, get recommendations, and create the wedding of your dreams.',
    keywords: 'wedding AI, wedding planning, AI for weddings, wedding assistant, wedding organization, perfectwedding ai, bride',
    ogTitle: 'Perfect Wedding AI - Revolutionizing Wedding Planning with AI',
    ogDescription: 'An intelligent assistant that helps couples plan the perfect wedding with personalized recommendations, task management, and exclusive resources.'
  },
  es: {
    title: 'Perfect Wedding AI - Planificación Inteligente de Bodas',
    description: 'Un asistente de IA para hacer la planificación de bodas más fácil y personalizada. Automatice tareas, obtenga recomendaciones y cree la boda de sus sueños.',
    keywords: 'IA de bodas, planificación de bodas, IA para bodas, asistente de bodas, organización de bodas, perfectwedding ai, novia',
    ogTitle: 'Perfect Wedding AI - Revolucionando la Planificación de Bodas con IA',
    ogDescription: 'Un asistente inteligente que ayuda a las parejas a planificar la boda perfecta con recomendaciones personalizadas, gestión de tareas y recursos exclusivos.'
  }
}

export const metadata: Metadata = {
  metadataBase: new URL('https://perfectwedding.ai'),
  title: metadataTranslations.pt.title,
  description: metadataTranslations.pt.description,
  keywords: metadataTranslations.pt.keywords,
  openGraph: {
    title: metadataTranslations.pt.ogTitle,
    description: metadataTranslations.pt.ogDescription,
    type: 'website',
    url: 'https://perfectwedding.ai/',
    images: [
      {
        url: '/assets/images/og-image.webp',
      },
    ],
  },
  robots: 'index, follow',
  icons: {
    icon: [
      {
        url: '/assets/icons/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon',
      },
      {
        url: '/assets/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/assets/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: {
      url: '/assets/icons/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    shortcut: '/assets/icons/favicon.ico',
  },
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/pt',
      'en-US': '/en',
      'es-ES': '/es',
    },
  },
}

type ValidLang = 'pt' | 'en' | 'es'

export function getMetadataTranslations(locale: string | undefined) {
  if (!locale) {
    // Se o locale não for fornecido, usar o idioma padrão
    const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en'
    return metadataTranslations[DEFAULT_LOCALE as keyof typeof metadataTranslations] || metadataTranslations.en
  }
  
  // Extrair o idioma base (ex: 'pt-BR' -> 'pt')
  const baseLocale = getBaseLocale(locale) as keyof typeof metadataTranslations
  
  // Retornar as traduções para o idioma ou usar o idioma padrão como fallback
  const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en'
  return metadataTranslations[baseLocale] || metadataTranslations[DEFAULT_LOCALE as keyof typeof metadataTranslations] || metadataTranslations.en
} 