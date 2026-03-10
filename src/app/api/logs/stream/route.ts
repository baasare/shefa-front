const API_BASE = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE) {
    throw new Error('NEXT_PUBLIC_API_URL is not set');
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get('agentId');
    const level = searchParams.get('level');
    const token = searchParams.get('token'); // Auth token passed via query param

    // Build backend SSE URL
    const params = new URLSearchParams();
    if (agentId) params.append('agent_id', agentId);
    if (level) params.append('level', level);

    const backendUrl = `${API_BASE}/v1/agents/logs/stream/?${params.toString()}`;

    // Get auth token from query param or cookie
    const authHeader = token ? `Bearer ${token}` : request.headers.get('cookie')?.match(/authToken=([^;]+)/)?.[1] ? `Bearer ${request.headers.get('cookie')?.match(/authToken=([^;]+)/)?.[1]}` : null;

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            try {
                const response = await fetch(backendUrl, {
                    headers: {
                        'Accept': 'text/event-stream',
                        'Cache-Control': 'no-cache',
                        ...(authHeader && { 'Authorization': authHeader }),
                    },
                });

                if (!response.ok) {
                    throw new Error(`Backend returned ${response.status}`);
                }

                if (!response.body) {
                    throw new Error('No response body');
                }

                const reader = response.body.getReader();

                // Read and forward SSE stream directly
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    // Forward the raw SSE data directly to client
                    controller.enqueue(value);
                }

                controller.close();
            } catch (error) {
                console.error('SSE stream error:', error);
                const errorMessage = `event: error\ndata: ${JSON.stringify({ error: String(error) })}\n\n`;
                controller.enqueue(encoder.encode(errorMessage));
                controller.close();
            }
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'X-Accel-Buffering': 'no',
        },
    });
}
