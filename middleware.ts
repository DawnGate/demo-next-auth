import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isHaveToken = request.cookies.get("token")?.value;

  console.log(isHaveToken);

  if (isHaveToken && !request.nextUrl.pathname.startsWith("/app")) {
    return Response.redirect(new URL("/app", request.url));
  }

  if (!isHaveToken && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
