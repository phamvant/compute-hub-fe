import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/register')

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/explore', req.url))
      }

      return null
    }

    if (!isAuth) {
      let next = req.nextUrl.pathname
      if (req.nextUrl.search) {
        next += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/login?next=${encodeURIComponent(next)}`, req.url)
      )
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      }
    }
  }
)

export const config = {
  matcher: [
    '/login',
    '/register',
    '/explore',
    '/projects/:path*',
    '/users/:username*'
  ]
}
