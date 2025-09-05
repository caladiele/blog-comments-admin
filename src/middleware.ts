import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Protéger les routes /admin et /api/admin
  if (request.nextUrl.pathname.startsWith('/admin') || 
      request.nextUrl.pathname.startsWith('/api/admin')) {
    
    console.log('🔒 Middleware déclenché pour:', request.nextUrl.pathname)
    
    const basicAuth = request.headers.get('authorization')

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1]
      const [user, password] = atob(authValue).split(':')

      const adminUser = process.env.ADMIN_USER || 'admin'
      const adminPass = process.env.ADMIN_PASS || 'password'

      console.log('👤 Tentative de connexion:', user)

      if (user === adminUser && password === adminPass) {
        console.log('✅ Authentification réussie')
        return NextResponse.next()
      }
    }

    console.log('❌ Authentification requise')
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Area"'
      }
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}