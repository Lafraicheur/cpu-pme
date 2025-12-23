"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

// Configuration EmailJS
const EMAILJS_SERVICE_ID = "service_hlp7bbq";
const EMAILJS_TEMPLATE_ADMIN = "template_z6oykwg"; // Template pour l'admin
const EMAILJS_TEMPLATE_USER = "template_n85pxw4"; // Template pour l'utilisateur
const EMAILJS_PUBLIC_KEY = "oQdvQQh_YZVaReqrU";

export default function Home() {
  // État pour le compte à rebours
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [targetDate, setTargetDate] = useState<Date | null>(null);

  // États pour le formulaire newsletter
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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

  // Gestion de la soumission du formulaire avec EmailJS
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Email 1 : Notification à l'admin
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ADMIN,
        {
          user_email: email,
          to_email: "admin@cpupme.com",
        },
        EMAILJS_PUBLIC_KEY
      );

      // Email 2 : Confirmation à l'utilisateur
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_USER,
        {
          user_email: email,
          to_email: email,
        },
        EMAILJS_PUBLIC_KEY
      );

      setMessage({
        type: "success",
        text: "Merci ! Vous recevrez un email de confirmation.",
      });
      setEmail("");
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setMessage({
        type: "error",
        text: "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background mosaïque */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/couverture_cpu_coming_soon.png)',
          backgroundSize: '150px 150px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Overlay gradient pour adoucir le background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-orange-50/60 to-blue-50/65"></div>

      {/* Decorative elements - Plus modernes et dynamiques */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#F08223]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200/15 to-transparent rounded-full blur-3xl"></div>

      {/* Main Content - Centré */}
      <main className="relative z-10 w-full px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Logo en haut centré */}
          <div className="flex justify-center mb-12 sm:mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl px-8 py-4">
              <Image
                src="/logo.png"
                alt="CPU-PME Logo"
                width={200}
                height={60}
                priority
                className="h-12 sm:h-16 w-auto object-contain"
              />
            </div>
          </div>

          {/* Contenu principal centré */}
          <div className="text-center space-y-8 sm:space-y-12">
            {/* Title avec animation subtile */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="font-montserrat text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#221F1F] mb-4 sm:mb-6 tracking-tight">
                Bientôt disponible
              </h1>
              <p className="font-inter text-base sm:text-lg lg:text-xl text-[#6F6F6F] leading-relaxed max-w-2xl mx-auto px-4">
                Notre nouvelle plateforme est en cours de finalisation.
                <br className="hidden sm:block" />
                Une expérience innovante arrive très bientôt.
              </p>
            </div>

            {/* Countdown Timer - Design moderne avec cartes */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 px-4">
              {/* Days */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-6 py-6 sm:px-8 sm:py-8 min-w-[100px] sm:min-w-[120px] hover:scale-105 transition-transform duration-300">
                <div className="font-montserrat text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-[#F08223] to-[#D97420] bg-clip-text text-transparent">
                  {String(timeLeft.days).padStart(2, "0")}
                </div>
                <div className="font-inter text-xs sm:text-sm text-[#6F6F6F] mt-2 sm:mt-3 uppercase tracking-wider font-semibold">
                  Jours
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-6 py-6 sm:px-8 sm:py-8 min-w-[100px] sm:min-w-[120px] hover:scale-105 transition-transform duration-300">
                <div className="font-montserrat text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-[#F08223] to-[#D97420] bg-clip-text text-transparent">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="font-inter text-xs sm:text-sm text-[#6F6F6F] mt-2 sm:mt-3 uppercase tracking-wider font-semibold">
                  Heures
                </div>
              </div>

              {/* Minutes */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-6 py-6 sm:px-8 sm:py-8 min-w-[100px] sm:min-w-[120px] hover:scale-105 transition-transform duration-300">
                <div className="font-montserrat text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-[#F08223] to-[#D97420] bg-clip-text text-transparent">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="font-inter text-xs sm:text-sm text-[#6F6F6F] mt-2 sm:mt-3 uppercase tracking-wider font-semibold">
                  Minutes
                </div>
              </div>

              {/* Seconds */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-6 py-6 sm:px-8 sm:py-8 min-w-[100px] sm:min-w-[120px] hover:scale-105 transition-transform duration-300">
                <div className="font-montserrat text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-[#F08223] to-[#D97420] bg-clip-text text-transparent">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="font-inter text-xs sm:text-sm text-[#6F6F6F] mt-2 sm:mt-3 uppercase tracking-wider font-semibold">
                  Secondes
                </div>
              </div>
            </div>

            {/* Newsletter Form - Design moderne */}
            <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 px-4">
              <p className="font-inter text-base sm:text-lg text-[#221F1F] font-medium">
                Soyez informé du lancement
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="email"
                  name="user_email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 sm:px-7 py-4 sm:py-5 bg-white/80 backdrop-blur-md border-2 border-[#F08223]/20 rounded-xl font-inter text-sm sm:text-base text-[#221F1F] placeholder:text-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-[#F08223] focus:border-transparent shadow-lg transition-all"
                  required
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-[#199D4E] to-[#157A3D] hover:from-[#157A3D] hover:to-[#199D4E] text-white font-inter font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-xl transition-all whitespace-nowrap text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-105 transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? "Envoi..." : "M'informer"}
                </button>
              </form>

              {/* Message de succès ou d'erreur */}
              {message && (
                <div
                  className={`mt-4 p-4 rounded-xl font-inter text-sm sm:text-base ${
                    message.type === "success"
                      ? "bg-green-100/80 text-green-800 border-2 border-green-200"
                      : "bg-red-100/80 text-red-800 border-2 border-red-200"
                  } backdrop-blur-md shadow-lg`}
                >
                  {message.text}
                </div>
              )}
            </div>

            {/* Social Icons - Design moderne avec effet de hover */}
            <div className="flex gap-4 sm:gap-5 flex-wrap justify-center pt-4">
              <a
                href="#"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-white/80 backdrop-blur-md hover:bg-[#3B5998] rounded-xl flex items-center justify-center text-[#3B5998] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 transform group"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="#"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-white/80 backdrop-blur-md hover:bg-[#1DA1F2] rounded-xl flex items-center justify-center text-[#1DA1F2] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 transform group"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>

              <a
                href="#"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-white/80 backdrop-blur-md hover:bg-[#0077B5] rounded-xl flex items-center justify-center text-[#0077B5] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 transform group"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="#"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-white/80 backdrop-blur-md hover:bg-[#FF0000] rounded-xl flex items-center justify-center text-[#FF0000] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 transform group"
                aria-label="YouTube"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
