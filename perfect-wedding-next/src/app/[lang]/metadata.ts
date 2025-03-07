import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://perfectwedding.ai'),
  title: 'Perfect Wedding - Experimente Vestidos de Noiva Virtualmente',
  description: 'Descubra o vestido dos seus sonhos sem sair de casa com nossa tecnologia de prova virtual de vestidos de noiva.',
  keywords: 'vestido de noiva, prova virtual, inteligência artificial, casamento, noiva, vestido dos sonhos',
  openGraph: {
    title: 'Perfect Wedding - Experimente Vestidos de Noiva Virtualmente',
    description: 'Descubra o vestido dos seus sonhos sem sair de casa com nossa tecnologia de prova virtual de vestidos de noiva.',
    url: 'https://perfectwedding.ai',
    siteName: 'Perfect Wedding',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
  },
} 