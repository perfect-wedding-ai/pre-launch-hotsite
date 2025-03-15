import { Montserrat, Playfair_Display } from 'next/font/google'
import { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { translations, getTranslations } from './translations'
import '../globals.css'
import { metadataTranslations, getMetadataTranslations } from './metadata'
import { Locale, i18n } from '@/config/i18n.config'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'],
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
})

type ValidLang = 'pt' | 'en' | 'es';

export async function generateMetadata({ params }: { params: { lang: ValidLang } }): Promise<Metadata> {
  const lang = (params?.lang || 'pt') as ValidLang;
  const metadata = getMetadataTranslations(lang);
  const t = getTranslations(lang);
  
  const title = metadata.title;
  const description = metadata.description;
  
  return {
    metadataBase: new URL('https://perfectwedding.ai'),
    title,
    description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.ogTitle || title,
      description: metadata.ogDescription || description,
      type: 'website',
      url: 'https://perfectwedding.ai',
      images: [
        {
          url: 'https://perfectwedding.ai/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Perfect Wedding | AI Virtual Dress Try-On',
        },
      ],
    },
    robots: 'index, follow',
    icons: {
      icon: '/assets/icons/favicon.ico',
      shortcut: '/assets/icons/favicon.ico',
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'pt-BR': '/pt',
        'en-US': '/en',
        'es-ES': '/es',
      },
    },
    other: {
      'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
      schemaWebsite: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Perfect Wedding",
        "url": `https://perfectwedding.ai/${lang}`,
        "description": description,
        "inLanguage": lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-US' : 'es-ES',
        "potentialAction": {
          "@type": "SearchAction",
          "target": `https://perfectwedding.ai/${lang}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }),
      schemaFAQ: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-US' : 'es-ES',
        "mainEntity": t.faq.questions.map((q: { question: string; answer: string }) => ({
          "@type": "Question",
          "name": q.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": q.answer
          }
        }))
      })
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.ogTitle || title,
      description: metadata.ogDescription || description,
      images: ['https://perfectwedding.ai/images/og-image.jpg'],
    },
  }
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: ValidLang }
}) {
  const { lang } = params;
  
  return (
    <html lang={lang} className={`${montserrat.variable} ${playfair.variable}`}>
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />
        <link
          rel="preload"
          as="image"
          href="/assets/images/hero-bride-desktop.webp"
          type="image/webp"
        />
      </head>
      <body className={`${montserrat.className} antialiased`}>
        {children}

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}