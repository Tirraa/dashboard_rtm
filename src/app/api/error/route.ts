/* v8 ignore start */
// Stryker disable all

export async function POST(request: Request) {
  const error = await request.json();
  console.warn(error);
}

// Stryker restore all
/* v8 ignore stop */
