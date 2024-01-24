import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextResponse, type NextRequest } from 'next/server'

const availableLocales = ['en', 'ja']

const detectLocale = (req: NextRequest): string | undefined => {
  const headers: Record<string, string> = {}
  req.headers.forEach((value, key) => (headers[key] = value))

  const browserLanguages = new Negotiator({ headers }).languages()

  const locale = match(browserLanguages, availableLocales, 'en')
  return locale
}

export const middleware = (req: NextRequest) => {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    /\.(.*)$/.test(req.nextUrl.pathname)
  ) {
    return
  }

  if (req.nextUrl.locale === 'default') {
    const locale = detectLocale(req)
    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    )
  }
}
