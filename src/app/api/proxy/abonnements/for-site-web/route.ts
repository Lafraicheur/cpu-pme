const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cpupme.com/api';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/abonnements/for-site-web`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch abonnements');
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching abonnements:', error);
    return Response.json({ error: 'Failed to fetch abonnements' }, { status: 500 });
  }
}
