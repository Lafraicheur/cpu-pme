"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, Suspense } from "react";
import {
  LogIn,
  UserPlus,
  Menu,
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  Factory,
  Building,
  Briefcase,
  Network,
  Users,
  Award,
  Building2,
  Megaphone,
  HandshakeIcon,
} from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Composant wrapper pour gérer useSearchParams avec Suspense
function HeaderContent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const pathname = usePathname();
  const [isMembersMenuOpen, setIsMembersMenuOpen] = useState(false);
  const [isSecteursMenuOpen, setIsSecteursMenuOpen] = useState(false);
  const [isMobileMembersOpen, setIsMobileMembersOpen] = useState(false);
  const [isMobileSecteursOpen, setIsMobileSecteursOpen] = useState(false);
  const searchParams = useSearchParams();

  // Utilisation de useRef pour les timeouts au lieu de useState
  const [membersMenuTimeout, setMembersMenuTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [secteursMenuTimeout, setSecteursMenuTimeout] =
    useState<NodeJS.Timeout | null>(null);

  // Nettoyer les timeouts au démontage
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

  const getActiveMemberTab = () => {
    if (pathname === "/membres") {
      const tab = searchParams.get("tab");
      return tab || "annuaire";
    }
    return null;
  };

  // Fonction pour vérifier si un lien est actif
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Fonction pour vérifier quel secteur est actif
  const getActiveSecteurTab = () => {
    if (pathname === "/secteurs") {
      const tab = searchParams.get("tab");
      return tab || "primaire";
    }
    return null;
  };

  const activeMemberTab = getActiveMemberTab();
  const activeSecteurTab = getActiveSecteurTab();

  // Fonction pour gérer la soumission du formulaire
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la logique de connexion
    console.log("Formulaire de connexion soumis");
  };

  // Fonction pour gérer le clic sur le bouton Adhérer
  const handleAdhererClick = () => {
    window.location.href = "/membres?tab=adhesion";
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 px-4 sm:px-6 py-4 sm:py-5 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
            {/* Logo */}
            <div className="flex items-center shrink-0">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="CPU-PME Logo"
                  width={140}
                  height={45}
                  priority
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden xl:flex items-center gap-4 flex-1 justify-center">
              <Link
                href="/"
                className={`font-inter text-sm transition-all whitespace-nowrap pb-1 border-b-2 ${
                  pathname === "/" || pathname === ""
                    ? "text-[#F08223] font-semibold border-[#F08223]"
                    : "text-[#6F6F6F] font-medium hover:text-[#221F1F] border-transparent"
                }`}
              >
                Accueil
              </Link>
              <Link
                href="/a-propos"
                className={`font-inter text-sm transition-all whitespace-nowrap pb-1 border-b-2 ${
                  pathname.startsWith("/a-propos")
                    ? "text-[#F08223] font-semibold border-[#F08223]"
                    : "text-[#6F6F6F] font-medium hover:text-[#221F1F] border-transparent"
                }`}
              >
                À Propos
              </Link>
              <Link
                href="/actualites"
                className={`font-inter text-sm transition-all whitespace-nowrap pb-1 border-b-2 ${
                  pathname.startsWith("/actualites")
                    ? "text-[#F08223] font-semibold border-[#F08223]"
                    : "text-[#6F6F6F] font-medium hover:text-[#221F1F] border-transparent"
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
                  className={`font-inter text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1 pb-1 border-b-2 ${
                    isActive("/secteurs")
                      ? "text-[#F08223] font-semibold border-[#F08223]"
                      : "text-[#6F6F6F] hover:text-[#221F1F] border-transparent"
                  }`}
                >
                  Secteurs & Filières
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSecteursMenuOpen ? "rotate-180" : ""
                    }`}
                  />
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
                        activeSecteurTab === "primaire"
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
                        activeSecteurTab === "secondaire"
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
                        activeSecteurTab === "tertiaire"
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
                        activeSecteurTab === "quaternaire"
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
                  className={`font-inter text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1 pb-1 border-b-2 ${
                    isActive("/membres")
                      ? "text-[#F08223] font-semibold border-[#F08223]"
                      : "text-[#6F6F6F] hover:text-[#221F1F] border-transparent"
                  }`}
                >
                  Membres
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      isMembersMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Sous-menu Membres */}
                {isMembersMenuOpen && (
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
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
                    <Link
                      href="/membres?tab=annuaire"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-all duration-200 border-b border-gray-100 rounded-t-lg mx-2 ${
                        activeMemberTab === "annuaire"
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
                        activeMemberTab === "avantages"
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
                        activeMemberTab === "adhesion"
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

              {/* Liens manquants ajoutés */}
              <Link
                href="/plaidoyer"
                className={`font-inter text-sm transition-all whitespace-nowrap pb-1 border-b-2 ${
                  pathname.startsWith("/plaidoyer")
                    ? "text-[#F08223] font-semibold border-[#F08223]"
                    : "text-[#6F6F6F] font-medium hover:text-[#221F1F] border-transparent"
                }`}
              >
                Plaidoyer & Influence
              </Link>
              <Link
                href="/crm"
                className={`font-inter text-sm transition-all whitespace-nowrap pb-1 border-b-2 ${
                  pathname.startsWith("/crm")
                    ? "text-[#F08223] font-semibold border-[#F08223]"
                    : "text-[#6F6F6F] font-medium hover:text-[#221F1F] border-transparent"
                }`}
              >
                CRM & Réseautage
              </Link>
              <Link
                href="/contact"
                className={`font-inter text-sm transition-all whitespace-nowrap pb-1 border-b-2 ${
                  pathname.startsWith("/contact")
                    ? "text-[#F08223] font-semibold border-[#F08223]"
                    : "text-[#6F6F6F] font-medium hover:text-[#221F1F] border-transparent"
                }`}
              >
                Contact & Assistance
              </Link>
            </nav>

            {/* CTA Buttons Desktop */}
            <div className="hidden xl:flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                onClick={() => setIsLoginOpen(true)}
                className="border-success text-success hover:bg-success hover:text-white w-full rounded-sm font-inter text-xs font-semibold px-3 py-1.5 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                Connexion
              </Button>
              <Button
                onClick={handleAdhererClick}
                className="bg-[#F08223] text-white hover:bg-opacity-90 w-full font-inter text-xs font-semibold px-3 py-1.5 rounded-sm transition-all shadow-sm hover:shadow-md"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Adhérer
              </Button>
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
                src="/logo.png"
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

            {/* Navigation Mobile */}
            <nav className="flex flex-col p-4 space-y-1">
              <Link
                href="/"
                className={`font-inter text-sm font-semibold px-4 py-3 rounded-lg transition-colors ${
                  pathname === "/" || pathname === ""
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
                  pathname.startsWith("/a-propos")
                    ? "text-[#F08223] bg-orange-50 font-semibold"
                    : "text-[#6F6F6F] hover:bg-gray-50"
                }`}
                onClick={() => setIsDrawerOpen(false)}
              >
                À Propos
              </Link>
              <Link
                href="/actualites"
                className={`font-inter text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                  pathname.startsWith("/actualites")
                    ? "text-[#F08223] bg-orange-50 font-semibold"
                    : "text-[#6F6F6F] hover:bg-gray-50"
                }`}
                onClick={() => setIsDrawerOpen(false)}
              >
                Actualités & Publications
              </Link>

              {/* Menu Secteurs avec accordéon mobile */}
              <div>
                <button
                  onClick={() => setIsMobileSecteursOpen(!isMobileSecteursOpen)}
                  className={`w-full flex items-center justify-between font-inter text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                    pathname.startsWith("/secteurs")
                      ? "text-[#F08223] bg-orange-50 font-semibold"
                      : "text-[#6F6F6F] hover:bg-gray-50"
                  }`}
                >
                  Secteurs & Filières
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isMobileSecteursOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMobileSecteursOpen && (
                  <div className="mt-1 ml-4 space-y-1">
                    <Link
                      href="/secteurs?tab=primaire"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        activeSecteurTab === "primaire"
                          ? "text-white bg-[#F08223] font-semibold"
                          : "text-[#6F6F6F] hover:bg-gray-50"
                      }`}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Factory className="w-4 h-4" />
                      Primaire
                    </Link>
                    <Link
                      href="/secteurs?tab=secondaire"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        activeSecteurTab === "secondaire"
                          ? "text-white bg-[#F08223] font-semibold"
                          : "text-[#6F6F6F] hover:bg-gray-50"
                      }`}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Building className="w-4 h-4" />
                      Secondaire
                    </Link>
                    <Link
                      href="/secteurs?tab=tertiaire"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        activeSecteurTab === "tertiaire"
                          ? "text-white bg-[#F08223] font-semibold"
                          : "text-[#6F6F6F] hover:bg-gray-50"
                      }`}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Briefcase className="w-4 h-4" />
                      Tertiaire
                    </Link>
                    <Link
                      href="/secteurs?tab=quaternaire"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        activeSecteurTab === "quaternaire"
                          ? "text-white bg-[#F08223] font-semibold"
                          : "text-[#6F6F6F] hover:bg-gray-50"
                      }`}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Network className="w-4 h-4" />
                      Quaternaire
                    </Link>
                  </div>
                )}
              </div>

              {/* Menu Membres avec accordéon mobile */}
              <div>
                <button
                  onClick={() => setIsMobileMembersOpen(!isMobileMembersOpen)}
                  className={`w-full flex items-center justify-between font-inter text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                    pathname.startsWith("/membres")
                      ? "text-[#F08223] bg-orange-50 font-semibold"
                      : "text-[#6F6F6F] hover:bg-gray-50"
                  }`}
                >
                  Membres
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isMobileMembersOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMobileMembersOpen && (
                  <div className="mt-1 ml-4 space-y-1">
                    <Link
                      href="/membres?tab=annuaire"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        activeMemberTab === "annuaire"
                          ? "text-white bg-[#F08223] font-semibold"
                          : "text-[#6F6F6F] hover:bg-gray-50"
                      }`}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Users className="w-4 h-4" />
                      Annuaire
                    </Link>
                    <Link
                      href="/membres?tab=avantages"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        activeMemberTab === "avantages"
                          ? "text-white bg-[#F08223] font-semibold"
                          : "text-[#6F6F6F] hover:bg-gray-50"
                      }`}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Award className="w-4 h-4" />
                      Avantages
                    </Link>
                    <Link
                      href="/membres?tab=adhesion"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        activeMemberTab === "adhesion"
                          ? "text-white bg-[#F08223] font-semibold"
                          : "text-[#6F6F6F] hover:bg-gray-50"
                      }`}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Building2 className="w-4 h-4" />
                      Adhérer
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/plaidoyer"
                className={`font-inter text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                  pathname.startsWith("/plaidoyer")
                    ? "text-[#F08223] bg-orange-50 font-semibold"
                    : "text-[#6F6F6F] hover:bg-gray-50"
                }`}
                onClick={() => setIsDrawerOpen(false)}
              >
                Plaidoyer & Influence
              </Link>
              <Link
                href="/crm"
                className={`font-inter text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                  pathname.startsWith("/crm")
                    ? "text-[#F08223] bg-orange-50 font-semibold"
                    : "text-[#6F6F6F] hover:bg-gray-50"
                }`}
                onClick={() => setIsDrawerOpen(false)}
              >
                CRM & Réseautage
              </Link>
              <Link
                href="/contact"
                className={`font-inter text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                  pathname.startsWith("/contact")
                    ? "text-[#F08223] bg-orange-50 font-semibold"
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
                onClick={() => {
                  setIsDrawerOpen(false);
                  setIsLoginOpen(true);
                }}
              >
                <LogIn className="w-4 h-4" />
                Connexion
              </button>
              <button
                className="flex items-center justify-center gap-2 bg-[#F08223] hover:bg-[#D97420] text-white font-inter text-sm font-semibold px-5 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
                onClick={() => {
                  setIsDrawerOpen(false);
                  handleAdhererClick();
                }}
              >
                <UserPlus className="w-4 h-4" />
                Adhérer
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modal de Connexion */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-[450px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Connexion
            </DialogTitle>
            <DialogDescription className="text-center">
              Accédez à votre espace membre
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-5 mt-4" onSubmit={handleLoginSubmit}>
            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Se souvenir & Mot de passe oublié */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-gray-600">Se souvenir de moi</span>
              </label>
              <a
                href="#"
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton de connexion */}
            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-6 text-base"
            >
              Se connecter
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Composant principal avec Suspense boundary
export default function Header() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-50 px-4 sm:px-6 py-4 sm:py-5 bg-white/80 backdrop-blur-sm shadow-sm">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="CPU-PME Logo"
                  width={140}
                  height={45}
                  priority
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </header>
      }
    >
      <HeaderContent />
    </Suspense>
  );
}
