"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building2,
  HelpCircle,
  ChevronDown,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const faqs = [
    {
      question: "Comment devenir membre de la CPU-PME.CI ?",
      answer:
        "Rendez-vous sur la page Membres et remplissez le formulaire d'adhésion. Notre équipe vous contactera pour finaliser votre inscription.",
    },
    {
      question: "Quels sont les avantages de l'adhésion ?",
      answer:
        "Les membres bénéficient de rabais exclusifs chez nos partenaires, d'un accès aux formations, aux appels d'offres et au réseau d'entrepreneurs.",
    },
    {
      question: "Comment accéder aux rabais partenaires ?",
      answer:
        "Après votre adhésion, vous recevrez une carte membre vous permettant de bénéficier des rabais Discount+ chez tous nos partenaires.",
    },
  ];

  return (
    <>
      {/* Hero Section */}

      <section className="relative h-[550px] flex items-center justify-center overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img
            src="/logo.png"
            alt="Confédération Patronale Unique des PME de Côte d'Ivoire"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        </div>

        {/* CONTENU */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Contactez-nous
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-fade-in">
            Notre équipe est à votre écoute pour répondre à toutes vos questions
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              className="bg-white text-[#F17C21] hover:bg-gray-100 font-semibold px-6 py-3"
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Send className="w-4 h-4 mr-2" />
              Nous écrire
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form - 2/3 width */}
            <div className="lg:col-span-2" id="contact-form">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-[#F17C21]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Envoyez-nous un message
                      </h2>
                      <p className="text-gray-600">
                        Nous vous répondrons dans les 24h
                      </p>
                    </div>
                  </div>

                  <form className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors"
                          placeholder="Jean Dupont"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-gray-200 transition-colors"
                          placeholder="jean@exemple.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-gray-200 transition-colors"
                          placeholder="+225 XX XX XX XX XX"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                          Sujet *
                        </label>
                        <select
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-gray-200 transition-colors"
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="adhesion">Demande d'adhésion</option>
                          <option value="information">
                            Demande d'information
                          </option>
                          <option value="partenariat">Partenariat</option>
                          <option value="service">Services & Conseil</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-gray-200 transition-colors resize-none"
                        placeholder="Décrivez votre demande en détail..."
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#F17C21] hover:bg-[#F17C21] text-white font-semibold px-6 py-6 text-base"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - 1/3 width */}
            <div className="space-y-6">
              {/* Informations supplémentaires */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-6 h-6 text-[#F17C21]" />
                    <h3 className="text-lg font-bold">Siège social</h3>
                  </div>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>
                      <strong className="text-gray-900">Adresse: </strong>
                      Résidence Fougère, Boulevard Mitterrand, Abidjan, Côte
                      d'Ivoire
                    </p>
                    <div className="pt-3 border-t">
                      <p className="mb-2">
                        <strong className="text-gray-900">Email:</strong>
                      </p>
                      <a
                        href="mailto:info@cpupme.ci"
                        className="text-[#F17C21] hover:underline"
                      >
                        info@cpupme.ci
                      </a>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="mb-2">
                        <strong className="text-gray-900">Téléphone:</strong>
                      </p>
                      <a
                        href="tel:+2252520008258"
                        className="text-[16px] text-black hover:underline"
                      >
                        +225 25 20 00 82 58
                      </a>
                      <br />
                      <a
                        href="tel:+2250707558846"
                        className="text-[16px] text-black hover:underline"
                      >
                        +225 07 07 55 88 46
                      </a>
                      <br />
                      <a
                        href="tel:+2250707061296"
                        className="text-[16px] text-black hover:underline"
                      >
                        +225 07 07 06 12 96
                      </a>
                      <br />
                      <a
                        href="tel:+2250173432414"
                        className="text-[16px] text-black hover:underline"
                      >
                        +225 01 73 43 24 14
                      </a>
                      <br />
                      <a
                        href="tel:+2250707910959"
                        className="text-[16px] text-black hover:underline"
                      >
                        +225 07 07 91 09 59
                      </a>
                    </div>
                    <div className="pt-3 border-t">
                      <p>
                        <strong className="text-gray-900">Horaires: </strong>
                      </p>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Lundi - Vendredi
                          </span>
                          <span className="font-semibold">08h00 - 17h00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-[#F17C21] px-4 py-2 rounded-full mb-4">
              <HelpCircle className="w-5 h-5" />
              <span className="font-semibold">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Questions fréquentes
            </h2>
            <p className="text-gray-600 text-lg">
              Trouvez rapidement des réponses à vos questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-gray-900 flex-1">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {openFaq === index && (
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <Button
              variant="outline"
              className="border-[#F17C21] text-[#F17C21] hover:bg-orange-50"
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contactez-nous directement
            </Button>
          </div>
        </div>
      </section>

      {/* Modal de Connexion */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-[450px]">
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
                  className="w-4 h-4 rounded border-gray-300 text-[#F17C21] focus:ring-orange-500"
                />
                <span className="text-gray-600">Se souvenir de moi</span>
              </label>
              <a
                href="#"
                className="text-[#F17C21] hover:text-orange-700 font-semibold"
              >
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton de connexion */}
            <Button
              type="submit"
              className="w-full bg-[#F17C21] hover:bg-orange-700 text-white font-semibold py-6 text-base"
            >
              Se connecter
            </Button>

            {/* Séparateur */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Pas encore membre ?
                </span>
              </div>
            </div>

            {/* Bouton d'inscription */}
            <Button
              type="button"
              variant="outline"
              className="w-full border-2 border-[#F17C21] text-[#F17C21] hover:bg-orange-50 font-semibold py-6 text-base"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Créer un compte
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
