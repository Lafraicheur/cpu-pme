"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { LogIn, UserPlus, Menu, X } from "lucide-react";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Empêcher le scroll quand le drawer est ouvert
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  return (
    <>
      {/* Header */}
      <header className="relative z-10 px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
            {/* Logo */}
            <div className="flex items-center shrink-0">
              <Image
                src="/couverture_cpu_coming_soon.png"
                alt="CPU-PME Logo"
                width={140}
                height={45}
                priority
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>

            {/* Navigation */}
            <nav className="hidden xl:flex items-center gap-5 flex-1 justify-center">
              <a
                href="#"
                className="font-inter text-[#F08223] text-xs font-semibold hover:text-[#D97420] transition-colors whitespace-nowrap"
              >
                Accueil
              </a>
              <a
                href="#"
                className="font-inter text-[#6F6F6F] text-xs font-medium hover:text-[#221F1F] transition-colors whitespace-nowrap"
              >
                À Propos
              </a>
              <a
                href="#"
                className="font-inter text-[#6F6F6F] text-xs font-medium hover:text-[#221F1F] transition-colors whitespace-nowrap"
              >
                Actualités & Publications
              </a>
              <a
                href="#"
                className="font-inter text-[#6F6F6F] text-xs font-medium hover:text-[#221F1F] transition-colors whitespace-nowrap"
              >
                Secteurs & Filières
              </a>
              <a
                href="#"
                className="font-inter text-[#6F6F6F] text-xs font-medium hover:text-[#221F1F] transition-colors whitespace-nowrap"
              >
                Membres
              </a>
              <a
                href="#"
                className="font-inter text-[#6F6F6F] text-xs font-medium hover:text-[#221F1F] transition-colors whitespace-nowrap"
              >
                Plaidoyer & Influence
              </a>
              <a
                href="#"
                className="font-inter text-[#6F6F6F] text-xs font-medium hover:text-[#221F1F] transition-colors whitespace-nowrap"
              >
                CRM & Réseautage
              </a>
              <a
                href="#"
                className="font-inter text-[#6F6F6F] text-xs font-medium hover:text-[#221F1F] transition-colors whitespace-nowrap"
              >
                Contact & Assistance
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
              <button className="flex items-center gap-1.5 lg:gap-2 bg-white border-2 border-[#F08223] text-[#F08223] hover:bg-[#F08223] hover:text-white font-inter text-xs font-semibold px-3 lg:px-5 py-2 lg:py-2.5 rounded-lg transition-all">
                <LogIn className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                <span className="hidden lg:inline">Connexion</span>
                <span className="lg:hidden">Se connecter</span>
              </button>
              <button className="flex items-center gap-1.5 lg:gap-2 bg-[#F08223] hover:bg-[#D97420] text-white font-inter text-xs font-semibold px-3 lg:px-5 py-2 lg:py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg">
                <UserPlus className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                Adhérer
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="xl:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-[#221F1F]"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 xl:hidden animate-in fade-in duration-200"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 xl:hidden shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header du drawer */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Image
                src="/couverture_cpu_coming_soon.png"
                alt="CPU-PME Logo"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center justify-center w-9 h-9 text-[#221F1F] hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col p-4 space-y-1">
              <a
                href="#"
                className="font-inter text-[#F08223] text-sm font-semibold hover:bg-orange-50 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsDrawerOpen(false)}
              >
                Accueil
              </a>
              <a
                href="#"
                className="font-inter text-[#6F6F6F] text-sm font-medium hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsDrawerOpen(false)}
              >
                À Propos
              </a>
              <a
                href="#"
                className="font-inter text-[#6F6F6F] text-sm font-medium hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsDrawerOpen(false)}
              >
                Actualités & Publications
              </a>
              <a
                href="#"
                className="font-inter text-[#6F6F6F] text-sm font-medium hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsDrawerOpen(false)}
              >
                Secteurs & Filières
              </a>
              <a
                href="#"
                className="font-inter text-[#6F6F6F] text-sm font-medium hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsDrawerOpen(false)}
              >
                Membres
              </a>
              <a
                href="#"
                className="font-inter text-[#6F6F6F] text-sm font-medium hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsDrawerOpen(false)}
              >
                Plaidoyer & Influence
              </a>
              <a
                href="#"
                className="font-inter text-[#6F6F6F] text-sm font-medium hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsDrawerOpen(false)}
              >
                CRM & Réseautage
              </a>
              <a
                href="#"
                className="font-inter text-[#6F6F6F] text-sm font-medium hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsDrawerOpen(false)}
              >
                Contact & Assistance
              </a>
            </nav>

            {/* CTA Buttons dans le drawer */}
            <div className="flex flex-col gap-3 p-4 border-t border-gray-200 mt-auto">
              <button
                className="flex items-center justify-center gap-2 bg-white border-2 border-[#F08223] text-[#F08223] hover:bg-[#F08223] hover:text-white font-inter text-sm font-semibold px-5 py-3 rounded-lg transition-all"
                onClick={() => setIsDrawerOpen(false)}
              >
                <LogIn className="w-4 h-4" />
                Connexion
              </button>
              <button
                className="flex items-center justify-center gap-2 bg-[#F08223] hover:bg-[#D97420] text-white font-inter text-sm font-semibold px-5 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
                onClick={() => setIsDrawerOpen(false)}
              >
                <UserPlus className="w-4 h-4" />
                Adhérer
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
