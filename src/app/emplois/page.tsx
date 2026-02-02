"use client";

import { useState } from "react";
import {
  Mail,
  Briefcase,
  MapPin,
  Clock,
  Send,
  Building2,
  Users,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const jobOffers = [
  {
    id: 1,
    title: "Chargé(e) de Communication Digitale",
    department: "Communication",
    location: "Abidjan, Côte d'Ivoire",
    type: "CDI",
    experience: "2-3 ans",
    description:
      "Nous recherchons un(e) chargé(e) de communication digitale pour gérer nos réseaux sociaux, créer du contenu engageant et développer notre présence en ligne.",
    requirements: [
      "Diplôme en communication, marketing digital ou équivalent",
      "Expérience de 2-3 ans en communication digitale",
      "Maîtrise des outils de création graphique (Canva, Adobe Suite)",
      "Excellentes capacités rédactionnelles en français",
    ],
    posted: "2024-01-10",
  },
  {
    id: 2,
    title: "Responsable Partenariats & Relations Membres",
    department: "Développement",
    location: "Abidjan, Côte d'Ivoire",
    type: "CDI",
    experience: "3-5 ans",
    description:
      "Rejoignez notre équipe pour développer et entretenir les relations avec nos partenaires stratégiques et accompagner nos membres dans leur croissance.",
    requirements: [
      "Diplôme en gestion, commerce ou équivalent",
      "Expérience de 3-5 ans en développement commercial ou partenariats",
      "Excellentes compétences relationnelles et de négociation",
      "Connaissance de l'écosystème des PME ivoiriennes",
    ],
    posted: "2024-01-08",
  },
  {
    id: 3,
    title: "Assistant(e) Administratif(ve) et Financier(ère)",
    department: "Administration",
    location: "Abidjan, Côte d'Ivoire",
    type: "CDI",
    experience: "1-2 ans",
    description:
      "Nous cherchons un(e) assistant(e) polyvalent(e) pour appuyer notre équipe dans la gestion administrative et financière quotidienne.",
    requirements: [
      "BTS/Licence en gestion, comptabilité ou administration",
      "Expérience de 1-2 ans dans un poste similaire",
      "Maîtrise de Microsoft Office (Excel, Word)",
      "Rigueur, organisation et sens de la confidentialité",
    ],
    posted: "2024-01-05",
  },
];

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState<(typeof jobOffers)[0] | null>(
    null
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-[80vh] h-[400px] md:h-[500px] lg:h-[550px]">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/logo.png"
            alt="Confédération Patronale Unique des PME de Côte d'Ivoire"
            className="w-full h-full object-cover min-h-full"
            style={{ minHeight: '100%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        </div>

        {/* CONTENU */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full px-4 text-center text-white bg-transparent">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in drop-shadow-md">
            Offres d&apos;emploi CPU-PME
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-fade-in drop-shadow">
            Rejoignez une équipe dynamique au service du développement des PME
            ivoiriennes
          </p>
          <p className="text-lg italic text-white/80">
            &quot;L&apos;écosystème intégré au service des PME&quot;
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-3 p-4">
              <Briefcase className="h-10 w-10 text-[#F08223]" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {jobOffers.length}
                </p>
                <p className="text-muted-foreground">Postes ouverts</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4">
              <Building2 className="h-10 w-10 text-success" />
              <div>
                <p className="text-2xl font-bold text-foreground">Abidjan</p>
                <p className="text-muted-foreground">Localisation</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4">
              <Users className="h-10 w-10 text-[#F08223]" />
              <div>
                <p className="text-2xl font-bold text-foreground">20+</p>
                <p className="text-muted-foreground">Collaborateurs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Job Listings */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Postes disponibles
              </h2>

              {jobOffers.map((job) => (
                <Card
                  key={job.id}
                  className={`cursor-pointer transition-all hover:shadow-lg bg-white shadow-md border-0 ${
                    selectedJob?.id === job.id ? "ring-2 ring-[#F08223]" : ""
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-xl text-foreground">
                          {job.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {job.department}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-success text-white"
                      >
                        {job.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        Publié le{" "}
                        {new Date(job.posted).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Selected Job Details */}
              {selectedJob && (
                <Card className="sticky top-24 bg-white shadow-lg border-0">
                  <CardHeader className="bg-[#F08223]/5">
                    <CardTitle className="text-lg text-foreground">
                      {selectedJob.title}
                    </CardTitle>
                    <CardDescription>{selectedJob.department}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-muted-foreground mb-4">
                      {selectedJob.description}
                    </p>

                    <Separator className="my-4" />

                    <h4 className="font-semibold text-foreground mb-2">
                      Profil recherché :
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-success mt-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full bg-[#F08223] hover:bg-[#F08223]/90 text-white rounded-sm cursor-pointer"
                      onClick={() =>
                        (window.location.href = `mailto:rh@cpupme.ci?subject=Candidature: ${selectedJob.title}`)
                      }
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Postuler maintenant
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Contact Card */}
              <Card className="bg-gradient-to-br from-success/10 to-[#F08223]/5 shadow-md border-0">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">
                    Candidature spontanée
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Aucune offre ne correspond à votre profil ? Envoyez-nous
                    votre candidature spontanée !
                  </p>
                  <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                    <Mail className="h-5 w-5 text-[#F08223]" />
                    <a
                      href="mailto:rh@cpupme.ci"
                      className="text-success hover:underline font-medium"
                    >
                      rh@cpupme.ci
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Why Join Us */}
              <Card className="bg-white shadow-md border-0">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">
                    Pourquoi nous rejoindre ?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-success font-bold">1</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Impact direct sur le développement des PME ivoiriennes
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#F08223]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#F08223] font-bold">2</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Environnement de travail dynamique et collaboratif
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-success font-bold">3</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Opportunités de formation et d&apos;évolution
                      professionnelle
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;
