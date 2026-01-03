/**
 * Client API proxy pour contourner les restrictions CORS
 * Utilise les routes API Next.js qui s'exécutent côté serveur
 */

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

class ProxyApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ data: T }> {
    // Utiliser la route proxy Next.js au lieu de l'API externe directement
    const url = `/api/proxy${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      console.log('🌐 [PROXY CLIENT] URL appelée:', url);
      console.log('🌐 [PROXY CLIENT] Config:', { method: config.method, headers: config.headers });
      
      const response = await fetch(url, config);
      console.log('🌐 [PROXY CLIENT] Status:', response.status, response.statusText);
      
      if (!response.ok) {
        let errorData = {};
        try {
          const text = await response.text();
          errorData = text ? JSON.parse(text) : {};
        } catch (e) {
          errorData = {};
        }
        console.error('❌ [PROXY CLIENT] Erreur HTTP:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        const error: ApiError = {
          message: (errorData as any).error || (errorData as any).message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          code: (errorData as any).code,
        };
        throw error;
      }

      const data = await response.json();
      console.log('✅ [PROXY CLIENT] Données reçues:', data);
      return { data };
    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error) {
        throw error as ApiError;
      }
      throw {
        message: error instanceof Error ? error.message : 'Une erreur est survenue',
      } as ApiError;
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<{ data: T }> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }
}

export const proxyApiClient = new ProxyApiClient();

