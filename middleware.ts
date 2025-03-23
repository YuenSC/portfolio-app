import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|monitoring).*)",
  ],
};

export function middleware(request: NextRequest) {
  return NextResponse.next();
}
