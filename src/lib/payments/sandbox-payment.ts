export type PaymentMethod =
  | 'wave_ci'
  | 'orange_money_ci'
  | 'mtn_money_ci'
  | 'moov_money_ci'
  | 'card';

export interface SandboxPaymentRequest {
  amount: number;
  currency: 'XOF' | string;
  method: PaymentMethod;
  reference: string;
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  metadata?: Record<string, unknown>;
}

export interface SandboxPaymentResponse {
  status: 'success' | 'failed';
  transactionId?: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  reference: string;
  message?: string;
  sandbox?: boolean;
}

export async function simulateSandboxPayment(
  payload: SandboxPaymentRequest
): Promise<SandboxPaymentResponse> {
  const response = await fetch('/api/payments/sandbox', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage =
      typeof data?.error === 'string'
        ? data.error
        : "Échec de la simulation du paiement.";
    throw new Error(errorMessage);
  }

  return data as SandboxPaymentResponse;
}

