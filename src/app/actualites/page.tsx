"use client";

export default function Actualites() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50/30 to-blue-50/40 py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold text-[#221F1F] text-center mb-6">
            Actualités & Publications
          </h1>
          <p className="font-inter text-lg sm:text-xl text-[#6F6F6F] text-center max-w-3xl mx-auto">
            Restez informés de nos dernières actualités et publications
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Exemple de carte d'actualité */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-montserrat text-xl font-bold text-[#221F1F] mb-3">
                Titre de l'actualité
              </h3>
              <p className="font-inter text-sm text-[#6F6F6F] mb-4">
                Description courte de l'actualité...
              </p>
              <span className="font-inter text-xs text-[#F08223]">
                5 décembre 2025
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
