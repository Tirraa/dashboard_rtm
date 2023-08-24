import { NextResponse } from 'next/server';

// * ... Work-around (1): used for useServerSidePathnameWorkaround
export function middleware(request: Request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}
