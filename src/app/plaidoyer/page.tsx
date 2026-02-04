"use client";

import { DynamicHeroBanner } from "@/components/DynamicHeroBanner";

export default function Plaidoyer() {
  return (
    <>
      {/* Hero Section */}
      <DynamicHeroBanner
        position="event"
        title="Plaidoyer & Influence"
        subtitle="Défendre les intérêts des PME et influencer les politiques économiques"
      />

      {/* Content Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-montserrat text-3xl font-bold text-[#221F1F] mb-6">
              Notre Action
            </h2>
            <p className="font-inter text-base text-[#6F6F6F] leading-relaxed mb-8">
              Nous œuvrons pour améliorer l'environnement des affaires et défendre les intérêts des PME auprès des instances décisionnelles.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
