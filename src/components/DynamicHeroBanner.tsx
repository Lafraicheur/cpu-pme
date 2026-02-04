"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { bannersService, Banner } from "@/lib/api/services/banners.service";

interface DynamicHeroBannerProps {
  position: string;
  title: string;
  subtitle?: string;
  minHeight?: string;
  children?: React.ReactNode;
}

export function DynamicHeroBanner({
  position,
  title,
  subtitle,
  minHeight = "h-64 sm:h-72 md:h-80 lg:h-150",
  children,
}: DynamicHeroBannerProps) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoadingBanners, setIsLoadingBanners] = useState(true);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setIsLoadingBanners(true);
        const data = await bannersService.getBanners({
          position,
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
  }, [position]);

  return (
    <section
      className={`relative ${minHeight} flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a]`}
    >
      {/* BACKGROUND IMAGE / CAROUSEL */}
      <div className="absolute inset-0">
        {isLoadingBanners ? (
          // Image par défaut pendant le chargement
          <>
            <img
              src="/logo.png"
              alt="Confédération Patronale Unique des PME de Côte d'Ivoire"
              className="w-full h-full object-cover min-h-full"
              style={{ minHeight: "100%" }}
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
            <CarouselContent className="h-full">
              {/* Banner par défaut (toujours inclus) */}
              <CarouselItem className="h-full">
                <div className="relative h-full w-full">
                  <img
                    src="/logo.png"
                    alt="Confédération Patronale Unique des PME de Côte d'Ivoire"
                    className="w-full h-full object-cover"
                    style={{ minHeight: "100%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
                </div>
              </CarouselItem>
              {/* Banners dynamiques */}
              {banners.map((banner) => (
                <CarouselItem key={banner.id} className="h-full min-h-full">
                  <div className="relative w-full h-full min-h-full">
                    <img
                      src={banner.image_url || "/logo.png"}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Afficher les boutons de navigation seulement s'il y a plus d'1 slide */}
            {banners.length + 1 > 1 && (
              <>
                <CarouselPrevious className="left-2 sm:left-4 bg-[#F17C21] border-amber-50 text-white z-20 top-1/2 -translate-y-1/2" />
                <CarouselNext className="right-2 sm:right-4 bg-[#F17C21] border-amber-50 text-white z-20 top-1/2 -translate-y-1/2" />
              </>
            )}
          </Carousel>
        )}
      </div>

      {/* CONTENU */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto text-white/80 font-light px-4">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
