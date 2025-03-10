import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const supportedLocales = ['en', 'pt', 'es']
const defaultLocale = 'en'

// Mapeia variações de idiomas para os idiomas suportados
const localeMap: { [key: string]: string } = {
  'en': 'en',
  'en-us': 'en',
  'en-gb': 'en',
  'pt': 'pt',
  'pt-br': 'pt',
  'pt-pt': 'pt',
  'es': 'es',
  'es-es': 'es',
  'es-mx': 'es',
  'es-ar': 'es'
}

export function middleware(request: NextRequest) {
  // Se já estiver em uma rota com idioma, não faz nada
  if (supportedLocales.some(locale => request.nextUrl.pathname.startsWith(`/${locale}`))) {
    return NextResponse.next()
  }

  // Se estiver na rota raiz ou em qualquer outra rota sem idioma
  const acceptLanguage = request.headers.get('accept-language') || ''
  
  // Processa cada idioma do accept-language
  const browserLocales = acceptLanguage
    .split(',')
    .map(lang => {
      // Pega apenas o código do idioma, ignorando o parâmetro de qualidade
      const [languageCode] = lang.split(';')
      return languageCode.trim().toLowerCase()
    })

  // Tenta encontrar uma correspondência para cada variação de idioma
  let targetLocale = defaultLocale
  for (const locale of browserLocales) {
    // Tenta o código completo (ex: en-us)
    if (localeMap[locale]) {
      targetLocale = localeMap[locale]
      break
    }
    
    // Tenta apenas o idioma principal (ex: en)
    const mainLang = locale.split('-')[0]
    if (localeMap[mainLang]) {
      targetLocale = localeMap[mainLang]
      break
    }
  }

  // Redireciona para o idioma encontrado ou para o padrão
  return NextResponse.redirect(new URL(`/${targetLocale}${request.nextUrl.pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
} 