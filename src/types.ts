export type LanguageCode = 'en' | 'es' | 'fr';

export type NavPage = {
  id: string;
  slug: string;
  title: string;
  enabled: boolean;
  showInNav: boolean;
  content?: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  company: string;
  quote: string;
  rating: number;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  result: string;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
};

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted: boolean;
};

export type SiteSection = {
  id: string;
  label: string;
  enabled: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  company?: string;
};

export type ContactRequest = {
  id: string;
  name: string;
  email: string;
  message: string;
  service: string;
  createdAt: string;
};

export type SiteConfig = {
  agencyName: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoUrl: string;
  heroImage: string;
  whatsappNumber: string;
  language: LanguageCode;
  darkModeDefault: boolean;
  analytics: {
    googleAnalyticsId: string;
    googleTagManagerId: string;
    searchConsoleVerification: string;
    adsensePublisherId: string;
  };
  sections: SiteSection[];
  pages: NavPage[];
  services: Service[];
  testimonials: Testimonial[];
  portfolio: PortfolioItem[];
  blogPosts: BlogPost[];
  pricing: PricingPlan[];
  users: User[];
  contactRequests: ContactRequest[];
};
