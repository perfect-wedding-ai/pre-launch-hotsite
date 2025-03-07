import type { Metadata } from 'next'
import './globals.css'

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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
} 