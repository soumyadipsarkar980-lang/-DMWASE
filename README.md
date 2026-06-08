# Customizable Digital Marketing Agency Website

A production-ready Vite + React + TypeScript website for a modern digital marketing agency. The site is configuration-driven so content, colors, fonts, services, pricing, pages, blog posts, testimonials, sections, users, and leads can be customized from the in-browser admin dashboard without changing component structure.

## Features

- 10 required pages: Home, About Us, Services, Portfolio, Case Studies, Blog, Pricing, Contact, Privacy Policy, Terms & Conditions
- User registration, login, password reset demo flow, dashboard, and profile management
- Admin dashboard for users, services, blog posts, testimonials-ready content, contact requests, analytics, colors, fonts, pages, media URLs, and sections
- SEO, Open Graph, robots.txt, sitemap.xml, Google Analytics/GTM/Search Console/AdSense fields
- Contact form, callback request, newsletter form, WhatsApp button, spam honeypot, and HTML validation
- Dark mode, responsive mobile-first UI, translation-ready labels, and deployment config for Netlify/Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open `/login` and use `admin@example.com` with any password of at least 8 characters to access the admin dashboard.

## Build

```bash
npm run build
```

## Customization Notes

Default content lives in `src/content.ts`. Runtime edits are saved in browser localStorage for a backend-free demo. For a live CMS, replace the isolated storage logic in `src/main.tsx` with API calls to your preferred backend.
