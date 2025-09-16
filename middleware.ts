import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"

export async function middleware(request: NextRequest) {
  const publicRoutes = ["/", "/sign-in", "/sign-up", "/forgot-password", "/reset-password", "/email-verification", "on-boarding"];
  if(publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/community/:path*",
    "/discover/:path*",
    "/events/:path*",
    "/gigs/:path*",
    "/home/:path*",
    "/notifications/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
    "/saved/:path*",
    "/settings/:path*",
  ]
};
