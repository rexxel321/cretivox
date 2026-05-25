export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch('https://dummyjson.com/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return Response.json(data, { status: response.status });
  } catch (error) {
    return Response.json(
      { message: 'Failed to fetch', error: String(error) },
      { status: 500 }
    );
  }
}
