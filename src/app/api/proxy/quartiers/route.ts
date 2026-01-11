const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cpupme.com/api';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${API_BASE_URL}/quartiers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return Response.json(
        { error: 'Failed to create quartier', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error creating quartier:', error);
    return Response.json({ error: 'Failed to create quartier' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/quartiers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch quartiers');
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching quartiers:', error);
    return Response.json({ error: 'Failed to fetch quartiers' }, { status: 500 });
  }
}
