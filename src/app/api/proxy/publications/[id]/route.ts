import { NextRequest, NextResponse } from 'next/server';

// Forcer le mode dynamique pour cette route API
export const dynamic = 'force-dynamic';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cpupme.com/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID de la publication requis' },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/publications/${id}`, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
      },
      cache: 'no-store', // Désactiver le cache pour avoir les données à jour
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Publication introuvable' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: `API returned ${response.status}: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`❌ [PROXY] Erreur lors de la récupération de la publication:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch publication' },
      { status: 500 }
    );
  }
}
