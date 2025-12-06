"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LogIn, UserPlus, Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
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

  // Fonction pour vérifier si un lien est actif
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo.png"
                alt="CPU-PME Logo"
                width={140}
                height={45}
                priority
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden xl:flex items-center gap-5 flex-1 justify-center">
              <Link
                href="/"
                className={`font-inter text-xs font-semibold transition-colors whitespace-nowrap ${
                  isActive("/")
                    ? "text-[#F08223] hover:text-[#D97420]"
                    : "text-[#6F6F6F] hover:text-[#221F1F]"
                }`}
              >
                Accueil
              </Link>
              <Link
                href="/a-propos"
                className={`font-inter text-xs font-medium transition-colors whitespace-nowrap ${
                  isActive("/a-propos")
                    ? "text-[#F08223] hover:text-[#D97420]"
                    : "text-[#6F6F6F] hover:text-[#221F1F]"
                }`}
              >
                À Propos
              </Link>
              <Link
                href="/actualites"
                className={`font-inter text-xs font-medium transition-colors whitespace-nowrap ${
                  isActive("/actualites")
                    ? "text-[#F08223] hover:text-[#D97420]"
                    : "text-[#6F6F6F] hover:text-[#221F1F]"
                }`}
              >
                Actualités & Publications
              </Link>
              <Link
                href="/secteurs"
                className={`font-inter text-xs font-medium transition-colors whitespace-nowrap ${
                  isActive("/secteurs")
                    ? "text-[#F08223] hover:text-[#D97420]"
                    : "text-[#6F6F6F] hover:text-[#221F1F]"
                }`}
              >
                Secteurs & Filières
              </Link>
              <Link
                href="/membres"
                className={`font-inter text-xs font-medium transition-colors whitespace-nowrap ${
                  isActive("/membres")
                    ? "text-[#F08223] hover:text-[#D97420]"
                    : "text-[#6F6F6F] hover:text-[#221F1F]"
                }`}
              >
                Membres
              </Link>
              <Link
                href="/plaidoyer"
                className={`font-inter text-xs font-medium transition-colors whitespace-nowrap ${
                  isActive("/plaidoyer")
                    ? "text-[#F08223] hover:text-[#D97420]"
                    : "text-[#6F6F6F] hover:text-[#221F1F]"
                }`}
              >
                Plaidoyer & Influence
              </Link>
              <Link
                href="/crm"
                className={`font-inter text-xs font-medium transition-colors whitespace-nowrap ${
                  isActive("/crm")
                    ? "text-[#F08223] hover:text-[#D97420]"
                    : "text-[#6F6F6F] hover:text-[#221F1F]"
                }`}
              >
                CRM & Réseautage
              </Link>
              <Link
                href="/contact"
                className={`font-inter text-xs font-medium transition-colors whitespace-nowrap ${
                  isActive("/contact")
                    ? "text-[#F08223] hover:text-[#D97420]"
                    : "text-[#6F6F6F] hover:text-[#221F1F]"
                }`}
              >
                Contact & Assistance
              </Link>
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
              <Link href="/" onClick={() => setIsDrawerOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="CPU-PME Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </Link>
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
              <Link
                href="/"
                className={`font-inter text-sm font-semibold px-4 py-3 rounded-lg transition-colors ${
                  isActive("/")
                    ? "text-[#F08223] bg-orange-50"
                    : "text-[#6F6F6F] hover:bg-gray-50"
                }`}
                onClick={() => setIsDrawerOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/a-propos"
                className={`font-inter text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                  isActive("/a-propos")
                    ? "text-[#F08223] bg-orange-50"
                    : "text-[#6F6F6F] hover:bg-gray-50"
                }`}
                onClick={() => setIsDrawerOpen(false)}
              >
                À Propos
              </Link>
              <Link
                href="/actualites"
                className={`font-inter text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                  isActive("/actualites")
                    ? "text-[#F08223] bg-orange-50"
                    : "text-[#6F6F6F] hover:bg-gray-50"
                }`}
                onClick={() => setIsDrawerOpen(false)}
              >
                Actualités & Publications
              </Link>
              <Link
                href="/secteurs"
                className={`font-inter text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                  isActive("/secteurs")
                    ? "text-[#F08223] bg-orange-50"
                    : "text-[#6F6F6F] hover:bg-gray-50"
                }`}
                onClick={() => setIsDrawerOpen(false)}
              >
                Secteurs & Filières
              </Link>
              <Link
                href="/membres"
                className={`font-inter text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                  isActive("/membres")
                    ? "text-[#F08223] bg-orange-50"
                    : "text-[#6F6F6F] hover:bg-gray-50"
                }`}
                onClick={() => setIsDrawerOpen(false)}
              >
                Membres
              </Link>
              <Link
                href="/plaidoyer"
                className={`font-inter text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                  isActive("/plaidoyer")
                    ? "text-[#F08223] bg-orange-50"
                    : "text-[#6F6F6F] hover:bg-gray-50"
                }`}
                onClick={() => setIsDrawerOpen(false)}
              >
                Plaidoyer & Influence
              </Link>
              <Link
                href="/crm"
                className={`font-inter text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                  isActive("/crm")
                    ? "text-[#F08223] bg-orange-50"
                    : "text-[#6F6F6F] hover:bg-gray-50"
                }`}
                onClick={() => setIsDrawerOpen(false)}
              >
                CRM & Réseautage
              </Link>
              <Link
                href="/contact"
                className={`font-inter text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                  isActive("/contact")
                    ? "text-[#F08223] bg-orange-50"
                    : "text-[#6F6F6F] hover:bg-gray-50"
                }`}
                onClick={() => setIsDrawerOpen(false)}
              >
                Contact & Assistance
              </Link>
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
