import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['pt', 'en']
const defaultLocale = 'pt'

function getLocale(request: NextRequest): string {
    const pathname = request.nextUrl.pathname
    
    // Check if the pathname starts with a locale
    for (const locale of locales) {
        if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
            return locale
        }
    }
    
    return defaultLocale
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

    // Check if the pathname already starts with a locale
    for (const locale of locales) {
        if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
            return NextResponse.next()
        }
    }

    // Redireciona para a versão com locale se não estiver presente
    return NextResponse.redirect(
        new URL(`/${defaultLocale}${pathname === '/' ? '' : pathname}`, request.url)
    )
}

export const config = {
    matcher: [
        // Ignora arquivos estáticos e API
        '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
    ],
} 