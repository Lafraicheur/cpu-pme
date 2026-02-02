"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
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
  Target,
  Clock,
  Handshake,
  Newspaper,
  FileText,
  Layers,
} from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

function HeaderContent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isMembersMenuOpen, setIsMembersMenuOpen] = useState(false);
  const [membersMenuTimeout, setMembersMenuTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [isSecteursMenuOpen, setIsSecteursMenuOpen] = useState(false);
  const [secteursMenuTimeout, setSecteursMenuTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [isAProposMenuOpen, setIsAProposMenuOpen] = useState(false);
  const [aProposMenuTimeout, setAProposMenuTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [isActualitesMenuOpen, setIsActualitesMenuOpen] = useState(false);
  const [actualitesMenuTimeout, setActualitesMenuTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [servicesMenuTimeout, setServicesMenuTimeout] =
    useState<NodeJS.Timeout | null>(null);
  // États pour les menus mobiles
  const [isMobileMembersOpen, setIsMobileMembersOpen] = useState(false);
  const [isMobileSecteursOpen, setIsMobileSecteursOpen] = useState(false);
  const [isMobileAProposOpen, setIsMobileAProposOpen] = useState(false);
  const [isMobileActualitesOpen, setIsMobileActualitesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const searchParams = useSearchParams();

  // Debug: afficher le pathname
  useEffect(() => {}, [pathname]);

  // Nettoyer le timeout au démontage
  useEffect(() => {
    return () => {
      if (membersMenuTimeout) {
        clearTimeout(membersMenuTimeout);
      }
      if (secteursMenuTimeout) {
        clearTimeout(secteursMenuTimeout);
      }
      if (aProposMenuTimeout) {
        clearTimeout(aProposMenuTimeout);
      }
      if (actualitesMenuTimeout) {
        clearTimeout(actualitesMenuTimeout);
      }
      if (servicesMenuTimeout) {
        clearTimeout(servicesMenuTimeout);
      }
    };
  }, [
    membersMenuTimeout,
    secteursMenuTimeout,
    aProposMenuTimeout,
    actualitesMenuTimeout,
    servicesMenuTimeout,
  ]);

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

  const activeMemberTab = getActiveMemberTab();

  return (
    <>
      <header className="sticky top-0 z-50 px-4 sm:px-6 py-4 sm:py-5 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
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
                  isActive("/a-propos")
                    ? "text-[#F08223] font-semibold hover:text-[#D97420]"
                    : "text-[#6F6F6F] font-medium hover:text-[#221F1F] border-transparent"
                }`}
              >
                À propos
              </Link>

              <div
                className="relative"
                onMouseEnter={() => {
                  if (servicesMenuTimeout) {
                    clearTimeout(servicesMenuTimeout);
                    setServicesMenuTimeout(null);
                  }
                  setIsServicesMenuOpen(true);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => {
                    setIsServicesMenuOpen(false);
                  }, 200);
                  setServicesMenuTimeout(timeout);
                }}
              >
                <button
                  className={`font-inter text-sm transition-all whitespace-nowrap pb-1 border-b-2 flex items-center gap-1 cursor-pointer ${
                    isActive("/services")
                      ? "text-[#F08223] font-semibold hover:text-[#D97420] border-[#F08223]"
                      : "text-[#6F6F6F] font-medium hover:text-[#221F1F] border-transparent"
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isServicesMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Sous-menu Services */}
                {isServicesMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    {/* <Link
                      href="#"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors group cursor-pointer"
                    >
                      <Award className="w-5 h-5 text-[#F08223] group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#F08223] cursor-pointer">
                        Incubateur Champion 225
                      </span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors group cursor-pointer"
                    >
                      <FileText className="w-5 h-5 text-[#F08223] group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#F08223]">
                        Appels d&apos;offres & Opportunités
                      </span>
                    </Link> */}
                    <Link
                      href="#"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors group cursor-pointer"
                    >
                      <Building2 className="w-5 h-5 text-[#F08223] group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#F08223]">
                        Formation / CPU-Académie
                      </span>
                    </Link>
                    {/* <Link
                      href="#"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors group cursor-pointer"
                    >
                      <Layers className="w-5 h-5 text-[#F08223] group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#F08223]">
                        Marketplace
                      </span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors group cursor-pointer"
                    >
                      <Briefcase className="w-5 h-5 text-[#F08223] group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#F08223]">
                        Financement
                      </span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors group cursor-pointer"
                    >
                      <Network className="w-5 h-5 text-[#F08223] group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#F08223]">
                        Réseautage & Événements
                      </span>
                    </Link> */}
                  </div>
                )}
              </div>

              <Link
                href="/actualites"
                className={`font-inter text-sm transition-all whitespace-nowrap pb-1 border-b-2 ${
                  isActive("/actualites")
                    ? "text-[#F08223] font-semibold hover:text-[#D97420]"
                    : "text-[#6F6F6F] font-medium hover:text-[#221F1F] border-transparent"
                }`}
              >
                Actualités & Publications
              </Link>

              {/* Menu Actualités & Publications avec sous-menu */}
              <Link
                href="/secteurs"
                className={`font-inter text-sm transition-all whitespace-nowrap pb-1 border-b-2 ${
                  isActive("/secteurs")
                    ? "text-[#F08223] font-semibold hover:text-[#D97420]"
                    : "text-[#6F6F6F] font-medium hover:text-[#221F1F] border-transparent"
                }`}
              >
                Secteurs & Filières
              </Link>

              {/* Menu Secteurs avec sous-menu */}
              <Link
                href="/membres"
                className={`font-inter text-sm transition-all whitespace-nowrap pb-1 border-b-2 ${
                  isActive("/membres")
                    ? "text-[#F08223] font-semibold hover:text-[#D97420]"
                    : "text-[#6F6F6F] font-medium hover:text-[#221F1F] border-transparent"
                }`}
              >
                Membres
              </Link>

              {/* CTA Buttons */}
              <div className="hidden md:flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  onClick={() => setIsLoginOpen(true)}
                  className="border-success text-success hover:bg-success hover:text-white w-full rounded-sm font-inter text-xs font-semibold px-3 py-1.5 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Connexion
                </Button>
                <Button
                  onClick={() => router.push("/membres?tab=adhesion")}
                  className="bg-[#F08223] text-white hover:bg-opacity-90 w-full font-inter text-xs font-semibold px-3 py-1.5 rounded-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Adhérer
                </Button>
              </div>

              <div className="pt-4 flex flex-col space-y-2"></div>
            </nav>

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

            {/* Navigation */}
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
                  isActive("/a-propos")
                    ? "text-[#F08223] bg-orange-50"
                    : "text-[#6F6F6F] hover:bg-gray-50"
                }`}
                onClick={() => setIsDrawerOpen(false)}
              >
                À Propos
              </Link>

              {/* Menu Services avec sous-menu mobile */}
              <div>
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className={`w-full flex items-center justify-between font-inter text-sm font-medium px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                    isActive("/services")
                      ? "text-[#F08223] bg-orange-50"
                      : "text-[#6F6F6F] hover:bg-gray-50"
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isMobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Sous-menu Services mobile */}
                {isMobileServicesOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {/* <Link
                      href="#"
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-orange-50 hover:text-[#F08223] transition-colors cursor-pointer"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Award className="w-4 h-4" />
                      <span>Incubateur Champion 225</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-orange-50 hover:text-[#F08223] transition-colors cursor-pointer"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Appels d&apos;offres & Opportunités</span>
                    </Link> */}
                    <Link
                      href="#"
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-orange-50 hover:text-[#F08223] transition-colors cursor-pointer"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Formation / CPU-Académie</span>
                    </Link>
                    {/* <Link
                      href="#"
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-orange-50 hover:text-[#F08223] transition-colors cursor-pointer"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Layers className="w-4 h-4" />
                      <span>Marketplace</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-orange-50 hover:text-[#F08223] transition-colors cursor-pointer"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>Financement</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-orange-50 hover:text-[#F08223] transition-colors cursor-pointer"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <Network className="w-4 h-4" />
                      <span>Réseautage & Événements</span>
                    </Link> */}
                  </div>
                )}
              </div>

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
              {/* Lien Secteurs simple (sans sous-menu) dans le drawer mobile */}
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
            </nav>

            {/* CTA Buttons dans le drawer */}
            <div className="flex flex-col gap-3 p-4 border-t border-gray-200 mt-auto">
              <Button
                variant="outline"
                onClick={() => setIsLoginOpen(true)}
                className="border-success text-success hover:bg-success hover:text-white w-full rounded-sm font-inter text-xs font-semibold px-3 py-1.5 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                Connexion
              </Button>
              <Button
                onClick={() => {
                  router.push("/membres?tab=adhesion");
                  setIsDrawerOpen(false);
                }}
                className="bg-[#F08223] text-white hover:bg-opacity-90 w-full font-inter text-xs font-semibold px-3 py-1.5 rounded-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Adhérer
              </Button>
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

          <form className="space-y-5 mt-4">
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

export default function Header() {
  return (
    <Suspense fallback={<div className="h-20 bg-white" />}>
      <HeaderContent />
    </Suspense>
  );
}
