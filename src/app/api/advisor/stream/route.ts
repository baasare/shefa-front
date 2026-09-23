const API_BASE = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE) {
  throw new Error('NEXT_PUBLIC_API_URL is not set');
}

function getBearerToken(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.toLowerCase().startsWith('bearer ')) {
    return authHeader.slice(7).trim();
  }

  const forwardedToken = request.headers.get('x-access-token');
  if (forwardedToken) {
    return forwardedToken.trim();
  }

  return null;
}

export async function POST(request: Request) {
  const token = getBearerToken(request);
  const payload = await request.json().catch(() => ({}));
  const backendUrl = `${API_BASE}/v1/agents/stream/`;

  const response = await fetch(backendUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!response.ok || !response.body) {
    const errorText = await response.text().catch(() => '');
    return new Response(
      JSON.stringify({
        error: 'Advisor stream request failed',
        status: response.status,
        details: errorText || null,
      }),
      {
        status: response.status || 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  return new Response(response.body, {
    status: response.status,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
