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
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[550px] flex items-center justify-center overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img
            src="/logo.png"
            alt="Confédération Patronale Unique des PME de Côte d'Ivoire"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        </div>

        {/* CONTENU */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Confédération Patronale Unique des PME de Côte d'Ivoire
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-fade-in">
            Votre partenaire pour le développement et la croissance des
            entreprises ivoiriennes
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <a
              href="#services"
              className="bg-white text-black hover:bg-white/90 px-6 py-3 rounded-lg font-semibold cursor-pointer"
            >
              Découvrir nos services
            </a>
            <Link
              href="/membres?tab=adhesion"
              className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold cursor-pointer"
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
            <Card className="shadow-sm transition-shadow border-0">
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

            <Card className="shadow-sm transition-shadow border-0">
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

            <Card className="shadow-sm transition-shadow border-0">
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

            <Card className="shadow-sm transition-shadow border-0">
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

            <Card className="shadow-sm transition-shadow border-0">
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

            <Card className="shadow-sm transition-shadow border-0">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <Card className="overflow-hidden shadow-sm transition-shadow border-0">
              <div
                className="h-48 bg-gradient-to-br from-orange-100 to-orange-200"
                style={{
                  backgroundImage: "Aucun image",
                }}
              />
              <CardContent className="pt-6">
                <p
                  className="text-sm font-medium mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  15 Mars 2025
                </p>
                <h3 className="text-xl font-semibold mb-2 text-[var(--color-neutral-dark)]">
                  Lancement du nouveau programme de financement pour les PME
                </h3>
                <p
                  className="mb-4 line-clamp-3"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Le ministère de l'Économie et des Finances a lancé un nouveau
                  programme de financement destiné aux PME ivoiriennes. Ce
                  programme...
                </p>
                <a
                  href="/actualites/1"
                  className="flex items-center text-[var(--color-primary)] hover:underline font-medium"
                >
                  Lire la suite <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>

            {/* Article 2 */}
            <Card className="overflow-hidden shadow-sm transition-shadow border-0">
              <div
                className="h-48 bg-gradient-to-br from-green-100 to-green-200"
                style={{
                  backgroundImage: "Aucun image",
                }}
              />
              <CardContent className="pt-6">
                <p
                  className="text-sm font-medium mb-2"
                  style={{ color: "var(--color-success)" }}
                >
                  10 Mars 2025
                </p>
                <h3 className="text-xl font-semibold mb-2 text-[var(--color-neutral-dark)]">
                  Forum national des entrepreneurs : les inscriptions sont
                  ouvertes
                </h3>
                <p
                  className="mb-4 line-clamp-3"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Le Forum national des entrepreneurs se tiendra du 5 au 7 avril
                  2025 à Abidjan. Les inscriptions sont désormais ouvertes pour
                  tous les...
                </p>
                <a
                  href="/actualites/2"
                  className="flex items-center text-[var(--color-success)] hover:underline font-medium"
                >
                  Lire la suite <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>

            {/* Article 3 */}
            <Card className="overflow-hidden shadow-sm transition-shadow border-0">
              <div
                className="h-48 bg-gradient-to-br from-orange-100 to-orange-200"
                style={{
                  backgroundImage: "Aucun image",
                }}
              />
              <CardContent className="pt-6">
                <p
                  className="text-sm font-medium mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  5 Mars 2025
                </p>
                <h3 className="text-xl font-semibold mb-2 text-[var(--color-neutral-dark)]">
                  Nouvelle réglementation pour les entreprises du secteur
                  agricole
                </h3>
                <p
                  className="mb-4 line-clamp-3"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Le gouvernement a adopté une nouvelle réglementation pour les
                  entreprises du secteur agricole. Cette réglementation vise
                  à...
                </p>
                <a
                  href="/actualites/3"
                  className="flex items-center text-[var(--color-primary)] hover:underline font-medium"
                >
                  Lire la suite <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>
          </div>
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

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                <Card className="flex items-center justify-center p-3 h-30 border-0 bg-white">
                  <img
                    src={require("@/assets/bad.png").default.src}
                    alt="Banque Africaine de Développement"
                    className="max-h-full max-w-full object-contain"
                  />
                </Card>
              </CarouselItem>

              <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white">
                  <img
                    src={require("@/assets/ecobank.png").default.src}
                    alt="Ecobank"
                    className="max-h-full max-w-full object-contain"
                  />
                </Card>
              </CarouselItem>

              <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white">
                  <img
                    src={require("@/assets/mtn.png").default.src}
                    alt="MTN"
                    className="max-h-full max-w-full object-contain"
                  />
                </Card>
              </CarouselItem>

              <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white">
                  <img
                    src={require("@/assets/fun.png").default.src}
                    alt="Union Européenne"
                    className="max-h-full max-w-full object-contain"
                  />
                </Card>
              </CarouselItem>

              <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white">
                  <img
                    src={require("@/assets/afd.png").default.src}
                    alt="Agence Française de Développement"
                    className="max-h-full max-w-full object-contain"
                  />
                </Card>
              </CarouselItem>

              <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white">
                  <img
                    src={require("@/assets/cepici.png").default.src}
                    alt="CEPICI - Centre de Promotion des Investissements en Côte d'Ivoire"
                    className="max-h-full max-w-full object-contain"
                  />
                </Card>
              </CarouselItem>

              <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white">
                  <img
                    src={require("@/assets/coperation.png").default.src}
                    alt="Coopération Allemande"
                    className="max-h-full max-w-full object-contain"
                  />
                </Card>
              </CarouselItem>

              <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white">
                  <img
                    src={require("@/assets/agriculture.png").default.src}
                    alt="Ministère d'État, Ministre de l'Agriculture, du Développement Rural et des Productions Vivières"
                    className="max-h-full max-w-full object-contain"
                  />
                </Card>
              </CarouselItem>

              <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white">
                  <img
                    src={require("@/assets/tourisme.png").default.src}
                    alt="Ministère du Tourisme et des Loisirs"
                    className="max-h-full max-w-full object-contain"
                  />
                </Card>
              </CarouselItem>

              <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white">
                  <img
                    src={require("@/assets/commerce.png").default.src}
                    alt="Ministère du Commerce et de l'Industrie"
                    className="max-h-full max-w-full object-contain"
                  />
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>
    </>
  );
}
