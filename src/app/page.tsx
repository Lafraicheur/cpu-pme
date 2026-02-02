"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Award,
  Banknote,
  ChevronRight,
  FileSearch,
  GraduationCap,
  Handshake,
  Store,
  UserPlus,
  Target,
  Check,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { bannersService, Banner } from "@/lib/api/services/banners.service";
import { partenairesService, Partenaire } from "@/lib/api/services/partenaires.service";
import { actualitiesService, Actuality } from "@/lib/api/services/actualities.service";

// Composant de décompte animé
function CountUp({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoadingBanners, setIsLoadingBanners] = useState(true);
  const [partenaires, setPartenaires] = useState<Partenaire[]>([]);
  const [isLoadingPartenaires, setIsLoadingPartenaires] = useState(true);
  const [actualities, setActualities] = useState<Actuality[]>([]);
  const [isLoadingActualities, setIsLoadingActualities] = useState(true);

  // Charger les banners au montage du composant
  useEffect(() => {
    const loadBanners = async () => {
      try {
        setIsLoadingBanners(true);
        const data = await bannersService.getBanners({
          position: "homepage",
          type: "custom",
          activeOnly: true,
        });
        setBanners(data);
      } catch (error) {
        console.error("Erreur lors du chargement des banners:", error);
      } finally {
        setIsLoadingBanners(false);
      }
    };

    loadBanners();
  }, []);

  // Charger les partenaires stratégiques au montage du composant
  useEffect(() => {
    const loadPartenaires = async () => {
      try {
        setIsLoadingPartenaires(true);
        const data = await partenairesService.getPartenairesForSiteWeb({
          type: "strategique",
        });
        setPartenaires(data);
      } catch (error) {
        console.error("Erreur lors du chargement des partenaires:", error);
      } finally {
        setIsLoadingPartenaires(false);
      }
    };

    loadPartenaires();
  }, []);

  // Charger les 3 dernières actualités au montage du composant
  useEffect(() => {
    const loadActualities = async () => {
      try {
        setIsLoadingActualities(true);
        const data = await actualitiesService.getActualities();
        // Trier par date du plus récent au plus ancien
        const sortedData = [...data].sort((a, b) => {
          const dateA = new Date(a.publicationDate || a.createdAt).getTime();
          const dateB = new Date(b.publicationDate || b.createdAt).getTime();
          return dateB - dateA;
        });
        // Limiter aux 3 dernières actualités
        setActualities(sortedData.slice(0, 3));
      } catch (error) {
        console.error("Erreur lors du chargement des actualités:", error);
      } finally {
        setIsLoadingActualities(false);
      }
    };

    loadActualities();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center overflow-hidden min-h-[80vh] h-[400px] md:h-[500px] lg:h-[550px]"
      >
        {/* BACKGROUND IMAGE / CAROUSEL */}
      <div className="absolute inset-0 w-full h-full">
        {isLoadingBanners ? (
          // Image par défaut pendant le chargement
          <>
            <img
              src="/logo.png"
              alt="Confédération Patronale Unique des PME de Côte d'Ivoire"
              className="w-full h-full object-cover min-h-full"
              style={{ minHeight: '100%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
          </>
        ) : (
          // Carousel incluant le banner par défaut ET les banners dynamiques
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="w-full h-full"
          >
            <CarouselContent className="h-full min-h-[80vh]">
              {/* Banner par défaut (toujours inclus) */}
              <CarouselItem className="h-full min-h-[80vh]">
                <div className="relative h-full w-full min-h-[80vh]">
                  <img
                    src="/logo.png"
                    alt="Confédération Patronale Unique des PME de Côte d'Ivoire"
                    className="w-full h-full object-cover min-h-full"
                    style={{ minHeight: '100%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
                </div>
              </CarouselItem>
              {/* Banners dynamiques */}
              {banners.map((banner) => (
                <CarouselItem key={banner.id} className="h-full min-h-[80vh]">
                  <div
                    className="relative h-full w-full min-h-[80vh]"
                    style={{ minHeight: '80vh', height: '100%' }}
                  >
                    <img
                      src={banner.image_url || "/logo.png"}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                      style={{ minHeight: '100%', height: '100%', width: '100%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Afficher les boutons de navigation seulement s'il y a plus d'1 slide */}
            {(banners.length + 1) > 1 && (
              <>
                <CarouselPrevious className="left-2 sm:left-4 bg-[#F17C21] border-amber-50 text-white z-20 top-1/2 -translate-y-1/2" />
                <CarouselNext className="right-2 sm:right-4 bg-[#F17C21] border-amber-50 text-white z-20 top-1/2 -translate-y-1/2" />
              </>
            )}
          </Carousel>
        )}
      </div>

        {/* CONTENU */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full px-4 text-center text-white bg-transparent">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in drop-shadow-md">
            Confédération Patronale Unique des PME de Côte d'Ivoire
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-fade-in drop-shadow">
            Votre partenaire pour le développement et la croissance des
            entreprises ivoiriennes
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <a
              href="#services"
              className="bg-white text-black hover:bg-white/90 px-6 py-3 rounded-lg font-semibold cursor-pointer"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
            >
              Découvrir nos services
            </a>
            <Link
              href="/membres?tab=adhesion"
              className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold cursor-pointer"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
            >
              Devenir membre
            </Link>
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-neutral-dark)] mb-4">
              Les PME en Côte d'Ivoire
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Les PME constituent le moteur économique du pays, représentant
              plus de 90% du tissu économique national.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="shadow-sm transition-shadow border-0 bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[var(--color-primary)] mb-2">
                    <CountUp end={90} suffix="%" />
                  </p>
                  <p className="text-[var(--color-neutral-dark)]">
                    du tissu économique
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm transition-shadow border-0 bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[var(--color-success)] mb-2">
                    <CountUp end={80} suffix="%" />
                  </p>
                  <p className="text-[var(--color-neutral-dark)]">
                    des emplois
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm transition-shadow border-0 bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[var(--color-primary)] mb-2">
                    <CountUp end={30} suffix="%" />
                  </p>
                  <p className="text-[var(--color-neutral-dark)]">
                    du PIB national
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm transition-shadow border-0 bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[var(--color-success)] mb-2">
                    +<CountUp end={1000} />
                  </p>
                  <p className="text-[var(--color-neutral-dark)]">
                    membres CPU-PME
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-neutral-dark)] mb-4">
              Nos Services
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              CPU-PME.CI offre une gamme de services pour soutenir les PME
              ivoiriennes dans leur développement et leur croissance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-sm transition-shadow border-gray-200">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="p-3 rounded-full mb-4"
                    style={{ backgroundColor: "rgba(240, 130, 35, 0.1)" }}
                  >
                    <Award className="h-8 w-8 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Incubateur champion 225
                  </h3>
                  <p className="text-[var(--color-text-secondary)] mb-4">
                    Accompagnement personnalisé pour les startups et PME à fort
                    potentiel de croissance.
                  </p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[var(--color-primary)] hover:underline font-medium"
                  >
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm transition-shadow border-gray-200">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="p-3 rounded-full mb-4"
                    style={{ backgroundColor: "rgba(25, 157, 78, 0.1)" }}
                  >
                    <FileSearch className="h-8 w-8 text-[var(--color-success)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Appels d'offres & Opportunités
                  </h3>
                  <p className="text-[var(--color-text-secondary)] mb-4">
                    Accédez à des appels d'offres publics et privés exclusifs et
                    des opportunités commerciales pour développer votre
                    activité.
                  </p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[var(--color-success)] hover:underline font-medium"
                  >
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm transition-shadow border-gray-200">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="p-3 rounded-full mb-4"
                    style={{ backgroundColor: "rgba(240, 130, 35, 0.1)" }}
                  >
                    <GraduationCap className="h-8 w-8 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Formation</h3>
                  <p className="text-[var(--color-text-secondary)] mb-4">
                    Développez vos compétences grâce à nos programmes de
                    formation adaptés aux besoins des PME.
                  </p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[var(--color-primary)] hover:underline font-medium"
                  >
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm transition-shadow border-gray-200">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="p-3 rounded-full mb-4"
                    style={{ backgroundColor: "rgba(25, 157, 78, 0.1)" }}
                  >
                    <Store className="h-8 w-8 text-[var(--color-success)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Marketplace de produits locaux
                  </h3>
                  <p className="text-[var(--color-text-secondary)] mb-4">
                    Vendez et achetez des produits locaux sur notre plateforme
                    de commerce dédiée aux entreprises ivoiriennes.
                  </p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[var(--color-success)] hover:underline font-medium"
                  >
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm transition-shadow border-gray-200">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="p-3 rounded-full mb-4"
                    style={{ backgroundColor: "rgba(240, 130, 35, 0.1)" }}
                  >
                    <Banknote className="h-8 w-8 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Financement</h3>
                  <p className="text-[var(--color-text-secondary)] mb-4">
                    Accédez à des solutions de financement adaptées pour
                    développer votre entreprise et réaliser vos projets.
                  </p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[var(--color-primary)] hover:underline font-medium"
                  >
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm transition-shadow border-gray-200">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="p-3 rounded-full mb-4"
                    style={{ backgroundColor: "rgba(25, 157, 78, 0.1)" }}
                  >
                    <UserPlus className="h-8 w-8 text-[var(--color-success)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Réseautage</h3>
                  <p className="text-[var(--color-text-secondary)] mb-4">
                    Rejoignez un réseau de plus de 1000 entrepreneurs et
                    établissez des partenariats stratégiques.
                  </p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[var(--color-success)] hover:underline font-medium"
                  >
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Adhésion */}
      <section
        className="py-16"
        style={{ backgroundColor: "var(--color-neutral-dark)" }}
      >
        <div className="container mx-auto px-4 text-white">
          <div className="gap-8 items-center">
            <div>
              <h2 className="text-3xl text-center font-bold mb-4">
                Rejoignez CPU-PME.CI aujourd'hui
              </h2>
              <p className="mb-6 text-center text-gray-300">
                Bénéficiez de services exclusifs et d'un réseau d'entrepreneurs
                pour développer votre entreprise.
              </p>
              <div className="flex gap-8 align-center justify-center flex-wrap">
                <div className="flex flex-col items-center text-center max-w-xs">
                  <div
                    className="rounded-full p-2 mb-3"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <p className="font-semibold">Opportunités d'affaires</p>
                  <p className="text-gray-300 text-sm">
                    Appels d'offres et partenariats
                  </p>
                </div>

                <div className="flex flex-col items-center text-center max-w-xs">
                  <div
                    className="rounded-full p-2 mb-3"
                    style={{ backgroundColor: "var(--color-success)" }}
                  >
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <p className="font-semibold">Support personnalisé</p>
                  <p className="text-gray-300 text-sm">
                    Conseils et assistance juridique
                  </p>
                </div>

                <div className="flex flex-col items-center text-center max-w-xs">
                  <div
                    className="rounded-full p-2 mb-3"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <p className="font-semibold">Visibilité nationale</p>
                  <p className="text-gray-300 text-sm">
                    Promotion de votre entreprise
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/membres?tab=adhesion"
            className="inline-flex items-center justify-center px-8 py-3 rounded-[6px] font-semibold text-white transition duration-300 hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Adhérer maintenant
          </Link>
        </div>
      </section>

      {/* Section Actualités */}
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="container mx-auto px-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--color-neutral-dark)]">
              Dernières actualités
            </h2>
            <a
              href="/actualites"
              className="flex items-center text-[var(--color-primary)] hover:underline font-medium"
            >
              Voir toutes les actualités{" "}
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>

          {isLoadingActualities ? (
            <div className="text-center py-8">
              <p className="text-[var(--color-text-secondary)]">
                Chargement des actualités...
              </p>
            </div>
          ) : actualities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {actualities.map((actuality, index) => (
                <Card key={actuality.id} className="overflow-hidden shadow-sm transition-shadow border-gray-200">
                  <div
                    className="h-48 bg-gradient-to-br from-orange-100 to-orange-200"
                    style={{
                      backgroundImage: actuality.imageUrl
                        ? `url(${actuality.imageUrl})`
                        : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <CardContent className="pt-6">
                    <p
                      className="text-sm font-medium mb-2"
                      style={{ color: index % 2 === 0 ? "var(--color-primary)" : "var(--color-success)" }}
                    >
                      {actuality.publicationDate
                        ? new Date(actuality.publicationDate).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : new Date(actuality.createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                    </p>
                    <h3 className="text-xl font-semibold mb-2 text-[var(--color-neutral-dark)]">
                      {actuality.title}
                    </h3>
                    <p
                      className="mb-4 line-clamp-3"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {actuality.content
                        ? actuality.content.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
                        : "Aucune description disponible"}
                    </p>
                    <a
                      href={`/actualites/${actuality.id}`}
                      className="flex items-center hover:underline font-medium"
                      style={{ color: index % 2 === 0 ? "var(--color-primary)" : "var(--color-success)" }}
                    >
                      Lire la suite <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[var(--color-text-secondary)]">
                Aucune actualité disponible pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section Partenaires */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-3xl font-bold text-[var(--color-neutral-dark)]">
                Nos Partenaires
              </h2>
            </div>
          </div>

          {isLoadingPartenaires ? (
            <div className="text-center py-8">
              <p className="text-[var(--color-text-secondary)]">
                Chargement des partenaires...
              </p>
            </div>
          ) : partenaires.length > 0 ? (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 1000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {partenaires.map((partenaire) => (
                  <CarouselItem
                    key={partenaire.id}
                    className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6"
                  >
                    <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white">
                      {partenaire.lien ? (
                        <a
                          href={partenaire.lien}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center"
                        >
                          <img
                            src={partenaire.logo}
                            alt={partenaire.nom}
                            className="max-h-full max-w-full object-contain"
                          />
                        </a>
                      ) : (
                        <img
                          src={partenaire.logo}
                          alt={partenaire.nom}
                          className="max-h-full max-w-full object-contain"
                        />
                      )}
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          ) : (
            <div className="text-center py-8">
              <p className="text-[var(--color-text-secondary)]">
                Aucun partenaire disponible pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
