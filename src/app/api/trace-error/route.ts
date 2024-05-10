/* v8 ignore start */
// Stryker disable all

import { NextResponse } from 'next/server';

// {ToDo} Also ping RTM API to log the error on the admins Discord server.
export async function POST(request: Request) {
  const error = await request.json();
  console.error(error);
  return NextResponse.json({ status: 200 });
}

// Stryker restore all
/* v8 ignore stop */
