"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import NewsDetailClient from "./NewsDetailClient";
import { useActuality, useActualities, usePublication, usePublications } from "@/hooks/use-api";

// Catégories des actualités (correspondant aux catégories de l'API)
const categoriesActualites = [
  { id: "institutionnel", name: "CPU-PME institutionnel" },
  { id: "filiere", name: "Filières" },
  { id: "regions", name: "Régions" },
  { id: "opprotunites", name: "Opportunités PME" },
  { id: "reglementations", name: "Réglementation & alertes" },
  { id: "evenements", name: "Événements (annonces)" },
];

// Catégories des publications
const categoriesPublications = [
  { id: "Strategy & Plans", name: "Stratégie & plans" },
  { id: "Observatory & Reports", name: "Observatoire & rapports" },
  { id: "SME Guides", name: "Guides PME" },
  { id: "Advocacy", name: "Plaidoyer" },
  { id: "Partner Studies", name: "Études partenaires" },
  { id: "Event Summaries", name: "Synthèses d'événements" },
];

export default function NewsDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  // Essayer de charger à la fois comme actualité ET comme publication
  const { data: actualityData, isLoading: loadingActuality, error: errorActuality } = useActuality(id);
  const { data: publicationData, isLoading: loadingPublication, error: errorPublication } = usePublication(id);

  // Récupérer toutes les actualités et publications pour les suggestions
  const { data: allActualities } = useActualities();
  const { data: allPublications } = usePublications();

  // État de chargement - attendre que les deux requêtes soient terminées
  if (loadingActuality || loadingPublication) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Déterminer si c'est une actualité ou une publication
  const isActuality = actualityData && !errorActuality;
  const isPublication = publicationData && !errorPublication;

  // Si aucun des deux n'existe, 404
  if (!isActuality && !isPublication) {
    return notFound();
  }

  // CAS 1: C'est une actualité
  if (isActuality) {
    const newsItem = {
      id: actualityData.id,
      titre: actualityData.title,
      description: actualityData.content || actualityData.title,
      categorie: actualityData.category.toLowerCase(),
      created_at: new Date(actualityData.publicationDate || actualityData.createdAt).getTime(),
      auteur: "CPU-PME.CI",
      couverture: {
        url: actualityData.imageUrl,
      },
      other_images: actualityData.other_images_url || [],
    };

    // Actualités similaires
    const relatedNews = (allActualities || [])
      .filter((news) => news.id !== id)
      .slice(0, 3)
      .map((news) => ({
        id: news.id,
        titre: news.title,
        description: news.content || news.title,
        categorie: news.category.toLowerCase(),
        created_at: new Date(news.publicationDate || news.createdAt).getTime(),
        auteur: "CPU-PME.CI",
        couverture: {
          url: news.imageUrl,
        },
        image: news.imageUrl,
      }));

    return (
      <NewsDetailClient
        newsItem={newsItem}
        newsImage={actualityData.imageUrl}
        relatedNews={relatedNews}
        categories={categoriesActualites}
        isPublication={false}
      />
    );
  }

  // CAS 2: C'est une publication
  if (isPublication) {
    const publicationItem = {
      id: publicationData.id,
      titre: publicationData.title,
      description: publicationData.description,
      categorie: publicationData.category, // Garder la catégorie telle quelle (ex: "Strategy & Plans")
      created_at: new Date(publicationData.publicationDate || publicationData.createdAt).getTime(),
      auteur: "CPU-PME.CI",
      couverture: {
        url: getCategoryImage(publicationData.category),
      },
      type: publicationData.type,
      status: publicationData.status,
      fileUrl: publicationData.fileUrl,
      otherFiles: publicationData.otherFilesUrl || [],
    };

    // Publications similaires
    const relatedPublications = (allPublications || [])
      .filter((pub) => pub.id !== id)
      .slice(0, 3)
      .map((pub) => ({
        id: pub.id,
        titre: pub.title,
        description: pub.description,
        categorie: pub.category, // Garder la catégorie telle quelle
        created_at: new Date(pub.publicationDate || pub.createdAt).getTime(),
        auteur: "CPU-PME.CI",
        couverture: {
          url: publicationData.fileUrl,
        },
        image: pub.fileUrl,
        type: pub.type,
        fileUrl: pub.fileUrl,
      }));

    return (
      <NewsDetailClient
        newsItem={publicationItem}
        newsImage={publicationData.fileUrl}
        relatedNews={relatedPublications}
        categories={categoriesPublications}
        isPublication={true}
      />
    );
  }

  return notFound();
}

// Fonction pour obtenir une image par défaut selon la catégorie (pour les publications)
function getCategoryImage(category: string) {
  const categoryImages: { [key: string]: string } = {
    "Strategy & Plans": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    "Observatory & Reports": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    "SME Guides": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop",
    "Advocacy": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    "Partner Studies": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    "Event Summaries": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
  };
  return categoryImages[category] || "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop";
}
