import { notFound } from "next/navigation";
import NewsDetailClient from "./NewsDetailClient";
import actualites1 from "@/assets/actualites1.png";
import actualites2 from "@/assets/actualites2.png";
import actualites3 from "@/assets/actualites3.png";
import actualites4 from "@/assets/actualites4.png";

// Données fictives d'actualités
const newsData = [
  {
    id: "1",
    titre:
      "Réunion à Man pour soutenir le développement du secteur vivrier en Côte d'Ivoire",
    description:
      "Le 12 avril 2025, la CPU-PME.CI s'est réunie à Man pour soutenir la Présidente Gbakayoro qui, malgré des moyens limités, fait preuve d'une résilience remarquable dans le développement du secteur du vivrier en Côte d'Ivoire.",
    categorie: "1",
    created_at: Date.now() - 86400000 * 2,
    auteur: "SERCOM CPU-PME.CI",
    couverture: {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    },
  },
  {
    id: "2",
    titre:
      "Rencontre fructueuse entre la Délégation de l'Union Européenne en Côte d'Ivoire et la CPU-PME.CI pour le développement des PME ivoiriennes",
    description:
      "La Délégation de l'Union Européenne en Côte d'Ivoire et la Confédération Patronale Unique des PME de Côte d'Ivoire (CPU-PME.CI) ont échangé ce jour de 10h à 12h dans les locaux de l'institution européenne. Les discussions ont porté sur des sujets clés pour le développement des PME ivoiriennes, ainsi que pour l'économie locale et sous-régionale. La première puissance patronale de Côte d'Ivoire s'est félicitée de la qualité des échanges et a réitéré ses sincères remerciements à SEM Mme l'Ambassadrice Francesca Di Mauro, représentante de la Délégation de l'Union européenne près la République de Côte d'Ivoire. Pour le Dr Elias Farakhan Moussa Diomandé, président de la CPU-PME.CI, cette première rencontre ouvre de belles perspectives pour les PME ivoiriennes, avec des chantiers prometteurs à venir. Les échanges ont été jugés fructueux, annonçant une collaboration renforcée pour soutenir la croissance et la compétitivité des PME en Côte d'Ivoire.",
    categorie: "5",
    created_at: Date.now() - 86400000 * 5,
    auteur: "SERCOM CPU-PME.CI",
    couverture: {
      url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    },
  },
  {
    id: "3",
    titre: "Le Gala des PME-CI est officiellement lancé !",
    description:
      "Ce mercredi 23 avril, nous avons donné le coup d'envoi de la 4ᵉ édition du Gala des PME de Côte d'Ivoire, lors d'un lancement réussi à la Chambre de Commerce et d'Industrie. Une édition placée sous le signe de l'ambition, de la résilience et de la transformation des PME ivoiriennes.Le rendez-vous est pris : 20 & 21 juin 2025 au Sofitel Hôtel Ivoire.Cet événement majeur rassemblera les acteurs clés de l'écosystème entrepreneurial ivoirien pour célébrer l'excellence et l'innovation dans le secteur des PME.Au programme : conférences de haut niveau, ateliers thématiques, remise de prix et opportunités de networking.",
    categorie: "1",
    created_at: Date.now() - 86400000 * 10,
    auteur: "Secrétariat CPU-PME.CI",
    couverture: {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    },
  },
  {
    id: "4",
    titre: "ECONOMIE BLEUE, LA PÊCHE",
    description:
      "C'était le mercredi dernier 24 Avril 2025 à la Patinoire de Sofitel Hôtel l'Ivoire. La CPU-PME.CI a été invitée par l'Union Européenne au cours de la séance de travail avec la Délégation UE Abidjan à prendre part aux échanges avec les acteurs de l'Economie Bleue. l s'agit de l'écosystème des ressources animales, halieutiques et notamment des pêches et ses démembrements. La cérémonie a été placée sous la présidence du Premier Ministre BEUGRE MANBE et le patronage du Ministre Sidi Tiemoko TOURE, Ministère de tutelle et sous l'égide de la FAO, la BAD et l'UE.Le Président Dr DIOMANDE Moussa Elias Farakhan a participé aux différents panels, a visité stand par stand pour mieux s'imprégner du milieu aquatique, aquarium, aquaculture. Ce que nous avons découvert est impressionnant et encouragent.Le Président a échangé personnellement avec les Jeunes de la Société Coopérative Simplifiée des Jeunes Aquaculteurs du Poro 'SCOOPS JA PORO', un véritable vivier de Champions Nationaux.Nous avons eu de nombreux échanges avec les acteurs, les producteurs d'engrais, les marailleurs et l'Interprofession de la Filière Pêche et le FIRCA.Ce fut une journée rude pour nous mais riche en perspective pour la CPU-PME.CI. Les Contact pris au niveau national et international seront mis à la disposition de nos membres du Secteur Pêche.",
    categorie: "1",
    created_at: Date.now() - 86400000 * 18,
    auteur: "Hermann ADJABONI GUEZO",
    couverture: {
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
    },
  },
  {
    id: "5",
    titre: "Nouvelle réglementation pour les entreprises du secteur agricole",
    description:
      "Le gouvernement a adopté une nouvelle réglementation pour les entreprises du secteur agricole. Cette réglementation vise à simplifier les procédures administratives et à faciliter l'accès au foncier pour les PME du secteur. La CPU-PME.CI salue cette initiative qui répond à plusieurs de ses recommandations formulées lors des assises de l'agriculture en 2024.",
    categorie: "2",
    created_at: Date.now() - 86400000 * 7,
    auteur: "",
    couverture: {
      url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
    },
  },

  {
    id: "6",
    titre: "Lancement du nouveau programme de financement pour les PME",
    description:
      "Le ministère de l'Économie et des Finances a lancé un nouveau programme de financement destiné aux PME ivoiriennes. Ce programme, d'un montant global de 100 milliards de FCFA, vise à soutenir la croissance et le développement des petites et moyennes entreprises dans tous les secteurs d'activité. La CPU-PME.CI a participé activement à la conception de ce programme et assurera un rôle clé dans sa mise en œuvre.",
    categorie: "2",
    created_at: Date.now() - 86400000 * 20,
    auteur: "",
    couverture: {
      url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    },
  },
  {
    id: "7",
    titre:
      "Forum National sur l'Économie Bleue : Les PME au cœur de la stratégie nationale",
    description:
      "Le Forum National sur l'Économie Bleue s'est tenu du 20 au 22 Mars 2025 au Palais des Congrès d'Abidjan. Plus de 500 participants issus du secteur privé, des organisations internationales et des institutions gouvernementales ont pris part à cet événement majeur. La CPU-PME.CI a présenté sa vision pour l'intégration des PME dans la stratégie nationale de développement de l'économie bleue. Plusieurs recommandations ont été formulées, notamment la création d'un fonds d'appui spécifique aux PME du secteur maritime et halieutique.",
    categorie: "1",
    created_at: Date.now() - 86400000 * 25,
    auteur: "",
    couverture: {
      url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
    },
  },
  {
    id: "8",
    titre: "Forum national des entrepreneurs : les inscriptions sont ouvertes",
    description:
      "Le Forum national des entrepreneurs se tiendra du 5 au 7 avril 2025 à Abidjan. Les inscriptions sont désormais ouvertes pour tous les entrepreneurs et porteurs de projets souhaitant participer à cet événement majeur. Au programme : conférences, ateliers pratiques, networking et rencontres avec des investisseurs.",
    categorie: "1",
    created_at: Date.now() - 86400000 * 30,
    auteur: "",
    couverture: {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    },
  },
];

const categories = [
  { id: "1", name: "Événements" },
  { id: "2", name: "Politiques publiques" },
  { id: "3", name: "Success stories" },
  { id: "4", name: "Communiqués de presse" },
  { id: "5", name: "Partenariats" },
];

// Fonction pour obtenir l'image selon l'ID
const getNewsImage = (id: string) => {
  const images: { [key: string]: any } = {
    "1": actualites1,
    "2": actualites2,
    "3": actualites3,
    "4": actualites4,
  };
  return images[id] || null;
};

// Cette fonction indique à Next.js quels chemins statiques générer
export function generateStaticParams() {
  return newsData.map((news) => ({
    id: news.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Récupérer l'actualité spécifique
  const newsItem = newsData.find((news) => news.id === id);

  // Si l'article n'existe pas, afficher 404
  if (!newsItem) {
    notFound();
  }

  // Actualités similaires (3 articles différents)
  const relatedNews = newsData.filter((news) => news.id !== id).slice(0, 3);

  // Obtenir l'image principale et les images des actualités similaires
  const newsImage = getNewsImage(id);
  const relatedNewsWithImages = relatedNews.map((news) => ({
    ...news,
    image: getNewsImage(news.id),
  }));

  return (
    <NewsDetailClient
      newsItem={newsItem}
      newsImage={newsImage}
      relatedNews={relatedNewsWithImages}
      categories={categories}
    />
  );
}
