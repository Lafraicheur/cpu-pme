// app/secteur/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// =========================================================
// 1. IMPORTATION DES DONNÉES ET DÉFINITION DES TYPES MIS À JOUR
// =========================================================
import { secteursData } from "./data";

// Les types doivent correspondre à ceux définis dans data.ts
interface TagSection {
  titre: string;
  tags: string[];
}
interface SousCategorieDetail {
  nom: string;
  sectionsDeTags: TagSection[];
}
interface Filiere {
  id: string;
  nom: string;
  sousCategories: SousCategorieDetail[];
}
interface SecteurData {
  id: "primaire" | "secondaire" | "tertiaire" | "transversales";
  nom: string;
  titreComplet: string;
  filieres: Filiere[];
}

type SecteurKey = keyof typeof secteursData;

export default function Secteurs() {
  const [activeSecteur, setActiveSecteur] = useState<SecteurKey>("primaire");

  const secteurActif: SecteurData = secteursData[activeSecteur];

  // =========================================================
  // 2. FONCTION DE RENDU ADAPTÉE AU MODÈLE DE L'IMAGE
  // Affiche un titre (ex: Cultures Vivrières) suivi des tags
  // =========================================================
  const renderFiliereContent = (filiere: Filiere) => {
    return (
      <Accordion type="single" collapsible className="w-full">
        {/* MAP sur les SousCatégories (ex: Production Végétale) */}
        {filiere.sousCategories.map((sousCat, index) => (
          <AccordionItem
            key={index}
            value={`${filiere.id}-${index}`}
            className="border-b border-gray-200"
          >
            {/* Le Trigger affiche le nom de la SousCatégorie (ex: Production Végétale) */}
            <AccordionTrigger className="text-left px-6 py-4 font-inter text-lg font-semibold text-[var(--color-neutral-dark)] hover:no-underline">
              {sousCat.nom}
            </AccordionTrigger>

            {/* Le contenu affiche toutes les sections de tags (ex: Cultures Vivrières, Cultures de Rente) */}
            <AccordionContent>
              <div className="p-6 pt-0">
                {/* MAP sur les sections de tags (Niveau 3) */}
                {sousCat.sectionsDeTags.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-6">
                    {/* Le titre de la section (ex: Cultures Vivrières) */}
                    <h4 className="font-inter text-lg font-semibold text-[var(--color-neutral-dark)] mb-3 border-l-4 border-green-500 pl-3">
                      {section.titre}
                    </h4>

                    {/* Les tags réels (Niveau 4) */}
                    <div className="flex flex-wrap gap-2">
                      {section.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          // --- CLASSE MODIFIÉE POUR UN DESIGN PLUS PRO ET THÉMATIQUE ---
                          // J'utilise le vert pour les tags, couleur souvent associée au secteur primaire/naturel.
                          className="
                                px-4 py-1 text-sm font-medium 
                                text-green-700 bg-green-50 
                                border border-green-300 rounded-full 
                                hover:bg-green-100 transition-colors
                                whitespace-nowrap
                            "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  // Fonction pour rendre le contenu de l'onglet complet
  const renderTabContent = (secteurKey: SecteurKey) => {
    const secteur = secteursData[secteurKey];

    return (
      <TabsContent value={secteurKey}>
        {secteur.filieres.map((filiere) => (
          <div
            key={filiere.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-10"
          >
            {/* En-tête de la filière (ex: Filière Agriculture & Agroalimentaire) */}
            <div className="bg-[#F2F2F2] px-6 py-4">
              <h3 className="font-inter text-xl font-semibold text-[var(--color-primary)]">
                {filiere.nom}
              </h3>
            </div>

            {/* Contenu généré par l'Accordion à deux niveaux (avec titres + tags) */}
            {renderFiliereContent(filiere)}
          </div>
        ))}
      </TabsContent>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-64 sm:h-96 md:h-[500px] lg:h-[550px] flex items-center justify-center overflow-hidden">
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
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Secteurs & Filières
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-fade-in">
            Découvrez la classification sectorielle des PME en Côte d'Ivoire
          </p>
        </div>
      </section>

      {/* Titre de Classification */}
      <section className="bg-white py-8 sm:py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h2 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold text-[#221F1F] text-center">
            Classification Sectorielle des PME en Côte d'Ivoire
          </h2>
        </div>
      </section>

      {/* Navigation par Onglets */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* <div className="rounded-xl p-2 w-full mb-8"> */}
            <Tabs
              value={activeSecteur}
              onValueChange={setActiveSecteur as (value: string) => void}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto md:h-14 gap-3 md:gap-4 bg-transparent p-0 mb-8">
                {Object.keys(secteursData).map((key) => {
                  const secteur = secteursData[key as SecteurKey];
                  return (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="
                        text-sm md:text-base py-3.5 px-6 rounded-lg font-semibold transition-all duration-300 border-2 border-gray-200 bg-white hover:border-[var(--color-primary)] hover:shadow-md data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-white data-[state=active]:border-[var(--color-primary)] data-[state=active]:shadow-lg
                      "
                    >
                      {secteur.nom}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          {/* </div> */}
        </div>
      </section>

      {/* Bannière du Secteur Actif */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 ">
          <div className="bg-gradient-to-r from-[#F27A20] via-[#A8892A] to-[#009739] py-6 rounded-xl">
            <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-white uppercase text-center">
              {secteurActif.titreComplet}
            </h2>
          </div>
        </div>
      </section>

      {/* CONTENU PRINCIPAL DES ONGLETS */}
      <section className="py-12 sm:py-16 bg-[var(--color-bg)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <Tabs
            value={activeSecteur}
            onValueChange={setActiveSecteur as (value: string) => void}
          >
            {renderTabContent("primaire")}
            {renderTabContent("secondaire")}
            {renderTabContent("tertiaire")}
            {renderTabContent("transversales")}
          </Tabs>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-50/30 to-blue-50/40">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-neutral-dark)] mb-4">
            Votre secteur n'est pas représenté ?
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de l'intégration de votre secteur
            d'activité dans notre réseau
          </p>
          <Link href="/contact" passHref>
            <Button
              className="text-white hover:opacity-90"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Nous contacter
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
