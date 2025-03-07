import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let locales = ['pt', 'en']
let defaultLocale = 'pt'

function getLocale(request: NextRequest) {
    const headers = new Headers(request.headers)
    const acceptLanguage = headers.get('accept-language')
    if (acceptLanguage) {
        headers.set('accept-language', acceptLanguage.replaceAll('_', '-'))
    }
    
    const negotiator = new Negotiator({ headers: headers })
    return match(negotiator.languages(), locales, defaultLocale)
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)
        return NextResponse.redirect(
            new URL(`/${locale}${pathname}`, request.url)
        )
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
    ],
} 