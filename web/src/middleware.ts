import { NextRequest, NextResponse } from "next/server";

const signIn = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;

export function middleware (request: NextRequest) { 
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(signIn, { 
      headers: {
        "Set-Cookie": `redirectTo=${request.url}; path=/; httpOnly; max-age=${60}`,
      }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/memories/:path*'
}