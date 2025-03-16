import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n, Locale } from './config/i18n.config'

const supportedLocales = i18n.locales
const defaultLocale = i18n.defaultLocale
const LANGUAGE_COOKIE_KEY = 'preferred_language'

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
  console.log('Middleware executando para:', request.nextUrl.pathname);
  
  // Se já estiver em uma rota com idioma, não faz nada
  if (supportedLocales.some(locale => request.nextUrl.pathname.startsWith(`/${locale}`))) {
    console.log('Já está em uma rota com idioma, continuando...');
    return NextResponse.next();
  }

  // Verifica se existe um cookie de preferência de idioma
  const preferredLanguage = request.cookies.get(LANGUAGE_COOKIE_KEY)?.value as Locale | undefined;
  console.log('Cookie de idioma encontrado:', preferredLanguage);

  // Obtém o caminho real ou usa a raiz caso esteja vazio
  const path = request.nextUrl.pathname === '' || request.nextUrl.pathname === '/' ? '' : request.nextUrl.pathname;
  console.log('Caminho para redirecionar:', path);

  // Se encontrar o cookie e o idioma for suportado, usa essa preferência
  if (preferredLanguage && supportedLocales.includes(preferredLanguage)) {
    const redirectUrl = new URL(`/${preferredLanguage}${path}`, request.url);
    console.log('Redirecionando para preferência do cookie:', redirectUrl.href);
    return NextResponse.redirect(redirectUrl);
  }

  // Se não tiver cookie, usa o idioma do navegador como antes
  const acceptLanguage = request.headers.get('accept-language') || '';
  console.log('Accept-Language do navegador:', acceptLanguage);
  
  // Processa cada idioma do accept-language
  const browserLocales = acceptLanguage
    .split(',')
    .map(lang => {
      // Pega apenas o código do idioma, ignorando o parâmetro de qualidade
      const [languageCode] = lang.split(';');
      return languageCode.trim().toLowerCase();
    });
  
  console.log('Idiomas do navegador processados:', browserLocales);

  // Tenta encontrar uma correspondência para cada variação de idioma
  let targetLocale: Locale = defaultLocale;
  for (const locale of browserLocales) {
    // Tenta o código completo (ex: en-us)
    if (locale in localeMap) {
      targetLocale = localeMap[locale];
      console.log('Correspondência encontrada para código completo:', locale, '->', targetLocale);
      break;
    }
    
    // Tenta apenas o idioma principal (ex: en)
    const mainLang = getBaseLocale(locale);
    if (mainLang in localeMap) {
      targetLocale = localeMap[mainLang as keyof typeof localeMap];
      console.log('Correspondência encontrada para idioma principal:', mainLang, '->', targetLocale);
      break;
    }
  }
  
  // Redireciona para o idioma encontrado ou para o padrão
  const redirectUrl = new URL(`/${targetLocale}${path}`, request.url);
  console.log('Redirecionando para:', redirectUrl.href);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|_vercel).*)'],
} 