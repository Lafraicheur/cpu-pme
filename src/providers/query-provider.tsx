"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Temps avant qu'une requête soit considérée comme "stale" (périmée)
            staleTime: 60 * 1000, // 1 minute par défaut
            // Temps de cache pour les requêtes
            gcTime: 5 * 60 * 1000, // 5 minutes (anciennement cacheTime)
            // Réessayer automatiquement en cas d'échec
            retry: 1,
            // Réflechir automatiquement quand la fenêtre reprend le focus
            refetchOnWindowFocus: false,
            // Réflechir automatiquement lors de la reconnexion
            refetchOnReconnect: true,
          },
          mutations: {
            // Réessayer automatiquement en cas d'échec
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

