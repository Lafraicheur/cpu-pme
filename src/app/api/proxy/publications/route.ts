import { NextRequest, NextResponse } from 'next/server';

// Forcer le mode dynamique pour cette route API
export const dynamic = 'force-dynamic';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cpupme.com/api';

export async function GET(request: NextRequest) {
  try {
    // Récupérer les paramètres de requête (category, type, status)
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    // Construire l'URL avec les paramètres
    const url = new URL(`${API_BASE_URL}/publications/for-site-web`);
    if (category) url.searchParams.append('category', category);
    if (type) url.searchParams.append('type', type);
    if (status) url.searchParams.append('status', status);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': '*/*',
      },
      cache: 'no-store', // Désactiver le cache pour avoir les données à jour
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API returned ${response.status}: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ [PROXY] Erreur lors de la récupération des publications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch publications' },
      { status: 500 }
    );
  }
}
