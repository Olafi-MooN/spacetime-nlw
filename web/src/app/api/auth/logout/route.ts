import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const redirectUrl = new URL("/", req.url);

  const cookieExpiresInSeconds = 0;

  return NextResponse.redirect(redirectUrl, {
    headers: {
      "Set-Cookie": `token=; path=/; max-age=${cookieExpiresInSeconds}`,
    },
  });
}
