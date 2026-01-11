"use client";

export default function Plaidoyer() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50/30 to-blue-50/40 py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold text-[#221F1F] text-center mb-6">
            Plaidoyer & Influence
          </h1>
          <p className="font-inter text-lg sm:text-xl text-[#6F6F6F] text-center max-w-3xl mx-auto">
            Défendre les intérêts des PME et influencer les politiques économiques
          </p>
        </div>
      </section>

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
