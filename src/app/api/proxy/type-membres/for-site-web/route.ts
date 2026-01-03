import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cpupme.com/api';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${API_BASE_URL}/type-membres/for-site-web`, {
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
    console.error('❌ [PROXY] Erreur lors de la récupération des types de membres:', error);
    return NextResponse.json(
      { error: 'Failed to fetch type-membres' },
      { status: 500 }
    );
  }
}

