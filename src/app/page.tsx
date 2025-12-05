"use client";

import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-blue-100 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-blue-50 rounded-full opacity-40 -translate-x-1/3 translate-y-1/3"></div>

      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#221F1F] text-center">
            Bienvenue sur CPU-PME
          </h1>
        </div>
      </main>
    </div>
  );
}
