import { NextRequest, NextResponse } from 'next/server';

// Forcer le mode dynamique pour cette route API
export const dynamic = 'force-dynamic';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cpupme.com/api';

export async function GET(request: NextRequest) {
  try {
    // Récupérer les paramètres de requête (type)
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    // Construire l'URL avec les paramètres
    const url = new URL(`${API_BASE_URL}/partenaire/for-site-web`);
    if (type) url.searchParams.append('type', type);

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
    console.error('❌ [PROXY] Erreur lors de la récupération des partenaires:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partenaires' },
      { status: 500 }
    );
  }
}
