import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n, Locale } from './config/i18n.config'

const supportedLocales = i18n.locales
const defaultLocale = i18n.defaultLocale

// Mapeia variações de idiomas para os idiomas suportados
const localeMap: { [key: string]: Locale } = {
  'en': 'en',
  'en-us': 'en',
  'en-gb': 'en',
  'pt': 'pt',
  'pt-br': 'pt',
  'pt-pt': 'pt',
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
  let targetLocale: Locale = defaultLocale
  for (const locale of browserLocales) {
    // Tenta o código completo (ex: en-us)
    if (locale in localeMap) {
      targetLocale = localeMap[locale]
      break
    }
    
    // Tenta apenas o idioma principal (ex: en)
    const mainLang = locale.split('-')[0]
    if (mainLang in localeMap) {
      targetLocale = localeMap[mainLang as keyof typeof localeMap]
      break
    }
  }

  // Redireciona para o idioma encontrado ou para o padrão
  return NextResponse.redirect(new URL(`/${targetLocale}${request.nextUrl.pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
} 