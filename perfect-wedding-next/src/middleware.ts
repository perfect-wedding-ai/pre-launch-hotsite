import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['pt-BR']
const defaultLocale = 'pt-BR'

function getLocale(request: NextRequest) {
    // Aceita apenas pt-BR por enquanto
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

    // Redireciona para a versão com locale se não estiver presente
    if (!pathname.startsWith(`/${defaultLocale}`)) {
        return NextResponse.redirect(
            new URL(`/${defaultLocale}${pathname === '/' ? '' : pathname}`, request.url)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        // Ignora arquivos estáticos e API
        '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
    ],
} 