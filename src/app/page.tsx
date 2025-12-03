"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LogIn, UserPlus, Menu } from "lucide-react";

export default function Home() {
  // État pour le compte à rebours
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [targetDate, setTargetDate] = useState<Date | null>(null);

  // Initialiser ou récupérer la date cible
  useEffect(() => {
    const storedDate = localStorage.getItem("countdownTargetDate");

    if (storedDate) {
      // Utiliser la date sauvegardée
      setTargetDate(new Date(storedDate));
    } else {
      // Créer une nouvelle date (30 jours dans le futur)
      const newTargetDate = new Date();
      newTargetDate.setDate(newTargetDate.getDate() + 30);
      localStorage.setItem("countdownTargetDate", newTargetDate.toISOString());
      setTargetDate(newTargetDate);
    }
  }, []);

  // Mettre à jour le compte à rebours chaque seconde
  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        // Le compte à rebours est terminé
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full opacity-40 -translate-x-1/3 translate-y-1/3"></div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Image
                src="/couverture_cpu_coming_soon.png"
                alt="CPU-PME Logo"
                width={140}
                height={45}
                priority
                className="h-10 w-auto object-contain"
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
            <div className="flex items-center gap-3 flex-shrink-0">
              <button className="flex items-center gap-2 bg-white border-2 border-[#F08223] text-[#F08223] hover:bg-[#F08223] hover:text-white font-inter text-xs font-semibold px-5 py-2.5 rounded-lg transition-all">
                <LogIn className="w-4 h-4" />
                Connexion
              </button>
              <button className="flex items-center gap-2 bg-[#F08223] hover:bg-[#D97420] text-white font-inter text-xs font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg">
                <UserPlus className="w-4 h-4" />
                Adhérer
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="xl:hidden flex items-center justify-center w-10 h-10 text-[#221F1F]">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Title */}
              <div>
                <h1 className="font-montserrat text-5xl md:text-6xl font-bold text-[#221F1F] mb-4">
                  Coming Soon
                </h1>
                <p className="font-inter text-lg text-[#6F6F6F] leading-relaxed">
                  Notre plateforme est en cours de construction. Ne vous
                  inquiétez pas ! Nous arriverons bientôt. Restez avec nous.
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="flex gap-6">
                {/* Days */}
                <div className="flex flex-col items-start">
                  <div className="font-montserrat text-6xl md:text-7xl font-bold text-[#F08223]">
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                  <div className="font-inter text-sm text-[#6F6F6F] mt-2">
                    Days
                  </div>
                </div>

                {/* Hours */}
                <div className="flex flex-col items-start">
                  <div className="font-montserrat text-6xl md:text-7xl font-bold text-[#F08223]">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="font-inter text-sm text-[#6F6F6F] mt-2">
                    Hours
                  </div>
                </div>

                {/* Minutes */}
                <div className="flex flex-col items-start">
                  <div className="font-montserrat text-6xl md:text-7xl font-bold text-[#F08223]">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="font-inter text-sm text-[#6F6F6F] mt-2">
                    Minutes
                  </div>
                </div>

                {/* Seconds */}
                <div className="flex flex-col items-start">
                  <div className="font-montserrat text-6xl md:text-7xl font-bold text-[#F08223]">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="font-inter text-sm text-[#6F6F6F] mt-2">
                    Seconds
                  </div>
                </div>
              </div>

              {/* Newsletter Form */}
              <div className="space-y-4">
                <p className="font-inter text-base text-[#6F6F6F]">
                  Recevez une notification par e-mail pour les mises à jour.
                </p>
                <form className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Entrez votre Email"
                    className="flex-1 px-6 py-4 bg-[#F6F6F6] border-none rounded-lg font-inter text-[#6F6F6F] placeholder:text-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-[#F08223]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#199D4E] hover:bg-[#157A3D] text-white font-inter font-semibold px-8 py-4 rounded-lg transition-colors whitespace-nowrap"
                  >
                    S&apos;inscrire
                  </button>
                </form>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-[#3B5998] hover:bg-[#2D4373] rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href="#"
                  className="w-12 h-12 bg-[#1DA1F2] hover:bg-[#0D8BD9] rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>

                <a
                  href="#"
                  className="w-12 h-12 bg-[#0077B5] hover:bg-[#005582] rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                <a
                  href="#"
                  className="w-12 h-12 bg-[#FF0000] hover:bg-[#CC0000] rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="YouTube"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column - Image Placeholder */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                <Image
                  src="/coming_soon.jpg"
                  alt="Coming Soon Illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
