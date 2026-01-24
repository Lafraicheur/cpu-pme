import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ALLOWED_METHODS = new Set([
  'wave_ci',
  'orange_money_ci',
  'mtn_money_ci',
  'moov_money_ci',
  'card',
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const amount = Number(body?.amount ?? 0);
    const currency = typeof body?.currency === 'string' ? body.currency : 'XOF';
    const method = typeof body?.method === 'string' ? body.method : '';
    const reference = typeof body?.reference === 'string' ? body.reference : '';
    const customer = body?.customer ?? {};

    if (!ALLOWED_METHODS.has(method)) {
      return NextResponse.json(
        { error: 'Méthode de paiement invalide.' },
        { status: 400 }
      );
    }

    if (!Number.isFinite(amount) || amount < 0) {
      return NextResponse.json(
        { error: 'Montant invalide.' },
        { status: 400 }
      );
    }

    const transactionId = `sbx_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 10)}`;

    return NextResponse.json({
      status: 'success',
      transactionId,
      amount,
      currency,
      method,
      reference,
      customer,
      sandbox: true,
      message: 'Paiement simulé avec succès (sandbox).',
    });
  } catch (error) {
    console.error('❌ [PAYMENT SANDBOX] error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la simulation du paiement.' },
      { status: 500 }
    );
  }
}

