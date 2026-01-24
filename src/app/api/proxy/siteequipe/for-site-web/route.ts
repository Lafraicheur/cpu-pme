import { NextRequest, NextResponse } from 'next/server';

// Forcer le mode dynamique pour cette route API
export const dynamic = 'force-dynamic';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cpupme.com/api';

export async function GET(request: NextRequest) {
  try {
    // Construire l'URL
    const url = new URL(`${API_BASE_URL}/siteequipe/for-site-web`);

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
    console.error('❌ [PROXY] Erreur lors de la récupération de l\'équipe:', error);
    return NextResponse.json(
      { error: 'Failed to fetch équipe' },
      { status: 500 }
    );
  }
}
