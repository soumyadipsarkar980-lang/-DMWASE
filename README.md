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

## Deploy on Vercel

This project is already configured for Vercel. The production build command is `npm run build`, the output directory is `dist`, and SPA routes are rewritten to `index.html` in `vercel.json`.

### One-click/import deployment

1. Push this repository to GitHub.
2. In Vercel, choose **Add New Project** and import the repository.
3. Keep the detected framework as **Vite**.
4. Confirm these settings:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**.

### CLI deployment

```bash
npm install
npm run build
npm run deploy:vercel
```

For non-interactive deployments, create a Vercel token and run:

```bash
VERCEL_TOKEN=your_token npm run deploy:vercel -- --token "$VERCEL_TOKEN"
```

After deployment, Vercel will provide the live production URL.

## Customization Notes

Default content lives in `src/content.ts`. Runtime edits are saved in browser localStorage for a backend-free demo. For a live CMS, replace the isolated storage logic in `src/main.tsx` with API calls to your preferred backend.
