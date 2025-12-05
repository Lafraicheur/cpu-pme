"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Banknote,
  ChevronRight,
  FileSearch,
  GraduationCap,
  Link,
  Store,
  UserPlus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Confédération Patronale Unique des PME de Côte d'Ivoire
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-fade-in">
            Votre partenaire pour le développement et la croissance des
            entreprises ivoiriennes
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <a
              href="#"
              className="bg-white text-black hover:bg-white/90 px-6 py-3 rounded-lg font-semibold"
            >
              Découvrir nos services
            </a>
            <a
              href="#"
              className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold"
            >
              Devenir membre
            </a>
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
            <Card className="shadow-md hover:shadow-xl transition-shadow border-0">
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

            <Card className="shadow-md hover:shadow-xl transition-shadow border-0">
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

            <Card className="shadow-md hover:shadow-xl transition-shadow border-0">
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

            <Card className="shadow-md hover:shadow-xl transition-shadow border-0">
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

      <section className="py-16">
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
            <Card className="shadow-md hover:shadow-xl transition-shadow border-0">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full mb-4" style={{ backgroundColor: 'rgba(240, 130, 35, 0.1)' }}>
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
                    href="https://incubateur.cpu-pme.ci"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[var(--color-primary)] hover:underline font-medium"
                  >
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-shadow border-0">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full mb-4" style={{ backgroundColor: 'rgba(25, 157, 78, 0.1)' }}>
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
                    href="https://appeldoffre.cpu-pme.ci"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[var(--color-success)] hover:underline font-medium"
                  >
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-shadow border-0">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full mb-4" style={{ backgroundColor: 'rgba(240, 130, 35, 0.1)' }}>
                    <GraduationCap className="h-8 w-8 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Formation</h3>
                  <p className="text-[var(--color-text-secondary)] mb-4">
                    Développez vos compétences grâce à nos programmes de
                    formation adaptés aux besoins des PME.
                  </p>
                  <a
                    href="https://formation.cpu-pme.ci"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[var(--color-primary)] hover:underline font-medium"
                  >
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-shadow border-0">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full mb-4" style={{ backgroundColor: 'rgba(25, 157, 78, 0.1)' }}>
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
                    href="https://marketplace.cpu-pme.ci"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[var(--color-success)] hover:underline font-medium"
                  >
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-shadow border-0">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full mb-4" style={{ backgroundColor: 'rgba(240, 130, 35, 0.1)' }}>
                    <Banknote className="h-8 w-8 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Financement</h3>
                  <p className="text-[var(--color-text-secondary)] mb-4">
                    Accédez à des solutions de financement adaptées pour
                    développer votre entreprise et réaliser vos projets.
                  </p>
                  <a
                    href="https://financement.cpu-pme.ci"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[var(--color-primary)] hover:underline font-medium"
                  >
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-shadow border-0">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full mb-4" style={{ backgroundColor: 'rgba(25, 157, 78, 0.1)' }}>
                    <UserPlus className="h-8 w-8 text-[var(--color-success)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Réseautage</h3>
                  <p className="text-[var(--color-text-secondary)] mb-4">
                    Rejoignez un réseau de plus de 1000 entrepreneurs et
                    établissez des partenariats stratégiques.
                  </p>
                  <Link
                    to="/reseautage"
                    className="flex items-center text-[var(--color-success)] hover:underline font-medium"
                  >
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              className="text-white hover:opacity-90"
              style={{ backgroundColor: "var(--color-success)" }}
            >
              Voir tous nos services
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
