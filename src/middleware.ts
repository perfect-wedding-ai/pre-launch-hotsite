import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['pt', 'en', 'es']
const defaultLocale = 'pt'

function getLocaleFromHeader(request: NextRequest): string {
    // Pega o header Accept-Language
    const acceptLanguage = request.headers.get('accept-language')
    if (!acceptLanguage) return defaultLocale

    // Extrai o idioma principal (ex: 'pt-BR' -> 'pt')
    const browserLocales = acceptLanguage.split(',')
        .map(locale => locale.split(';')[0].trim())
        .map(locale => locale.split('-')[0])

    // Mapeia o idioma do navegador para um dos locales suportados
    if (browserLocales[0] === 'pt') return 'pt'
    if (browserLocales[0] === 'en') return 'en'
    if (browserLocales[0] === 'es') return 'es'

    return defaultLocale
}

function getLocaleFromPath(pathname: string): string | null {
    // Verifica se o caminho já começa com um locale válido
    for (const locale of locales) {
        if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
            return locale
        }
    }
    return null
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    
    // Ignora arquivos estáticos e API
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/assets') ||
        pathname.includes('.')
    ) {
        return NextResponse.next()
    }

    // Verifica se já tem um locale no path
    const pathLocale = getLocaleFromPath(pathname)
    if (pathLocale) {
        return NextResponse.next()
    }

    // Se não tiver locale no path, usa o do navegador
    const browserLocale = getLocaleFromHeader(request)
    
    // Redireciona para a versão com locale
    return NextResponse.redirect(
        new URL(`/${browserLocale}${pathname === '/' ? '' : pathname}`, request.url)
    )
}

export const config = {
    matcher: [
        // Ignora arquivos estáticos e API
        '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
    ],
} 