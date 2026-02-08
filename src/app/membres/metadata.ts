import { Metadata } from 'next';

export const membresMetadata: Metadata = {
  title: 'Annuaire des Membres | CPU - Confédération des PME du Cameroun',
  description: 'Découvrez notre annuaire complet de membres : entreprises, PME et organisations affiliées à la CPU. Explorez par secteur, région et activités.',
  keywords: [
    'annuaire membres CPU',
    'PME Cameroun',
    'entreprises camerounaises',
    'répertoire entreprises',
    'membres CPU',
    'confédération PME',
    'secteurs d\'activité Cameroun',
    'Pass PME',
    'adhésion CPU'
  ],
  openGraph: {
    title: 'Annuaire des Membres CPU',
    description: 'Explorez notre réseau de PME et entreprises membres à travers tout le Cameroun',
    type: 'website',
    locale: 'fr_CM',
    siteName: 'CPU - Confédération des PME du Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annuaire des Membres CPU',
    description: 'Explorez notre réseau de PME et entreprises membres à travers tout le Cameroun',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/membres',
  },
};

/**
 * Génère le JSON-LD pour Schema.org Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Confédération des PME du Cameroun',
    alternateName: 'CPU',
    url: 'https://cpu-cameroun.org',
    logo: 'https://cpu-cameroun.org/logo.png',
    description: 'La Confédération des PME du Cameroun regroupe et représente les petites et moyennes entreprises camerounaises',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CM',
      addressLocality: 'Yaoundé',
    },
    sameAs: [
      'https://www.facebook.com/CPUCameroun',
      'https://www.twitter.com/CPUCameroun',
      'https://www.linkedin.com/company/cpu-cameroun',
    ],
    members: {
      '@type': 'OrganizationRole',
      roleName: 'Membre',
    },
  };
}

/**
 * Génère le JSON-LD pour Schema.org SearchAction
 */
export function generateSearchActionSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/membres?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Génère le JSON-LD pour un membre spécifique
 */
export function generateMemberSchema(member: any) {
  return {
    '@context': 'https://schema.org',
    '@type': member.typeMembre === 'entreprise' ? 'Organization' : 'LocalBusiness',
    name: member.name,
    description: member.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: member.region,
      addressCountry: 'CM',
      streetAddress: member.fullAddress,
    },
    ...(member.phone && { telephone: member.phone }),
    ...(member.email && { email: member.email }),
    ...(member.website && { url: member.website }),
    memberOf: {
      '@type': 'Organization',
      name: 'Confédération des PME du Cameroun',
    },
  };
}

/**
 * Génère le JSON-LD pour BreadcrumbList
 */
export function generateBreadcrumbSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Membres',
        item: `${baseUrl}/membres`,
      },
    ],
  };
}

/**
 * Génère le JSON-LD pour ItemList (liste de membres)
 */
export function generateMemberListSchema(members: any[], baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Annuaire des Membres CPU',
    description: 'Liste des membres de la Confédération des PME du Cameroun',
    numberOfItems: members.length,
    itemListElement: members.slice(0, 10).map((member, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Organization',
        name: member.name,
        description: member.description,
        address: {
          '@type': 'PostalAddress',
          addressLocality: member.region,
          addressCountry: 'CM',
        },
      },
    })),
  };
}
