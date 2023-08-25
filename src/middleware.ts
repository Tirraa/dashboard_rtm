import { NextResponse } from 'next/server';

// * ... Work-around (1): used for getServerSidePathnameWorkaround
export function middleware(request: Request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}
