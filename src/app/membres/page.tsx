"use client";

export default function Membres() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50/30 to-blue-50/40 py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold text-[#221F1F] text-center mb-6">
            Nos Membres
          </h1>
          <p className="font-inter text-lg sm:text-xl text-[#6F6F6F] text-center max-w-3xl mx-auto">
            Rejoignez un réseau dynamique d'entrepreneurs et de PME
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl font-bold text-[#221F1F] mb-4">
              Devenir Membre
            </h2>
            <p className="font-inter text-base text-[#6F6F6F] max-w-2xl mx-auto mb-8">
              Bénéficiez de nombreux avantages en rejoignant la CPU-PME
            </p>
            <button className="bg-[#F08223] hover:bg-[#D97420] text-white font-inter text-base font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl">
              Adhérer maintenant
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
