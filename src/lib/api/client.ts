/**
 * Client API pour les requêtes HTTP
 */

import { API_BASE_URL } from './config';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ data: T }> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      console.log('🌐 [DEBUG CLIENT] URL appelée:', url);
      console.log('🌐 [DEBUG CLIENT] Config:', { method: config.method, headers: config.headers });
      
      const response = await fetch(url, config);
      console.log('🌐 [DEBUG CLIENT] Status:', response.status, response.statusText);
      console.log('🌐 [DEBUG CLIENT] Headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        let errorData = {};
        try {
          const text = await response.text();
          errorData = text ? JSON.parse(text) : {};
        } catch (e) {
          // Si la réponse n'est pas du JSON, on garde un objet vide
          errorData = {};
        }
        console.error('❌ [DEBUG CLIENT] Erreur HTTP:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        const error: ApiError = {
          message: (errorData as any).message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          code: (errorData as any).code,
        };
        throw error;
      }

      const data = await response.json();
      console.log('✅ [DEBUG CLIENT] Données reçues:', data);
      console.log('✅ [DEBUG CLIENT] Type de données:', typeof data);
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

export const apiClient = new ApiClient(API_BASE_URL);

