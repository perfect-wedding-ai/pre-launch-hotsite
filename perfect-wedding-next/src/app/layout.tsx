import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Perfect Wedding – Experimente Vestidos de Noiva Virtualmente',
  description: 'Experimente vestidos de noiva virtualmente com nossa tecnologia de IA. Descubra o vestido dos seus sonhos sem sair de casa, economize tempo e viva uma experiência inovadora.',
  keywords: 'vestido de noiva virtual, experiência com IA para noivas, teste de vestidos online, prova virtual de vestidos de noiva, vestido dos sonhos online, simulação de vestidos com inteligência artificial, ensaio virtual de vestidos, descubra seu vestido ideal, tecnologia para noivas, ateliê virtual de vestidos',
  openGraph: {
    title: 'Vestido de Noiva Virtual | Experimente com IA | Perfect Wedding',
    description: 'Experimente vestidos de noiva virtualmente com nossa tecnologia de IA. Descubra o vestido dos seus sonhos sem sair de casa!',
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
    icon: '/assets/icons/favicon.ico',
    shortcut: '/assets/icons/favicon.ico',
  },
  metadataBase: new URL('https://perfectwedding.ai'),
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TGY4JXMX0F"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TGY4JXMX0F');
            `
          }}
        />

        {/* Preload da imagem principal para melhorar LCP */}
        <link rel="preload" as="image" href="/assets/images/hero-bride-desktop.webp" />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Schema.org markup para Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Perfect Wedding",
              "url": "https://perfectwedding.ai/",
              "description": "Experimente vestidos de noiva virtualmente com nossa tecnologia de IA. Descubra o vestido dos seus sonhos sem sair de casa.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://perfectwedding.ai/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Como funciona a prova virtual de vestidos de noiva?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nossa tecnologia de inteligência artificial analisa sua foto e cria imagens realistas de como você ficaria usando diferentes vestidos de noiva. O processo é simples: você envia uma foto, escolhe os vestidos que deseja experimentar em nosso ateliê virtual e nossa IA gera as imagens em poucos segundos."
                  }
                },
                {
                  "@type": "Question",
                  "name": "As imagens são realistas?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sim! Nossa tecnologia de ponta cria imagens extremamente realistas, considerando seu tipo de corpo, tom de pele e características físicas para mostrar como o vestido ficaria em você de verdade."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quanto custa usar o Perfect Wedding?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Atualmente estamos em fase de testes e oferecendo acesso gratuito para um número limitado de noivas. Cadastre-se agora para garantir sua vaga!"
                  }
                },
                {
                  "@type": "Question",
                  "name": "Posso experimentar vestidos de qualquer marca?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nossa biblioteca inclui dezenas de modelos exclusivos de diversos estilos. Estamos constantemente expandindo nossa coleção para incluir mais opções e marcas."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Como faço para comprar o vestido depois?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "O Perfect Wedding é uma ferramenta para ajudar você a descobrir o estilo perfeito antes de visitar ateliês. Após encontrar os modelos que mais gostou, fornecemos informações sobre onde encontrá-los ou modelos similares em lojas e ateliês parceiros."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
} 