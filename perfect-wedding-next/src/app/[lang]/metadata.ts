import { Metadata } from 'next'

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
    title: 'Perfect Wedding – Experimente Vestidos de Noiva Virtualmente',
    description: 'Experimente vestidos de noiva virtualmente com nossa tecnologia de IA. Descubra o vestido dos seus sonhos sem sair de casa, economize tempo e viva uma experiência inovadora.',
    keywords: 'vestido de noiva virtual, experiência com IA para noivas, teste de vestidos online, prova virtual de vestidos de noiva, vestido dos sonhos online, simulação de vestidos com inteligência artificial, ensaio virtual de vestidos, descubra seu vestido ideal, tecnologia para noivas, ateliê virtual de vestidos',
    ogTitle: 'Vestido de Noiva Virtual | Experimente com IA | Perfect Wedding',
    ogDescription: 'Experimente vestidos de noiva virtualmente com nossa tecnologia de IA. Descubra o vestido dos seus sonhos sem sair de casa!'
  },
  en: {
    title: 'Perfect Wedding – Try On Wedding Dresses Virtually',
    description: 'Try on wedding dresses virtually with our AI technology. Find your dream dress without leaving home, save time and experience an innovative way to find your dress.',
    keywords: 'virtual wedding dress, AI bridal experience, online dress fitting, virtual wedding dress try-on, dream dress online, AI dress simulation, virtual dress fitting, find your ideal dress, bridal technology, virtual bridal boutique',
    ogTitle: 'Virtual Wedding Dress | Try On with AI | Perfect Wedding',
    ogDescription: 'Try on wedding dresses virtually with our AI technology. Find your dream dress without leaving home!'
  },
  es: {
    title: 'Perfect Wedding – Prueba Vestidos de Novia Virtualmente',
    description: 'Prueba vestidos de novia virtualmente con nuestra tecnología de IA. Encuentra el vestido de tus sueños sin salir de casa, ahorra tiempo y vive una experiencia innovadora.',
    keywords: 'vestido de novia virtual, experiencia con IA para novias, prueba de vestidos online, prueba virtual de vestidos de novia, vestido de los sueños online, simulación de vestidos con inteligencia artificial, prueba virtual de vestidos, encuentra tu vestido ideal, tecnología para novias, boutique virtual de novias',
    ogTitle: 'Vestido de Novia Virtual | Prueba con IA | Perfect Wedding',
    ogDescription: '¡Prueba vestidos de novia virtualmente con nuestra tecnología de IA. Encuentra el vestido de tus sueños sin salir de casa!'
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