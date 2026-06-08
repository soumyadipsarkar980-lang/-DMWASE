import type { SiteConfig } from './types';

// Primary customization object: edit this file for source-controlled defaults, or use the Admin Dashboard for runtime edits saved in localStorage.
export const defaultConfig: SiteConfig = {
  agencyName: '[Agency Name Placeholder]',
  tagline: 'Performance marketing, creative strategy, and conversion-first websites for ambitious brands.',
  primaryColor: '#2563eb',
  secondaryColor: '#0f172a',
  accentColor: '#f97316',
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  logoUrl: '/logo.svg',
  heroImage: '/hero-illustration.svg',
  whatsappNumber: '+15551234567',
  language: 'en',
  darkModeDefault: false,
  // Paste production tracking IDs here or in the Admin Dashboard before launch.
  analytics: {
    googleAnalyticsId: '',
    googleTagManagerId: '',
    searchConsoleVerification: '',
    adsensePublisherId: '',
  },
  // Toggle homepage blocks without changing component code.
  sections: [
    { id: 'hero', label: 'Hero Section', enabled: true },
    { id: 'services', label: 'Services Overview', enabled: true },
    { id: 'testimonials', label: 'Client Testimonials', enabled: true },
    { id: 'portfolio', label: 'Portfolio Showcase', enabled: true },
    { id: 'faq', label: 'FAQ Section', enabled: true },
    { id: 'contact', label: 'Contact Form', enabled: true },
    { id: 'newsletter', label: 'Newsletter Subscription', enabled: true },
  ],
  // Add unlimited pages by appending records here or by using Admin > Unlimited Pages.
  pages: [
    { id: 'home', slug: '/', title: 'Home', enabled: true, showInNav: true },
    { id: 'about', slug: '/about', title: 'About Us', enabled: true, showInNav: true, content: 'We are a senior team of strategists, media buyers, designers, developers, and analysts focused on measurable growth.' },
    { id: 'services', slug: '/services', title: 'Services', enabled: true, showInNav: true },
    { id: 'portfolio', slug: '/portfolio', title: 'Portfolio', enabled: true, showInNav: true },
    { id: 'case-studies', slug: '/case-studies', title: 'Case Studies', enabled: true, showInNav: true },
    { id: 'blog', slug: '/blog', title: 'Blog', enabled: true, showInNav: true },
    { id: 'pricing', slug: '/pricing', title: 'Pricing', enabled: true, showInNav: true },
    { id: 'contact', slug: '/contact', title: 'Contact', enabled: true, showInNav: true },
    { id: 'privacy', slug: '/privacy-policy', title: 'Privacy Policy', enabled: true, showInNav: false, content: 'This privacy policy explains how contact, analytics, newsletter, and account information can be collected and used. Replace this placeholder with counsel-reviewed policy text before launch.' },
    { id: 'terms', slug: '/terms-conditions', title: 'Terms & Conditions', enabled: true, showInNav: false, content: 'These terms define website and service usage expectations. Replace this placeholder with counsel-reviewed terms before launch.' },
  ],
  // Service cards are data-driven; icon names map to lucide-react icons in src/main.tsx.
  services: [
    { id: 'seo', title: 'SEO', description: 'Technical audits, content strategy, link earning, and reporting that compounds organic growth.', icon: 'Search', featured: true },
    { id: 'google-ads', title: 'Google Ads', description: 'Full-funnel paid search and Performance Max campaigns optimized for qualified pipeline.', icon: 'MousePointerClick', featured: true },
    { id: 'facebook-ads', title: 'Facebook Ads', description: 'Creative testing, audience strategy, and conversion tracking for Meta campaigns.', icon: 'Megaphone', featured: true },
    { id: 'social-media', title: 'Social Media Marketing', description: 'Platform-native storytelling, calendars, community growth, and paid social amplification.', icon: 'Share2', featured: true },
    { id: 'content', title: 'Content Marketing', description: 'Editorial systems, thought leadership, landing pages, and lead magnets that educate buyers.', icon: 'PenTool', featured: true },
    { id: 'email', title: 'Email Marketing', description: 'Lifecycle automation, segmentation, deliverability, and revenue-driving newsletters.', icon: 'Mail', featured: true },
    { id: 'web-development', title: 'Website Development', description: 'Fast, accessible, SEO-ready websites and landing pages built around conversion goals.', icon: 'Code2', featured: true },
    { id: 'local-seo', title: 'Local SEO', description: 'Google Business Profile optimization, citations, reviews, and localized landing pages.', icon: 'MapPin', featured: true },
  ],
  testimonials: [
    { id: 't1', name: 'Maya Chen', company: 'Northstar SaaS', quote: 'The team rebuilt our acquisition engine and helped us scale qualified demos without wasting budget.', rating: 5 },
    { id: 't2', name: 'Jordan Blake', company: 'UrbanFit', quote: 'Our local rankings, paid leads, and retention campaigns finally work together as one system.', rating: 5 },
    { id: 't3', name: 'Avery Stone', company: 'Luma Retail', quote: 'Transparent reporting and excellent creative testing made every monthly decision easier.', rating: 5 },
  ],
  portfolio: [
    { id: 'p1', title: 'SaaS Demand Gen Launch', category: 'SEO + Paid Search', image: '/portfolio-1.svg', result: '+184% qualified demo requests' },
    { id: 'p2', title: 'Ecommerce Growth System', category: 'Meta Ads + Email', image: '/portfolio-2.svg', result: '4.7x blended ROAS' },
    { id: 'p3', title: 'Local Service Expansion', category: 'Local SEO + Web', image: '/portfolio-3.svg', result: '+63% inbound calls' },
  ],
  blogPosts: [
    { id: 'b1', title: 'How to Build a Measurement-First Marketing Plan', excerpt: 'A practical framework for goals, channels, events, and dashboards.', date: '2026-05-18', author: 'Growth Team', tags: ['Analytics', 'Strategy'] },
    { id: 'b2', title: 'SEO Priorities for Competitive Service Businesses', excerpt: 'Where technical improvements, authority, and content produce the biggest lift.', date: '2026-05-25', author: 'SEO Team', tags: ['SEO'] },
    { id: 'b3', title: 'Paid Media Creative Tests Worth Running', excerpt: 'Messaging, offers, and formats that reveal what your market values.', date: '2026-06-01', author: 'Media Team', tags: ['Ads', 'Creative'] },
  ],
  pricing: [
    { id: 'starter', name: 'Starter', price: '$1,500/mo', description: 'For emerging teams that need consistent growth foundations.', features: ['SEO audit', '2 campaigns', 'Monthly reporting', 'Email support'], highlighted: false },
    { id: 'growth', name: 'Growth', price: '$4,500/mo', description: 'For brands ready to scale across channels with experiments.', features: ['Full funnel strategy', '6 campaigns', 'Landing pages', 'Weekly optimization', 'Dashboard access'], highlighted: true },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom', description: 'For complex teams that need deep integration and analytics.', features: ['Dedicated pod', 'Advanced analytics', 'Custom development', 'Quarterly planning', 'SLA support'], highlighted: false },
  ],
  users: [
    { id: 'admin', name: 'Admin User', email: 'admin@example.com', role: 'admin', company: 'Agency' },
    { id: 'client', name: 'Client User', email: 'client@example.com', role: 'user', company: 'Client Co.' },
  ],
  contactRequests: [],
};

export const translations = {
  en: { cta: 'Get a Free Strategy Call', learn: 'Explore Services', dashboard: 'Dashboard' },
  es: { cta: 'Obtén una consulta gratuita', learn: 'Ver servicios', dashboard: 'Panel' },
  fr: { cta: 'Obtenir un appel stratégique', learn: 'Voir les services', dashboard: 'Tableau de bord' },
};
