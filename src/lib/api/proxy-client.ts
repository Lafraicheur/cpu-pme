/**
 * Client API proxy pour contourner les restrictions CORS
 * Utilise les routes API Next.js qui s'exécutent côté serveur
 */

import { normalizeObject, hasEncodingIssues } from '../text-normalization';

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
    
    const method = (options.method || 'GET').toUpperCase();
    const baseHeaders: Record<string, string> = {
      ...(options.headers as Record<string, string> || {}),
    };
    // Éviter d'imposer Content-Type sur GET sans corps (limite certains serveurs / évite preflight inutiles)
    if (method !== 'GET' && method !== 'HEAD') {
      baseHeaders['Content-Type'] = baseHeaders['Content-Type'] || 'application/json';
    }

    const config: RequestInit = {
      ...options,
      method,
      headers: baseHeaders,
      cache: 'no-store',
      credentials: 'same-origin',
    };

    try {
      
      const response = await fetch(url, config);
      
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

      const rawData = await response.json();
      
      // Normaliser automatiquement les données pour corriger les problèmes d'encodage
      const normalizedData = normalizeObject(rawData);
      
      // Log si des problèmes d'encodage ont été détectés (en développement)
      if (process.env.NODE_ENV === 'development') {
        const dataStr = JSON.stringify(rawData);
        if (hasEncodingIssues(dataStr)) {
          console.warn('⚠️ [PROXY CLIENT] Problèmes d\'encodage détectés et corrigés pour:', endpoint);
        }
      }
      
      return { data: normalizedData };
    } catch (error) {
      console.error('❌ [PROXY CLIENT] Fetch failed:', { url, options: { method: config.method } , error });
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

  async post<T>(endpoint: string, body?: unknown, options?: RequestInit): Promise<{ data: T }> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T>(endpoint: string, body?: unknown, options?: RequestInit): Promise<{ data: T }> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<{ data: T }> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const proxyApiClient = new ProxyApiClient();

