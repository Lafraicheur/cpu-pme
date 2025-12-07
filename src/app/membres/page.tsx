"use client";

import { useState } from "react";
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
  Star
} from "lucide-react";
import { membersData, sectors, regions, membershipBenefits, membershipPlans, Member } from "./data";
import { useToast } from "@/components/ui/use-toast";

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const { toast } = useToast();

  const filteredMembers = membersData.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "all" || member.sector === selectedSector;
    const matchesRegion = selectedRegion === "all" || member.region === selectedRegion;
    return matchesSearch && matchesSector && matchesRegion;
  });

  const featuredMembers = membersData.filter(m => m.featured);

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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="h-[240px] flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(to right, #199d4e, #f08223)',
        }}
      >
        <div className="max-w-[1400px] mx-auto w-full px-4 text-white text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">Nos Membres</h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-95">
              Rejoignez la plus grande communauté d'entrepreneurs et de PME de Côte d'Ivoire
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-20 pb-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <Tabs defaultValue="annuaire" className="w-full">
            <div className="flex justify-center mb-12">
              <div className="w-full max-w-3xl">
                <TabsList className="inline-flex items-center w-full bg-[#eef6fb] rounded-full p-1 shadow-sm gap-2">
                  <TabsTrigger
                    value="annuaire"
                    className="flex items-center gap-2 px-6 py-3 text-base font-medium text-[#5A6A7A] rounded-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md transition-all"
                  >
                    <Users className="h-4 w-4" />
                    Annuaire
                  </TabsTrigger>
                  <TabsTrigger
                    value="avantages"
                    className="flex items-center gap-2 px-6 py-3 text-base font-medium text-[#5A6A7A] rounded-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md transition-all"
                  >
                    <Award className="h-4 w-4" />
                    Avantages
                  </TabsTrigger>
                  <TabsTrigger
                    value="adhesion"
                    className="flex items-center gap-2 px-6 py-3 text-base font-medium text-[#5A6A7A] rounded-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md transition-all"
                  >
                    <Building2 className="h-4 w-4" />
                    Adhérer
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            {/* Annuaire Tab */}
            <TabsContent value="annuaire" className="mt-4">
              {/* Featured Members */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Star className="h-6 w-6 text-cpu-orange mr-2" />
                  Membres à la Une
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredMembers.slice(0, 3).map((member) => (
                    <Card key={member.id} className="shadow-md hover:shadow-xl transition-shadow border-0]">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="bg-cpu-orange/10 p-3 rounded-lg">
                            <Building2 className="h-8 w-8 text-cpu-orange" />
                          </div>
                          <Badge className="bg-cpu-orange text-white">Premium</Badge>
                        </div>
                        <CardTitle className="text-xl mt-4">{member.name}</CardTitle>
                        <CardDescription className="flex items-center gap-4 text-sm">
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {member.region}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge variant="outline" className="mb-3">{member.sector}</Badge>
                        <p className="text-cpu-darkgray text-sm">{member.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Search and Filters */}
              <div className="bg-cpu-lightgray p-6 rounded-lg mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher un membre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger>
                      <SelectValue placeholder="Secteur" />
                    </SelectTrigger>
                    <SelectContent className="bg-cpu-gris">
                      <SelectItem value="all">Tous les secteurs</SelectItem>
                      {sectors.map((sector) => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
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

              {/* Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map((member) => (
                  <Card key={member.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="bg-cpu-green/10 p-3 rounded-lg">
                          <Building2 className="h-6 w-6 text-cpu-green" />
                        </div>
                        {member.featured && (
                          <Badge variant="secondary" className="bg-cpu-green/10 text-cpu-green">
                            <Star className="h-3 w-3 mr-1" />
                            Membre actif
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mt-3">{member.name}</CardTitle>
                      <CardDescription className="flex items-center text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        {member.region}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline" className="mb-3 text-xs">{member.sector}</Badge>
                      <p className="text-cpu-darkgray text-sm line-clamp-3">{member.description}</p>
                    </CardContent>
                    {member.website && (
                      <CardFooter>
                        <Button variant="ghost" size="sm" className="text-cpu-green">
                          <Globe className="h-4 w-4 mr-2" />
                          Voir le site
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>

              {filteredMembers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Aucun membre trouvé avec ces critères</p>
                </div>
              )}

              <div className="text-center mt-8">
                <p className="text-cpu-darkgray mb-4">
                  Plus de <span className="font-bold text-cpu-orange">1000 entreprises</span> nous font confiance
                </p>
              </div>
            </TabsContent>

            {/* Avantages Tab */}
            <TabsContent value="avantages" className="mt-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Pourquoi rejoindre CPU-PME.CI ?</h2>
                <p className="text-cpu-darkgray max-w-2xl mx-auto">
                  En devenant membre, vous bénéficiez d'un ensemble complet de services et d'avantages 
                  pour développer votre entreprise
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {membershipBenefits.map((benefit, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto bg-cpu-orange/10 p-4 rounded-full w-fit">
                        {getBenefitIcon(benefit.icon)}
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cpu-darkgray">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pricing Plans */}
              <div className="bg-cpu-lightgray rounded-2xl p-8 md:p-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Nos Formules d'Adhésion</h2>
                  <p className="text-cpu-darkgray">
                    Choisissez la formule qui correspond le mieux à vos besoins
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {membershipPlans.map((plan, index) => (
                    <Card 
                      key={index} 
                      className={`relative ${plan.recommended ? 'border-2 border-cpu-orange shadow-xl scale-105' : ''}`}
                    >
                      {plan.recommended && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-cpu-orange text-white px-4 py-1">
                            Recommandé
                          </Badge>
                        </div>
                      )}
                      <CardHeader className="text-center pb-2">
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <div className="mt-4">
                          <span className="text-4xl font-bold text-cpu-green">{plan.price}</span>
                          <span className="text-cpu-darkgray ml-2">{plan.period}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-5 w-5 text-cpu-green mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className={`w-full ${plan.recommended ? 'bg-cpu-orange hover:bg-cpu-orange/90' : 'bg-cpu-green hover:bg-cpu-green/90'}`}
                        >
                          Choisir cette formule
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Adhesion Tab */}
            <TabsContent value="adhesion" className="mt-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Demande d'Adhésion</h2>
                  <p className="text-cpu-darkgray">
                    Remplissez le formulaire ci-dessous pour rejoindre notre confédération. 
                    Notre équipe vous contactera dans les 48 heures.
                  </p>
                </div>

                <Card className="shadow-lg">
                  <CardContent className="p-8">
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
                          <Input id="companyName" placeholder="Ex: Ma Société SARL" required />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="sector">Secteur d'activité *</Label>
                          <Select required>
                            <SelectTrigger>
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
                            <SelectTrigger>
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
                            <SelectTrigger>
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
                        <div className="md:col-span-2 pt-4">
                          <h3 className="text-lg font-semibold mb-4 text-cpu-orange flex items-center">
                            <Users className="h-5 w-5 mr-2" />
                            Informations de contact
                          </h3>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contactName">Nom du représentant *</Label>
                          <Input id="contactName" placeholder="Prénom et Nom" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="position">Fonction</Label>
                          <Input id="position" placeholder="Ex: Directeur Général" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email professionnel *</Label>
                          <Input id="email" type="email" placeholder="email@entreprise.ci" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone *</Label>
                          <Input id="phone" type="tel" placeholder="+225 XX XX XX XX XX" required />
                        </div>

                        {/* Membership Plan */}
                        <div className="md:col-span-2 pt-4">
                          <h3 className="text-lg font-semibold mb-4 text-cpu-green flex items-center">
                            <Award className="h-5 w-5 mr-2" />
                            Formule souhaitée
                          </h3>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <Select>
                            <SelectTrigger>
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
                            className="min-h-[120px]"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button type="submit" className="w-full bg-cpu-orange hover:bg-cpu-orange/90 text-white py-6 text-lg">
                          Soumettre ma demande d'adhésion
                        </Button>
                        <p className="text-center text-sm text-cpu-darkgray mt-4">
                          En soumettant ce formulaire, vous acceptez nos conditions générales d'adhésion.
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cpu-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Rejoignez la communauté CPU-PME.CI
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Plus de 1000 entreprises nous font déjà confiance. Ensemble, construisons l'avenir des PME ivoiriennes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-cpu-orange hover:bg-cpu-orange/90 text-white px-8 py-6 text-lg">
              Adhérer maintenant
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-cpu-black px-8 py-6 text-lg">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Members;
