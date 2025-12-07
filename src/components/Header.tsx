"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { LogIn, UserPlus, Menu, X, Users, Award, Building2, ChevronDown, Factory, Building, Briefcase, Network } from "lucide-react";

function HeaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMembersMenuOpen, setIsMembersMenuOpen] = useState(false);
  const [membersMenuTimeout, setMembersMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isSecteursMenuOpen, setIsSecteursMenuOpen] = useState(false);
  const [secteursMenuTimeout, setSecteursMenuTimeout] = useState<NodeJS.Timeout | null>(null);

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

  // Nettoyer le timeout au démontage
  useEffect(() => {
    return () => {
      if (membersMenuTimeout) {
        clearTimeout(membersMenuTimeout);
      }
      if (secteursMenuTimeout) {
        clearTimeout(secteursMenuTimeout);
      }
    };
  }, [membersMenuTimeout, secteursMenuTimeout]);

  // Fonction pour vérifier si un lien est actif
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Fonction pour vérifier quel onglet membre est actif
  const getActiveMemberTab = () => {
    if (pathname === "/membres") {
      const tab = searchParams.get('tab');
      return tab || 'annuaire';
    }
    return null;
  };

  // Fonction pour vérifier quel secteur est actif
  const getActiveSecteurTab = () => {
    if (pathname === "/secteurs") {
      const tab = searchParams.get('tab');
      return tab || 'primaire';
    }
    return null;
  };

  const activeMemberTab = getActiveMemberTab();
  const activeSecteurTab = getActiveSecteurTab();

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
              {/* Menu Secteurs avec sous-menu */}
              <div 
                className="relative"
                onMouseEnter={() => {
                  if (secteursMenuTimeout) {
                    clearTimeout(secteursMenuTimeout);
                    setSecteursMenuTimeout(null);
                  }
                  setIsSecteursMenuOpen(true);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => {
                    setIsSecteursMenuOpen(false);
                  }, 200);
                  setSecteursMenuTimeout(timeout);
                }}
              >
                <button
                  className={`font-inter text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${
                    isActive("/secteurs")
                      ? "text-[#F08223] hover:text-[#D97420]"
                      : "text-[#6F6F6F] hover:text-[#221F1F]"
                  }`}
                >
                  Secteurs & Filières
                  <ChevronDown className={`w-3 h-3 transition-transform ${isSecteursMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Sous-menu Secteurs */}
                {isSecteursMenuOpen && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    onMouseEnter={() => {
                      if (secteursMenuTimeout) {
                        clearTimeout(secteursMenuTimeout);
                        setSecteursMenuTimeout(null);
                      }
                      setIsSecteursMenuOpen(true);
                    }}
                    onMouseLeave={() => {
                      const timeout = setTimeout(() => {
                        setIsSecteursMenuOpen(false);
                      }, 200);
                      setSecteursMenuTimeout(timeout);
                    }}
                  >
                    <Link
                      href="/secteurs?tab=primaire"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-all duration-200 border-b border-gray-100 rounded-t-lg mx-2 ${
                        activeSecteurTab === 'primaire'
                          ? "text-white bg-[#F08223] border-b-[#F08223]"
                          : "text-[#6F6F6F] hover:text-white hover:bg-[#F08223] hover:border-b-[#F08223]"
                      }`}
                    >
                      <Factory className="w-4 h-4" />
                      Primaire
                    </Link>
                    <Link
                      href="/secteurs?tab=secondaire"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-all duration-200 border-b border-gray-100 rounded-md mx-2 ${
                        activeSecteurTab === 'secondaire'
                          ? "text-white bg-[#F08223] border-b-[#F08223]"
                          : "text-[#6F6F6F] hover:text-white hover:bg-[#F08223] hover:border-b-[#F08223]"
                      }`}
                    >
                      <Building className="w-4 h-4" />
                      Secondaire
                    </Link>
                    <Link
                      href="/secteurs?tab=tertiaire"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-all duration-200 border-b border-gray-100 rounded-md mx-2 ${
                        activeSecteurTab === 'tertiaire'
                          ? "text-white bg-[#F08223] border-b-[#F08223]"
                          : "text-[#6F6F6F] hover:text-white hover:bg-[#F08223] hover:border-b-[#F08223]"
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                      Tertiaire
                    </Link>
                    <Link
                      href="/secteurs?tab=quaternaire"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-all duration-200 rounded-b-lg mx-2 ${
                        activeSecteurTab === 'quaternaire'
                          ? "text-white bg-[#F08223]"
                          : "text-[#6F6F6F] hover:text-white hover:bg-[#F08223]"
                      }`}
                    >
                      <Network className="w-4 h-4" />
                      Quaternaire
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Menu Membres avec sous-menu */}
              <div 
                className="relative"
                onMouseEnter={() => {
                  // Annuler le timeout si on revient sur le menu
                  if (membersMenuTimeout) {
                    clearTimeout(membersMenuTimeout);
                    setMembersMenuTimeout(null);
                  }
                  setIsMembersMenuOpen(true);
                }}
                onMouseLeave={() => {
                  // Ajouter un délai avant de fermer le menu
                  const timeout = setTimeout(() => {
                    setIsMembersMenuOpen(false);
                  }, 200); // 200ms de délai
                  setMembersMenuTimeout(timeout);
                }}
              >
                <button
                  className={`font-inter text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${
                    isActive("/membres")
                      ? "text-[#F08223] hover:text-[#D97420]"
                      : "text-[#6F6F6F] hover:text-[#221F1F]"
                  }`}
                >
                  Membres
                  <ChevronDown className={`w-3 h-3 transition-transform ${isMembersMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Sous-menu */}
                {isMembersMenuOpen && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    onMouseEnter={() => {
                      // Annuler le timeout si on entre dans le sous-menu
                      if (membersMenuTimeout) {
                        clearTimeout(membersMenuTimeout);
                        setMembersMenuTimeout(null);
                      }
                      setIsMembersMenuOpen(true);
                    }}
                    onMouseLeave={() => {
                      // Ajouter un délai avant de fermer le menu
                      const timeout = setTimeout(() => {
                        setIsMembersMenuOpen(false);
                      }, 200);
                      setMembersMenuTimeout(timeout);
                    }}
                  >
                    <Link
                      href="/membres?tab=annuaire"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-all duration-200 border-b border-gray-100 rounded-t-lg mx-2 ${
                        activeMemberTab === 'annuaire'
                          ? "text-white bg-[#F08223] border-b-[#F08223]"
                          : "text-[#6F6F6F] hover:text-white hover:bg-[#F08223] hover:border-b-[#F08223]"
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      Annuaire
                    </Link>
                    <Link
                      href="/membres?tab=avantages"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-all duration-200 border-b border-gray-100 rounded-md mx-2 ${
                        activeMemberTab === 'avantages'
                          ? "text-white bg-[#F08223] border-b-[#F08223]"
                          : "text-[#6F6F6F] hover:text-white hover:bg-[#F08223] hover:border-b-[#F08223]"
                      }`}
                    >
                      <Award className="w-4 h-4" />
                      Avantages
                    </Link>
                    <Link
                      href="/membres?tab=adhesion"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-all duration-200 rounded-b-lg mx-2 ${
                        activeMemberTab === 'adhesion'
                          ? "text-white bg-[#F08223]"
                          : "text-[#6F6F6F] hover:text-white hover:bg-[#F08223]"
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      Adhérer
                    </Link>
                  </div>
                )}
              </div>
              
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
              {/* Sous-menu Secteurs dans le drawer mobile */}
              <div className="space-y-1">
                <div className={`font-inter text-sm font-medium px-4 py-2 text-[#6F6F6F]`}>
                  Secteurs & Filières
                </div>
                <Link
                  href="/secteurs?tab=primaire"
                  className={`font-inter text-sm font-medium px-8 py-2 rounded-lg transition-all duration-200 block ${
                    activeSecteurTab === 'primaire'
                      ? "text-white bg-[#F08223]"
                      : "text-[#6F6F6F] hover:text-white hover:bg-[#F08223]"
                  }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Factory className="w-4 h-4" />
                    Primaire
                  </div>
                </Link>
                <Link
                  href="/secteurs?tab=secondaire"
                  className={`font-inter text-sm font-medium px-8 py-2 rounded-lg transition-all duration-200 block ${
                    activeSecteurTab === 'secondaire'
                      ? "text-white bg-[#F08223]"
                      : "text-[#6F6F6F] hover:text-white hover:bg-[#F08223]"
                  }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Secondaire
                  </div>
                </Link>
                <Link
                  href="/secteurs?tab=tertiaire"
                  className={`font-inter text-sm font-medium px-8 py-2 rounded-lg transition-all duration-200 block ${
                    activeSecteurTab === 'tertiaire'
                      ? "text-white bg-[#F08223]"
                      : "text-[#6F6F6F] hover:text-white hover:bg-[#F08223]"
                  }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Tertiaire
                  </div>
                </Link>
                <Link
                  href="/secteurs?tab=quaternaire"
                  className={`font-inter text-sm font-medium px-8 py-2 rounded-lg transition-all duration-200 block ${
                    activeSecteurTab === 'quaternaire'
                      ? "text-white bg-[#F08223]"
                      : "text-[#6F6F6F] hover:text-white hover:bg-[#F08223]"
                  }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4" />
                    Quaternaire
                  </div>
                </Link>
              </div>
              
              {/* Sous-menu Membres dans le drawer mobile */}
              <div className="space-y-1">
                <div className={`font-inter text-sm font-medium px-4 py-2 text-[#6F6F6F]`}>
                  Membres
                </div>
                <Link
                  href="/membres?tab=annuaire"
                  className={`font-inter text-sm font-medium px-8 py-2 rounded-lg transition-all duration-200 block ${
                    activeMemberTab === 'annuaire'
                      ? "text-white bg-[#F08223]"
                      : "text-[#6F6F6F] hover:text-white hover:bg-[#F08223]"
                  }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Annuaire
                  </div>
                </Link>
                <Link
                  href="/membres?tab=avantages"
                  className={`font-inter text-sm font-medium px-8 py-2 rounded-lg transition-all duration-200 block ${
                    activeMemberTab === 'avantages'
                      ? "text-white bg-[#F08223]"
                      : "text-[#6F6F6F] hover:text-white hover:bg-[#F08223]"
                  }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Avantages
                  </div>
                </Link>
                <Link
                  href="/membres?tab=adhesion"
                  className={`font-inter text-sm font-medium px-8 py-2 rounded-lg transition-all duration-200 block ${
                    activeMemberTab === 'adhesion'
                      ? "text-white bg-[#F08223]"
                      : "text-[#6F6F6F] hover:text-white hover:bg-[#F08223]"
                  }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Adhérer
                  </div>
                </Link>
              </div>
              
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

export default function Header() {
  return (
    <Suspense fallback={
      <header className="sticky top-0 z-50 px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
            <div className="h-8 sm:h-10 w-32 bg-gray-200 animate-pulse rounded" />
            <div className="flex-1" />
            <div className="h-9 w-20 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </header>
    }>
      <HeaderContent />
    </Suspense>
  );
}
