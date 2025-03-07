import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Perfect Wedding – Experimente Vestidos de Noiva Virtualmente',
  description: 'Experimente vestidos de noiva virtualmente com nossa tecnologia de IA. Descubra o vestido dos seus sonhos sem sair de casa, economize tempo e viva uma experiência inovadora.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 