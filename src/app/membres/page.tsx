"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Building2, 
  Search, 
  Award, 
  Handshake, 
  GraduationCap, 
  Wallet, 
  Megaphone, 
  ShoppingBag, 
  Headphones,
  Check,
  MapPin,
  Globe,
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { membersData, sectors, regions, membershipBenefits, membershipPlans, Member } from "./data";
import { useToast } from "@/components/ui/use-toast";

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const filteredMembers = membersData.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "all" || member.sector === selectedSector;
    const matchesRegion = selectedRegion === "all" || member.region === selectedRegion;
    return matchesSearch && matchesSector && matchesRegion;
  });

  const featuredMembers = membersData.filter(m => m.featured);

  useEffect(() => {
    if (featuredMembers.length === 0) return;

    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredMembers.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [featuredMembers.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande envoyée !",
      description: "Nous avons bien reçu votre demande d'adhésion. Notre équipe vous contactera sous 48h.",
    });
  };

  const getBenefitIcon = (icon: string) => {
    switch (icon) {
      case "network": return <Handshake className="h-8 w-8 text-cpu-orange" />;
      case "training": return <GraduationCap className="h-8 w-8 text-cpu-orange" />;
      case "finance": return <Wallet className="h-8 w-8 text-cpu-orange" />;
      case "advocacy": return <Megaphone className="h-8 w-8 text-cpu-orange" />;
      case "marketplace": return <ShoppingBag className="h-8 w-8 text-cpu-orange" />;
      case "support": return <Headphones className="h-8 w-8 text-cpu-orange" />;
      default: return <Award className="h-8 w-8 text-cpu-orange" />;
    }
  };

  const getSectorColor = (sector: string) => {
    const sectorColors: { [key: string]: string } = {
      "Agriculture & Agroalimentaire": "from-amber-500 to-amber-700",
      "BTP & Construction": "from-orange-500 to-orange-700",
      "Commerce & Distribution": "from-blue-500 to-blue-700",
      "Industrie & Transformation": "from-slate-600 to-slate-800",
      "Services & Conseil": "from-indigo-500 to-indigo-700",
      "Technologie & Digital": "from-purple-500 to-purple-700",
      "Transport & Logistique": "from-red-500 to-red-700",
      "Tourisme & Hôtellerie": "from-teal-500 to-teal-700",
      "Santé & Pharmaceutique": "from-green-500 to-green-700",
      "Énergie & Environnement": "from-lime-500 to-lime-700",
    };
    return sectorColors[sector] || "from-gray-500 to-gray-700";
  };

  const handleImageError = (memberId: string) => {
    setFailedImages((prev) => new Set(prev).add(memberId));
  };

  const shouldShowImage = (memberId: string) => {
    return !failedImages.has(memberId);
  };

  return (
    <div className="flex flex-col">
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
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Nos Membres
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-fade-in">
             Rejoignez la plus grande communauté d'entrepreneurs et de PME de Côte d'Ivoire
          </p>
        </div>
      </section>


      {/* Main Content */}
      <section className="bg-white border-b border-gray-200 pt-20 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <Tabs defaultValue="annuaire" className="w-full">
            <div className="flex justify-center mb-12">
              <div className="w-full max-w-3xl">
               <TabsList className="w-full h-auto bg-transparent border-0 flex gap-4 justify-start">
          
                  <TabsTrigger value="annuaire" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Annuaire
                  </TabsTrigger>
                  <TabsTrigger value="avantages" className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Avantages
                  </TabsTrigger>
                  <TabsTrigger value="adhesion" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Adhérer
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            {/* Annuaire Tab */}
            <TabsContent value="annuaire" className="mt-8">
              {/* Featured Members Section */}
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1 h-10 bg-cpu-orange rounded-full"></div>
                  <h2 className="text-3xl font-bold text-[#221F1F]">Membres à la Une</h2>
                </div>
                {featuredMembers.length > 0 ? (
                  <div className="relative">
                    <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                      <div className={`flex gap-6 ${featuredIndex % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                        <div className="flex-shrink-0 bg-[#f0f4f8] rounded-lg w-64 h-48 flex items-center justify-center overflow-hidden relative">
                          {shouldShowImage(featuredMembers[featuredIndex].id) && featuredMembers[featuredIndex].logoUrl ? (
                            <Image
                              src={featuredMembers[featuredIndex].logoUrl!}
                              alt={featuredMembers[featuredIndex].name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 256px"
                              onError={() => handleImageError(featuredMembers[featuredIndex].id)}
                            />
                          ) : (
                            <div className={`absolute inset-0 bg-gradient-to-br ${getSectorColor(featuredMembers[featuredIndex].sector)} flex items-center justify-center`}>
                              <div className="text-center text-white px-4">
                                <p className="text-sm font-semibold line-clamp-2">{featuredMembers[featuredIndex].name}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className="bg-cpu-orange text-white">À la une</Badge>
                              <Badge variant="outline">{featuredMembers[featuredIndex].sector}</Badge>
                            </div>
                            <h3 className="text-2xl font-bold text-[#221F1F] mb-3">{featuredMembers[featuredIndex].name}</h3>
                            <p className="text-[#6F6F6F] text-base leading-relaxed mb-4">{featuredMembers[featuredIndex].description}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="flex items-center text-sm text-[#6F6F6F]">
                              <MapPin className="h-4 w-4 mr-2" />
                              {featuredMembers[featuredIndex].region}
                            </span>
                            {featuredMembers[featuredIndex].website && (
                              <Button variant="outline" size="sm" className="text-cpu-orange border-cpu-orange hover:border-cpu-orange hover:bg-cpu-orange hover:text-white active:bg-cpu-orange active:text-white transition-all">
                                Voir le site
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={() => setFeaturedIndex((prev) => (prev - 1 + featuredMembers.length) % featuredMembers.length)}
                      className="absolute -left-14 top-1/2 transform -translate-y-1/2 bg-cpu-orange text-white p-2 rounded-full hover:bg-orange-700 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setFeaturedIndex((prev) => (prev + 1) % featuredMembers.length)}
                      className="absolute -right-14 top-1/2 transform -translate-y-1/2 bg-cpu-orange text-white p-2 rounded-full hover:bg-orange-700 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                      {featuredMembers.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setFeaturedIndex(idx)}
                          className={`h-2 rounded-full transition-all ${
                            idx === featuredIndex ? 'bg-cpu-orange w-6' : 'bg-gray-300 w-2'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Aucun membre à la une pour le moment.</p>
                )}
              </div>

              {/* Search and Filters Bar */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher un membre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-gray-300"
                      />
                    </div>
                  </div>
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange focus:border-cpu-orange">
                      <SelectValue placeholder="Secteur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les secteurs</SelectItem>
                      {sectors.map((sector) => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange focus:border-cpu-orange">
                      <SelectValue placeholder="Région" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les régions</SelectItem>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* All Members Grid */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-[#221F1F]">Tous les Membres</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="member-card border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white flex flex-col"
                    >
                      {/* Card Image/Icon Area */}
                      <div className="member-image bg-gradient-to-br from-[#f0f4f8] to-[#e8ecf1] h-40 flex items-center justify-center border-b border-gray-200 overflow-hidden relative">
                        {shouldShowImage(member.id) && member.logoUrl ? (
                          <Image
                            src={member.logoUrl}
                            alt={member.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            onError={() => handleImageError(member.id)}
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${getSectorColor(member.sector)} flex items-center justify-center p-4`}>
                            <div className="text-center text-white">
                              <p className="text-sm font-semibold line-clamp-2">{member.name}</p>
                              <p className="text-xs opacity-90 mt-1">{member.sector}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="mb-3 flex gap-2">
                          {member.featured && (
                            <Badge className="bg-cpu-green text-white">Actif</Badge>
                          )}
                          <Badge variant="outline" className="text-xs">{member.sector}</Badge>
                        </div>

                        <h3 className="text-lg font-bold text-[#221F1F] mb-2 line-clamp-2">{member.name}</h3>

                        <p className="text-sm text-[#6F6F6F] mb-4 flex-1 line-clamp-3">{member.description}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="flex items-center text-xs text-[#6F6F6F]">
                            <MapPin className="h-3 w-3 mr-1" />
                            {member.region}
                          </span>
                          {member.website && (
                            <Button variant="ghost" size="sm" className="text-cpu-orange border border-transparent hover:border-cpu-orange hover:text-cpu-orange hover:bg-orange-50 active:bg-cpu-orange active:text-white active:border-cpu-orange transition-all">
                              <Globe className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredMembers.length === 0 && (
                  <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Aucun membre trouvé avec ces critères</p>
                  </div>
                )}

                <div className="text-center mt-12">
                  <p className="text-[#6F6F6F]">
                    Plus de <span className="font-bold text-cpu-orange">1000 entreprises</span> nous font confiance
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Avantages Tab */}
            <TabsContent value="avantages" className="mt-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-[#221F1F]">Pourquoi rejoindre CPU-PME.CI ?</h2>
                <p className="text-cpu-darkgray max-w-2xl mx-auto">
                  En devenant membre, vous bénéficiez d'un ensemble complet de services et d'avantages 
                  pour développer votre entreprise
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {membershipBenefits.map((benefit, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow bg-white">
                    <div className="mx-auto bg-cpu-orange/10 p-4 rounded-full w-fit mb-4">
                      {getBenefitIcon(benefit.icon)}
                    </div>
                    <h3 className="text-lg font-semibold text-[#221F1F] mb-2">{benefit.title}</h3>
                    <p className="text-cpu-darkgray text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>

              {/* Pricing Plans */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-[#221F1F]">Nos Formules d'Adhésion</h2>
                  <p className="text-cpu-darkgray">
                    Choisissez la formule qui correspond le mieux à vos besoins
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                  {membershipPlans.map((plan, index) => (
                    <div
                      key={index} 
                      className={`relative border rounded-lg overflow-visible transition-all ${
                        plan.recommended 
                          ? 'border-cpu-orange shadow-lg scale-105 bg-white md:scale-110' 
                          : 'border-gray-200 shadow-sm hover:shadow-md bg-white'
                      }`}
                    >
                      {plan.recommended && (
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                          <Badge className="bg-cpu-orange text-white px-4 py-1.5 shadow-md">
                            Recommandé
                          </Badge>
                        </div>
                      )}
                      
                      <div className="p-8 flex flex-col h-full">
                        <h3 className="text-xl font-bold text-[#221F1F] mb-2 mt-1">{plan.name}</h3>
                        <p className="text-cpu-darkgray text-sm mb-6">{plan.description}</p>
                        
                        <div className="mb-6 py-5 border-t border-b border-gray-200">
                          <p className="text-3xl font-bold text-cpu-orange mb-1">
                            {plan.price.toLocaleString('fr-FR')} FCFA
                          </p>
                          <p className="text-sm text-cpu-darkgray">par an</p>
                        </div>

                        <ul className="space-y-3 mb-6 flex-1">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Check className="h-5 w-5 text-cpu-green flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-[#221F1F]">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button 
                          className={`w-full py-3 font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 pricing-button ${
                            plan.recommended
                              ? 'bg-cpu-orange text-white hover:bg-orange-700 hover:border-orange-700 active:bg-orange-800 focus:ring-cpu-orange'
                              : 'border border-cpu-orange text-cpu-orange bg-white hover:bg-cpu-orange hover:text-white active:bg-cpu-orange active:text-white focus:ring-cpu-orange'
                          }`}
                        >
                          Choisir cette formule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Adhesion Tab */}
            <TabsContent value="adhesion" className="mt-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-[#221F1F]">Demande d'Adhésion</h2>
                  <p className="text-cpu-darkgray">
                    Remplissez le formulaire ci-dessous pour rejoindre notre confédération. 
                    Notre équipe vous contactera dans les 48 heures.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg shadow-sm bg-white">
                  <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company Info */}
                        <div className="md:col-span-2">
                          <h3 className="text-lg font-semibold mb-4 text-cpu-green flex items-center">
                            <Building2 className="h-5 w-5 mr-2" />
                            Informations sur l'entreprise
                          </h3>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                          <Input id="companyName" placeholder="Ex: Ma Société SARL" required className="border-gray-300" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="sector">Secteur d'activité *</Label>
                          <Select required>
                            <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange focus:border-cpu-orange">
                              <SelectValue placeholder="Sélectionnez un secteur" />
                            </SelectTrigger>
                            <SelectContent>
                              {sectors.map((sector) => (
                                <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="region">Région *</Label>
                          <Select required>
                            <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange focus:border-cpu-orange">
                              <SelectValue placeholder="Sélectionnez une région" />
                            </SelectTrigger>
                            <SelectContent>
                              {regions.map((region) => (
                                <SelectItem key={region} value={region}>{region}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="employees">Nombre d'employés</Label>
                          <Select>
                            <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange focus:border-cpu-orange">
                              <SelectValue placeholder="Sélectionnez" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-10">1 - 10 employés</SelectItem>
                              <SelectItem value="11-50">11 - 50 employés</SelectItem>
                              <SelectItem value="51-100">51 - 100 employés</SelectItem>
                              <SelectItem value="100+">Plus de 100 employés</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Contact Info */}
                        <div className="md:col-span-2 pt-6 border-t border-gray-200">
                          <h3 className="text-lg font-semibold mb-4 text-cpu-orange flex items-center">
                            <Users className="h-5 w-5 mr-2" />
                            Informations de contact
                          </h3>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contactName">Nom du représentant *</Label>
                          <Input id="contactName" placeholder="Prénom et Nom" required className="border-gray-300" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="position">Fonction</Label>
                          <Input id="position" placeholder="Ex: Directeur Général" className="border-gray-300" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email professionnel *</Label>
                          <Input id="email" type="email" placeholder="email@entreprise.ci" required className="border-gray-300" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone *</Label>
                          <Input id="phone" type="tel" placeholder="+225 XX XX XX XX XX" required className="border-gray-300" />
                        </div>

                        {/* Membership Plan */}
                        <div className="md:col-span-2 pt-6 border-t border-gray-200">
                          <h3 className="text-lg font-semibold mb-4 text-cpu-green flex items-center">
                            <Award className="h-5 w-5 mr-2" />
                            Formule souhaitée
                          </h3>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="plan">Formule souhaitée *</Label>
                          <Select required>
                            <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange focus:border-cpu-orange">
                              <SelectValue placeholder="Choisissez une formule" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="starter">Starter - 50 000 FCFA/an</SelectItem>
                              <SelectItem value="business">Business - 150 000 FCFA/an (Recommandé)</SelectItem>
                              <SelectItem value="premium">Premium - 300 000 FCFA/an</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="message">Message ou informations complémentaires</Label>
                          <Textarea 
                            id="message" 
                            placeholder="Décrivez brièvement votre entreprise et vos attentes..."
                            className="min-h-[120px] border-gray-300"
                          />
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-200">
                        <Button type="submit" className="w-full bg-cpu-orange hover:bg-orange-700 active:bg-orange-800 text-white py-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cpu-orange transition-all">
                          Soumettre ma demande d'adhésion
                        </Button>
                        <p className="text-center text-xs text-cpu-darkgray mt-4">
                          En soumettant ce formulaire, vous acceptez nos conditions générales d'adhésion.
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Members;
