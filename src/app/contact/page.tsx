"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50/30 to-blue-50/40 py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold text-[#221F1F] text-center mb-6">
            Contact & Assistance
          </h1>
          <p className="font-inter text-lg sm:text-xl text-[#6F6F6F] text-center max-w-3xl mx-auto">
            Nous sommes là pour vous accompagner
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="font-montserrat text-3xl font-bold text-[#221F1F] mb-6">
                Nos Coordonnées
              </h2>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#F08223] shrink-0 mt-1" />
                <div>
                  <h3 className="font-inter font-semibold text-[#221F1F] mb-1">Adresse</h3>
                  <p className="font-inter text-[#6F6F6F]">
                    Rue de la République, Abidjan, Côte d'Ivoire
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#F08223] shrink-0 mt-1" />
                <div>
                  <h3 className="font-inter font-semibold text-[#221F1F] mb-1">Téléphone</h3>
                  <p className="font-inter text-[#6F6F6F]">
                    +225 27 12 34 56 78
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#F08223] shrink-0 mt-1" />
                <div>
                  <h3 className="font-inter font-semibold text-[#221F1F] mb-1">Email</h3>
                  <p className="font-inter text-[#6F6F6F]">
                    contact@cpu-pme.ci
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h2 className="font-montserrat text-2xl font-bold text-[#221F1F] mb-6">
                Envoyez-nous un message
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="font-inter text-sm font-medium text-[#221F1F] mb-2 block">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F08223]"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="font-inter text-sm font-medium text-[#221F1F] mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F08223]"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="font-inter text-sm font-medium text-[#221F1F] mb-2 block">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F08223]"
                    placeholder="Votre message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#F08223] hover:bg-[#D97420] text-white font-inter font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
