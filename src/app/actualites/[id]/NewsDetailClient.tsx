"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Mail,
  Clock,
  ArrowRight,
  ImageOff,
  FileText,
  Download,
} from "lucide-react";
import { toast } from "sonner";

interface NewsItem {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  created_at: number;
  auteur: string;
  couverture: {
    url: string | null;
  };
  image?: string | null;
  type?: string;
  status?: string;
  fileUrl?: string | null;
  other_images?: string[];
  otherFiles?: string[];
}

interface NewsDetailClientProps {
  newsItem: NewsItem;
  newsImage: string | null;
  relatedNews: NewsItem[];
  categories: Array<{ id: string; name: string }>;
  isPublication?: boolean;
}

export default function NewsDetailClient({
  newsItem,
  newsImage,
  relatedNews,
  categories,
  isPublication = false,
}: NewsDetailClientProps) {
  const router = useRouter();

  const formatDate = (timestamp: number | string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  // Détecter si le fichier est une image
  const isImageFile = newsItem.fileUrl && /\.(jpg|jpeg|png|gif|webp)$/i.test(newsItem.fileUrl);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Barre de navigation sticky */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-30 backdrop-blur-sm bg-white/95 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <Button
              onClick={() => router.push(isPublication ? "/actualites?tab=publications" : "/actualites")}
              variant="ghost"
              size="sm"
              className="hover:bg-slate-100 rounded-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {isPublication ? "Retour aux publications" : "Retour aux actualités"}
            </Button>
          </div>
        </div>
      </section>

      {/* Hero Section - Différent pour actualités et publications */}
      {isPublication ? (
        isImageFile ? (
          // Hero pour publications avec image
          <section className="relative h-[400px] md:h-[550px] bg-slate-900">
            {newsItem.fileUrl ? (
              <>
                <img
                  src={newsItem.fileUrl}
                  alt={newsItem.titre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <ImageOff className="h-32 w-32 text-primary/40" />
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <div className="container mx-auto max-w-4xl">
                <Badge className="mb-4 px-4 py-1.5 text-sm font-semibold bg-white text-slate-900 shadow-lg">
                  {getCategoryName(newsItem.categorie)}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 leading-tight">
                  {newsItem.titre}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {formatDate(newsItem.created_at)}
                    </span>
                  </div>
                  {newsItem.auteur && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Par {newsItem.auteur}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : (
          // Hero pour publications (avec icône PDF/document)
          <section className="relative bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Icône PDF */}
                <div className="relative flex-shrink-0">
                  <div className="w-48 h-64 bg-white rounded-lg shadow-2xl flex items-center justify-center">
                    <FileText className="h-32 w-32 text-red-600" strokeWidth={1.5} />
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded shadow-lg">
                    PDF
                  </div>
                </div>

              {/* Informations */}
              <div className="flex-1">
                <Badge className="mb-4 px-4 py-1.5 text-sm font-semibold bg-primary text-white shadow-lg">
                  {getCategoryName(newsItem.categorie)}
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 leading-tight text-slate-900">
                  {newsItem.titre}
                </h1>
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(newsItem.created_at)}</span>
                  </div>
                  {newsItem.type && (
                    <Badge variant="outline" className="text-xs">
                      {newsItem.type.toUpperCase()}
                    </Badge>
                  )}
                  {newsItem.status && (
                    <Badge variant="outline" className="text-xs">
                      {newsItem.status}
                    </Badge>
                  )}
                </div>
                {newsItem.fileUrl && !isImageFile && (
                  <Button
                    size="lg"
                    className="w-full md:w-auto"
                    onClick={() => {
                      if (newsItem.fileUrl) {
                        window.open(newsItem.fileUrl, "_blank");
                      }
                    }}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Télécharger le document
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
        )
      ) : (
        // Hero pour actualités (avec image)
        <section className="relative h-[400px] md:h-[550px] bg-slate-900">
          {newsImage ? (
            <img
              src={newsImage}
              alt={newsItem.titre}
              className="w-full h-full object-cover opacity-90"
            />
          ) : (
            <div className="w-full h-full bg-slate-300 flex flex-col items-center justify-center text-slate-600">
              <ImageOff className="h-32 w-32 mb-4 opacity-50" />
              <p className="text-2xl font-medium">Image non disponible</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Contenu du hero */}
          <div className="absolute bottom-0 left-0 right-0 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
              {/* <Badge className="mb-4 px-4 py-1.5 text-sm font-semibold bg-primary text-white shadow-lg">
                {getCategoryName(newsItem.categorie)}
              </Badge> */}
              <h1 className="text-xl md:text-2xl lg:text-6xl font-heading font-bold mb-4 leading-tight text-white">
                {newsItem.titre}
              </h1>
            </div>
          </div>
        </section>
      )}

      {/* Contenu principal */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sidebar gauche - Métadonnées */}
              <aside className="lg:col-span-3 order-2 lg:order-1">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Auteur */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-xl">
                        {newsItem.auteur.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">
                          Auteur
                        </p>
                        <p className="font-semibold text-slate-900 text-sm">
                          {newsItem.auteur}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>{formatDate(newsItem.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Contenu de l'article */}
              <div className="lg:col-span-9 order-1 lg:order-2">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200">
                  {/* Contenu de l'article avec typographie améliorée */}
                  <div className="prose prose-slate prose-lg max-w-none">
                    <p className="text-lg leading-relaxed text-slate-700 whitespace-pre-line first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left first-letter:leading-none first-letter:mt-1">
                      {newsItem.description}
                    </p>
                  </div>

                  {/* Galerie d'images supplémentaires pour les actualités */}
                  {!isPublication && newsItem.other_images && newsItem.other_images.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-slate-200">
                      <h3 className="text-2xl font-heading font-bold mb-6 text-slate-900">
                        Galerie d'images
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {newsItem.other_images.map((imageUrl, index) => (
                          <div
                            key={index}
                            className="relative h-64 rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow"
                            onClick={() => window.open(imageUrl, "_blank")}
                          >
                            <img
                              src={imageUrl}
                              alt={`Image ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                                <ImageOff className="h-6 w-6 text-slate-900" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section fichiers associés pour les publications */}
                  {isPublication && newsItem.otherFiles && newsItem.otherFiles.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-slate-200">
                      <h3 className="text-2xl font-heading font-bold mb-6 text-slate-900">
                        Fichiers associés
                      </h3>
                      <div className="space-y-3">
                        {newsItem.otherFiles.map((fileUrl, index) => {
                          const fileName = fileUrl.split('/').pop() || `Fichier ${index + 1}`;
                          const extension = fileName.split('.').pop()?.toUpperCase() || 'FILE';

                          return (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group"
                              onClick={() => window.open(fileUrl, "_blank")}
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-slate-900 truncate group-hover:text-primary transition-colors">
                                    {fileName}
                                  </p>
                                  <p className="text-sm text-slate-500">
                                    {extension}
                                  </p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="flex-shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(fileUrl, "_blank");
                                }}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Télécharger
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Actualités/Publications similaires */}
      {relatedNews.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Titre de section */}
              <div className="flex items-center gap-3 mb-12">
                <div className="flex-shrink-0 w-1 h-10 bg-primary rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
                  {isPublication ? "Publications similaires" : "Articles similaires"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNews.map((news) => (
                  <Card
                    key={news.id}
                    className="overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group border-0 bg-white"
                    onClick={() => {
                      router.push(`/actualites/${news.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="relative h-56 overflow-hidden">
                      {news.image ? (
                        <img
                          src={news.image}
                          alt={news.titre}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex flex-col items-center justify-center text-slate-500">
                          <ImageOff className="h-16 w-16 mb-2" />
                          <p className="text-sm font-medium">
                            Image non disponible
                          </p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Badge catégorie */}
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white/95 text-slate-900 shadow-md backdrop-blur-sm border-0 font-medium text-xs">
                          {getCategoryName(news.categorie)}
                        </Badge>
                      </div>

                      {/* Overlay hover */}
                      <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="sm" className="rounded-full shadow-lg">
                          Lire l'article
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(news.created_at)}</span>
                      </div>
                      <h3 className="text-lg font-heading font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                        {news.titre}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {news.description.split("\n")[0]}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* CTA pour voir plus */}
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.push(isPublication ? "/actualites?tab=publications" : "/actualites")}
                  className="rounded-full border-2 hover:bg-primary hover:text-white hover:border-primary"
                >
                  {isPublication ? "Voir toutes les publications" : "Voir toutes les actualités"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
