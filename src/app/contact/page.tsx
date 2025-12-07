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
} from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Comment devenir membre de la CPU-PME.CI ?",
      answer:
        "Pour devenir membre, vous devez remplir le formulaire d'adhésion disponible sur notre plateforme et fournir les documents requis (extrait de registre de commerce, attestation fiscale, etc.). Notre équipe vous contactera dans les 48h pour finaliser votre inscription.",
    },
    {
      question: "Quels sont les avantages de l'adhésion ?",
      answer:
        "Les membres bénéficient d'un accès privilégié aux formations, opportunités d'affaires, financements, représentation auprès des institutions, networking et bien plus encore.",
    },
    {
      question: "Quel est le coût de l'adhésion ?",
      answer:
        "Les frais d'adhésion varient selon la taille de votre entreprise. Contactez-nous pour obtenir un devis personnalisé adapté à votre structure.",
    },
    {
      question: "Proposez-vous des services de conseil ?",
      answer:
        "Oui, nous offrons des services de conseil en stratégie d'entreprise, accès au financement, développement commercial et conformité réglementaire.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Contactez-nous
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto text-white/90">
            Notre équipe est à votre écoute pour répondre à toutes vos questions
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-6 py-3"
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

      {/* Contact Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20 relative z-20">
            {/* Email Card */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Email</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Envoyez-nous un email
                </p>
                <a
                  href="mailto:contact@cpu-pme.ci"
                  className="text-orange-600 font-semibold hover:underline"
                >
                  contact@cpu-pme.ci
                </a>
              </CardContent>
            </Card>

            {/* Phone Card */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Téléphone</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Appelez-nous directement
                </p>
                <a
                  href="tel:+22527123456"
                  className="text-green-600 font-semibold hover:underline"
                >
                  +225 27 12 34 56 78
                </a>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Adresse</h3>
                <p className="text-gray-600 text-sm mb-3">Visitez notre siège</p>
                <p className="text-blue-600 font-semibold">
                  Abidjan, Plateau
                  <br />
                  Côte d'Ivoire
                </p>
              </CardContent>
            </Card>
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
                      <MessageSquare className="w-6 h-6 text-orange-600" />
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
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
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
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
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
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="+225 XX XX XX XX XX"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                          Entreprise
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Sujet *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
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

                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors resize-none"
                        placeholder="Décrivez votre demande en détail..."
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-6 text-base"
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
              {/* Horaires */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-orange-600" />
                    <h3 className="text-lg font-bold">Horaires d'ouverture</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lundi - Vendredi</span>
                      <span className="font-semibold">08:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Samedi</span>
                      <span className="font-semibold">09:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimanche</span>
                      <span className="font-semibold text-red-600">Fermé</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informations supplémentaires */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-6 h-6 text-orange-600" />
                    <h3 className="text-lg font-bold">Siège social</h3>
                  </div>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>
                      <strong className="text-gray-900">Adresse:</strong>
                      <br />
                      Rue de la République
                      <br />
                      Plateau, Abidjan
                      <br />
                      Côte d'Ivoire
                    </p>
                    <div className="pt-3 border-t">
                      <p className="mb-2">
                        <strong className="text-gray-900">Email:</strong>
                      </p>
                      <a
                        href="mailto:contact@cpu-pme.ci"
                        className="text-orange-600 hover:underline"
                      >
                        contact@cpu-pme.ci
                      </a>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="mb-2">
                        <strong className="text-gray-900">Téléphone:</strong>
                      </p>
                      <a
                        href="tel:+22527123456"
                        className="text-orange-600 hover:underline"
                      >
                        +225 27 12 34 56 78
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Adhésion */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600">
                <CardContent className="p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Vous êtes membre ?</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Accédez à votre espace membre pour bénéficier de tous vos
                    avantages
                  </p>
                  <Button className="w-full bg-white text-orange-600 hover:bg-gray-100 font-semibold">
                    Connexion membre
                  </Button>
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
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4">
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
              className="border-orange-600 text-orange-600 hover:bg-orange-50"
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
    </>
  );
}
