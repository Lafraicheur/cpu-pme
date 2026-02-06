import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QueryProvider } from "@/providers/query-provider";
import FontLoader from "@/components/FontLoader";

export const metadata: Metadata = {
  title: "CPU-PME | Hub d'Accompagnement des PME de Côte d'Ivoire",
  description: "Plateforme institutionnelle de la Confédération des Petites et Moyennes Entreprises de Côte d'Ivoire - Accompagnement, services et programmes pour les PME ivoiriennes",
  keywords: ["CPU-PME", "PME", "Côte d'Ivoire", "entreprises", "accompagnement", "financement"],
  other: {
    'font-preconnect-googleapis': 'https://fonts.googleapis.com',
    'font-preconnect-gstatic': 'https://fonts.gstatic.com',
  },
  metadataBase: new URL('https://cpu-pme.ci'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      </head>
      <body className="antialiased" style={{
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        '--font-montserrat': 'Montserrat, sans-serif',
        '--font-inter': 'Inter, system-ui, -apple-system, sans-serif',
      } as React.CSSProperties}>
        <FontLoader />
        <QueryProvider>
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        </QueryProvider>
      </body>
    </html>
  );
}
