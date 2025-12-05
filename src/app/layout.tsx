import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Police pour les titres - Montserrat
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Police pour le texte courant - Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CPU-PME | Hub d'Accompagnement des PME de Côte d'Ivoire",
  description: "Plateforme institutionnelle de la Confédération des Petites et Moyennes Entreprises de Côte d'Ivoire - Accompagnement, services et programmes pour les PME ivoiriennes",
  keywords: ["CPU-PME", "PME", "Côte d'Ivoire", "entreprises", "accompagnement", "financement"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased`}
      >
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
