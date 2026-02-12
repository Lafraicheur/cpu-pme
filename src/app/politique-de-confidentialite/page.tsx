"use client";

import { Shield, FileText, Download } from "lucide-react";
import Link from "next/link";
import { DynamicHeroBanner } from "@/components/DynamicHeroBanner";
import { Button } from "@/components/ui/button";
import { useCookieConsentContext } from "@/components/cookie";

export default function PolitiqueDeConfidentialite() {
  const { resetConsent } = useCookieConsentContext();

  return (
    <>
      <DynamicHeroBanner
        position="privacy"
        title="Politique de Confidentialité & Cookies"
        subtitle="Découvrez comment CPU-PME protège vos données personnelles et utilise les cookies sur le HUB"
        minHeight="h-48 sm:h-56 md:h-64"
      />

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          {/* En-tête + lien PDF */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#F08223]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Politique de Confidentialité & Cookies
              </h2>
            </div>
            <a
              href="/Politique%20de%20confidentialit%C3%A9%20et%20cookies.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#F08223] hover:text-[#d46f1a] transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Télécharger le PDF
            </a>
          </div>

          <div className="prose prose-gray max-w-none space-y-10">

            {/* ===== PARTIE 1 : Politique de Confidentialité ===== */}
            <div>
              <h3 className="text-xl font-bold text-[#221F1F] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#F08223] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Politique de Confidentialité
              </h3>

              {/* Introduction */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Introduction</h4>
                <p className="text-gray-600 leading-relaxed">
                  La Confédération Patronale Unique des PME de Côte d&apos;Ivoire (CPU-PME)
                  s&apos;engage à assurer la protection, la confidentialité et la sécurité des données
                  personnelles des utilisateurs du CPU-PME HUB. Cette politique détaille nos pratiques.
                </p>
              </div>

              {/* A. Responsabilité et Transparence */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  A. Responsabilité et Transparence
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Le traitement des données sur cpupme.ci est guidé par les principes de licéité, de loyauté
                  et de transparence. Nous collectons uniquement les données strictement nécessaires aux
                  finalités institutionnelles du HUB.
                </p>
              </div>

              {/* B. Données collectées et Finalités */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  B. Données collectées et Finalités
                </h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#F08223] rounded-full mt-2 shrink-0" />
                    <div>
                      <strong>Identification :</strong> Informations sur l&apos;entreprise (RCCM), coordonnées
                      professionnelles et données d&apos;identité des représentants.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#F08223] rounded-full mt-2 shrink-0" />
                    <div>
                      <strong>Usage :</strong> Ces données servent exclusivement à l&apos;inscription des membres,
                      à l&apos;accès aux services du HUB, à l&apos;accompagnement des PME et aux échanges institutionnels.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#F08223] rounded-full mt-2 shrink-0" />
                    <div>
                      <strong>Sécurité :</strong> Nous collectons des données de connexion pour garantir la
                      traçabilité et la sécurité des accès.
                    </div>
                  </li>
                </ul>
              </div>

              {/* C. Sécurité et Hébergement */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  C. Sécurité et Hébergement
                </h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#F08223] rounded-full mt-2 shrink-0" />
                    <div>
                      <strong>Protection technique :</strong> Nous utilisons le chiffrement des communications,
                      la sécurisation des API et un contrôle d&apos;accès rigoureux pour prévenir le vol ou la fuite de données.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#F08223] rounded-full mt-2 shrink-0" />
                    <div>
                      <strong>Souveraineté :</strong> Vos données sont hébergées sur une infrastructure sécurisée
                      (WHC), conçue pour répondre aux exigences de souveraineté numérique des autorités compétentes.
                    </div>
                  </li>
                </ul>
              </div>

              {/* D. Vos Droits et Non-commercialisation */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  D. Vos Droits et Non-commercialisation
                </h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#F08223] rounded-full mt-2 shrink-0" />
                    <div>
                      <strong>Éthique :</strong> Vos données ne sont jamais vendues, louées ou cédées à des tiers
                      à des fins commerciales.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#F08223] rounded-full mt-2 shrink-0" />
                    <div>
                      <strong>Contrôle :</strong> Vous disposez d&apos;un droit d&apos;accès, de rectification et de
                      suppression de vos données. Pour toute demande :{" "}
                      <a href="mailto:info@cpupme.ci" className="text-[#F08223] hover:underline">
                        info@cpupme.ci
                      </a>.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Séparateur */}
            <div className="border-t border-gray-200" />

            {/* ===== PARTIE 2 : Politique de Cookies ===== */}
            <div>
              <h3 className="text-xl font-bold text-[#221F1F] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#F08223] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Politique de Cookies
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                Pour garantir une expérience sécurisée et fluide, le CPU-PME HUB utilise
                différents types de cookies :
              </p>

              {/* Cookie types */}
              <div className="space-y-4 mb-6">
                {/* 1. Cookies Techniques */}
                <div className="rounded-lg border border-gray-200 p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    1. Cookies Techniques et de Session
                    <span className="ml-2 text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      Strictement nécessaires
                    </span>
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1 mt-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#F08223] mt-0.5">•</span>
                      Permettent de maintenir votre connexion active lors de la navigation entre les différents modules du HUB.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F08223] mt-0.5">•</span>
                      Indispensables pour la gestion des authentifications.
                    </li>
                  </ul>
                </div>

                {/* 2. Cookies de Sécurité */}
                <div className="rounded-lg border border-gray-200 p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    2. Cookies de Sécurité
                    <span className="ml-2 text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      Strictement nécessaires
                    </span>
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1 mt-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#F08223] mt-0.5">•</span>
                      Utilisés pour prévenir les fraudes informatiques et protéger vos données contre les accès non autorisés (protection CSRF).
                    </li>
                  </ul>
                </div>

                {/* 3. Cookies de Performance */}
                <div className="rounded-lg border border-gray-200 p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    3. Cookies de Performance
                    <span className="ml-2 text-xs font-medium bg-[#F08223]/10 text-[#F08223] px-2 py-0.5 rounded-full">
                      Optionnels
                    </span>
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1 mt-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#F08223] mt-0.5">•</span>
                      Nous permettent d&apos;analyser l&apos;utilisation de la plateforme pour améliorer continuellement nos services.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Gestion des préférences */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Gestion de vos préférences
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Vous pouvez configurer votre navigateur pour bloquer les cookies, mais cela pourrait
                  limiter l&apos;accès à certaines fonctionnalités essentielles du HUB. Un bandeau de
                  consentement s&apos;affiche lors de votre première visite pour vous permettre de définir vos choix.
                </p>
                <Button
                  onClick={resetConsent}
                  variant="outline"
                  className="border-[#F08223] text-[#F08223] hover:bg-[#F08223] hover:text-white"
                >
                  Gérer mes préférences cookies
                </Button>
              </div>
            </div>

            {/* Footer de la page */}
            <div className="border-t border-gray-200 pt-6 mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-gray-400">
                Dernière mise à jour : Février 2026
              </p>
              <p className="text-sm text-gray-400">
                Contact :{" "}
                <a href="mailto:info@cpupme.ci" className="text-[#F08223] hover:underline">
                  info@cpupme.ci
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
