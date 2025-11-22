import { NextRequest, NextResponse } from 'next/server'

const BACKEND_API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:4000'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    console.log('code', code)

    if (!code) {
      console.error('WorkOS callback missing code parameter')
      return NextResponse.redirect(new URL('/unauthorize?error=missing_code', request.url))
    }

    const resp = await fetch(`${BACKEND_API_URL}/api/auth/exchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
      // running on the server — credentials here are not used by the browser
      credentials: 'include',
    })

    console.log('resp', resp)
    if (!resp.ok) {
      const bodyText = await resp.text().catch(() => '')
      console.error('Backend exchange failed', resp.status, bodyText)
      return NextResponse.redirect(new URL('/unauthorize?error=auth_failed', request.url))
    }

    // forward any Set-Cookie header from backend so the browser receives it
    const setCookie = resp.headers.get('set-cookie')
    const successRedirect = NextResponse.redirect(new URL('/', request.url))
    if (setCookie) {
      successRedirect.headers.set('set-cookie', setCookie)
    }

    return successRedirect
  } catch (err) {
    // The `redirect()` helper throws an internal NEXT_REDIRECT error which
    // previously was being caught here and treated as a failure. Using
    // `NextResponse.redirect` and returning it avoids that issue.
    console.error('Error handling WorkOS callback', err)
    return NextResponse.redirect(new URL('/unauthorize?error=auth_failed', request.url))
  }
}
