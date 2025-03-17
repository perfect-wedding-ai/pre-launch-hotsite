import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n, Locale } from './config/i18n.config'

const supportedLocales = i18n.locales
const defaultLocale = i18n.defaultLocale
const LANGUAGE_COOKIE_KEY = 'preferred_language'
const COOKIE_CONSENT_KEY = 'cookie-consent'

// Função para extrair o idioma base (ex: 'pt-BR' -> 'pt')
function getBaseLocale(locale: string): string {
  if (!locale) {
    return defaultLocale;
  }
  
  return locale.split('-')[0];
}

// Mapeia variações de idiomas para os idiomas suportados
const localeMap: { [key: string]: Locale } = {
  'en': 'en',
  'en-us': 'en',
  'en-gb': 'en',
  'pt': 'pt',
  'pt-br': 'pt',
  'pt-pt': 'pt',
  'es': 'es',
  'es-es': 'es',
  'es-mx': 'es',
  'es-ar': 'es',
  'es-co': 'es',
}

export function middleware(request: NextRequest) {
  // Se já estiver em uma rota com idioma, não faz nada
  if (supportedLocales.some(locale => request.nextUrl.pathname.startsWith(`/${locale}`))) {
    return NextResponse.next()
  }

  // Verifica se o usuário aceitou cookies
  const cookieConsent = request.cookies.get(COOKIE_CONSENT_KEY)?.value
  const canUseCookies = cookieConsent === 'accepted'

  // Verifica se existe um cookie de preferência de idioma e se pode usá-lo
  let preferredLanguage = undefined;
  if (canUseCookies) {
    preferredLanguage = request.cookies.get(LANGUAGE_COOKIE_KEY)?.value as Locale | undefined
  }

  // Se encontrar o cookie, o usuário aceitou cookies e o idioma for suportado, usa essa preferência
  if (preferredLanguage && canUseCookies && supportedLocales.includes(preferredLanguage)) {
    const redirectUrl = new URL(`/${preferredLanguage}${request.nextUrl.pathname}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Se não tiver cookie ou não puder usá-lo, usa o idioma do navegador
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
    const mainLang = getBaseLocale(locale)
    if (mainLang in localeMap) {
      targetLocale = localeMap[mainLang as keyof typeof localeMap]
      break
    }
  }

  // Adiciona uma barra no final se o pathname estiver vazio
  const pathname = request.nextUrl.pathname || '/';
  
  // Redireciona para o idioma encontrado ou para o padrão
  const redirectUrl = new URL(`/${targetLocale}${pathname}`, request.url);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|_vercel).*)'],
} 