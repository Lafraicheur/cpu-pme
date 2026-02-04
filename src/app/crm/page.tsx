"use client";

import { DynamicHeroBanner } from "@/components/DynamicHeroBanner";

export default function CRM() {
  return (
    <>
      {/* Hero Section */}
      <DynamicHeroBanner
        position="product"
        title="CRM & Réseautage"
        subtitle="Développez votre réseau et créez des opportunités d'affaires"
      />

      {/* Content Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-montserrat text-3xl font-bold text-[#221F1F] mb-6">
              Plateforme de Réseautage
            </h2>
            <p className="font-inter text-base text-[#6F6F6F] leading-relaxed mb-8">
              Connectez-vous avec des entrepreneurs, partagez vos expériences et développez votre activité grâce à notre plateforme de réseautage.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
