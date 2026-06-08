import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BarChart3,
  Check,
  Code2,
  Edit3,
  Globe2,
  LayoutDashboard,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Moon,
  MousePointerClick,
  PenTool,
  Phone,
  Plus,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  UserCircle,
  Users,
  X,
} from 'lucide-react';
import { defaultConfig, translations } from './content';
import type { BlogPost, ContactRequest, NavPage, Service, SiteConfig, User } from './types';
import './styles.css';

// This demo uses localStorage as a swappable data adapter. Replace these reads/writes with CMS or API calls for multi-user production editing.
const STORAGE_KEY = 'dmwase-site-config';
const SESSION_KEY = 'dmwase-current-user';

type AppContextValue = {
  config: SiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextValue | null>(null);

function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}

const iconMap = { Search, MousePointerClick, Megaphone, Share2, PenTool, Mail, Code2, MapPin };

// Merge stored runtime edits over the defaults so new source defaults can ship without losing admin edits.
function readConfig() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultConfig;
  try {
    return { ...defaultConfig, ...JSON.parse(stored) } as SiteConfig;
  } catch {
    return defaultConfig;
  }
}

function AppProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(readConfig);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [darkMode, setDarkMode] = useState(() => config.darkModeDefault);

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(config)), [config]);
  useEffect(() => {
    if (currentUser) localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
    else localStorage.removeItem(SESSION_KEY);
  }, [currentUser]);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', config.primaryColor);
    document.documentElement.style.setProperty('--secondary', config.secondaryColor);
    document.documentElement.style.setProperty('--accent', config.accentColor);
    document.documentElement.style.setProperty('--site-font', config.fontFamily);
    document.documentElement.lang = config.language;
    document.body.dataset.theme = darkMode ? 'dark' : 'light';
  }, [config, darkMode]);

  const value = useMemo(() => ({ config, setConfig, currentUser, setCurrentUser, darkMode, setDarkMode }), [config, currentUser, darkMode]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);
  return path;
}

function navigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Header() {
  const { config, currentUser, setCurrentUser, darkMode, setDarkMode } = useApp();
  const [open, setOpen] = useState(false);
  const pages = config.pages.filter((page) => page.enabled && page.showInNav);

  return (
    <header className="site-header">
      <button className="brand" onClick={() => navigate('/')} aria-label="Go home">
        <img src={config.logoUrl} alt="Agency logo" />
        <span>{config.agencyName}</span>
      </button>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
        {pages.map((page) => (
          <button key={page.id} onClick={() => { navigate(page.slug); setOpen(false); }}>{page.title}</button>
        ))}
        <button onClick={() => setDarkMode(!darkMode)} className="icon-button" aria-label="Toggle dark mode">{darkMode ? <Sun /> : <Moon />}</button>
        {currentUser ? (
          <>
            <button className="button ghost" onClick={() => navigate(currentUser.role === 'admin' ? '/admin' : '/dashboard')}>{translations[config.language].dashboard}</button>
            <button className="button outline" onClick={() => setCurrentUser(null)}>Logout</button>
          </>
        ) : (
          <button className="button primary" onClick={() => navigate('/login')}>Login</button>
        )}
      </nav>
    </header>
  );
}

function Section({ eyebrow, title, children, className = '' }: { eyebrow?: string; title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`section ${className}`}>
      <div className="section-heading">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Hero() {
  const { config } = useApp();
  const t = translations[config.language];
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="pill"><Sparkles size={16} /> Modern Digital Growth Agency</span>
        <h1>Build a predictable marketing engine for your next stage of growth.</h1>
        <p>{config.tagline}</p>
        <div className="hero-actions">
          <button className="button primary large" onClick={() => navigate('/contact')}>{t.cta}</button>
          <button className="button outline large" onClick={() => navigate('/services')}>{t.learn}</button>
        </div>
        <div className="metrics" aria-label="Agency performance metrics">
          <strong>4.8x<span>Avg. ROAS</span></strong>
          <strong>120+<span>Launches</span></strong>
          <strong>38%<span>Lower CAC</span></strong>
        </div>
      </div>
      <div className="hero-visual"><img src={config.heroImage} alt="Marketing analytics dashboard illustration" /></div>
    </section>
  );
}

function ServicesGrid({ limit }: { limit?: number }) {
  const { config } = useApp();
  const services = limit ? config.services.slice(0, limit) : config.services;
  return (
    <div className="card-grid services-grid">
      {services.map((service) => {
        const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Sparkles;
        return (
          <article className="card service-card" key={service.id}>
            <div className="icon-circle"><Icon /></div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        );
      })}
    </div>
  );
}

function Testimonials() {
  const { config } = useApp();
  return (
    <div className="card-grid">
      {config.testimonials.map((item) => (
        <article className="card testimonial" key={item.id}>
          <div>{Array.from({ length: item.rating }).map((_, i) => <Star key={i} className="star" fill="currentColor" />)}</div>
          <p>“{item.quote}”</p>
          <strong>{item.name}</strong><span>{item.company}</span>
        </article>
      ))}
    </div>
  );
}

function PortfolioGrid() {
  const { config } = useApp();
  return (
    <div className="portfolio-grid">
      {config.portfolio.map((item) => (
        <article className="portfolio-card" key={item.id}>
          <img src={item.image} alt={`${item.title} project preview`} />
          <div><span>{item.category}</span><h3>{item.title}</h3><p>{item.result}</p></div>
        </article>
      ))}
    </div>
  );
}

function FAQ() {
  const faqs = [
    ['Can I customize every page?', 'Yes. Site content, colors, fonts, sections, services, pricing, blog posts, users, and requests are managed from the admin dashboard.'],
    ['Is it SEO optimized?', 'The app includes semantic markup, meta tags, Open Graph tags, sitemap, robots.txt, fast Vite builds, and deployment-ready configuration.'],
    ['Can this connect to a backend?', 'Yes. The local storage data layer is intentionally isolated so teams can replace it with Firebase, Supabase, Laravel, or a custom API.'],
    ['Does it support multiple languages?', 'Yes. The structure includes language settings and translation-ready labels for English, Spanish, and French.'],
  ];
  return <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>;
}

function LeadForms() {
  const { config, setConfig } = useApp();
  const [status, setStatus] = useState('');
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const honeypot = String(data.get('website') ?? '');
    if (honeypot) return;
    const request: ContactRequest = {
      id: crypto.randomUUID(),
      name: String(data.get('name')),
      email: String(data.get('email')),
      service: String(data.get('service')),
      message: String(data.get('message')),
      createdAt: new Date().toISOString(),
    };
    setConfig((prev) => ({ ...prev, contactRequests: [request, ...prev.contactRequests] }));
    setStatus('Thanks! Your request has been saved and the team will follow up shortly.');
    event.currentTarget.reset();
  };
  return (
    <div className="lead-grid">
      <form className="form-card" onSubmit={submit}>
        <h3>Start a conversation</h3>
        <input name="website" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <label>Name<input name="name" required minLength={2} /></label>
        <label>Email<input name="email" type="email" required /></label>
        <label>Service<select name="service">{config.services.map((service) => <option key={service.id}>{service.title}</option>)}</select></label>
        <label>Message<textarea name="message" required minLength={10} /></label>
        <button className="button primary" type="submit"><Send size={18} /> Send Request</button>
        {status && <p className="success">{status}</p>}
      </form>
      <div className="form-card accent-card">
        <h3>Lead generation tools</h3>
        <p>Capture contact forms, callback requests, newsletter subscribers, WhatsApp inquiries, and campaign source data.</p>
        <a className="button whatsapp" href={`https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"><Phone /> WhatsApp Us</a>
        <form className="mini-form" onSubmit={(e) => { e.preventDefault(); alert('Newsletter subscription saved in demo mode.'); }}>
          <label>Newsletter<input type="email" placeholder="you@company.com" required /></label>
          <button className="button outline">Subscribe</button>
        </form>
        <form className="mini-form" onSubmit={(e) => { e.preventDefault(); alert('Callback request saved in demo mode.'); }}>
          <label>Callback<input type="tel" placeholder="Phone number" required /></label>
          <button className="button outline">Request Callback</button>
        </form>
      </div>
    </div>
  );
}

function HomePage() {
  const { config } = useApp();
  const enabled = (id: string) => config.sections.find((section) => section.id === id)?.enabled;
  return (
    <>
      {enabled('hero') && <Hero />}
      {enabled('services') && <Section eyebrow="Services" title="Everything you need to attract, convert, and retain customers"><ServicesGrid limit={8} /></Section>}
      {enabled('testimonials') && <Section eyebrow="Testimonials" title="Trusted by growth-minded teams"><Testimonials /></Section>}
      {enabled('portfolio') && <Section eyebrow="Portfolio" title="Recent wins and measurable outcomes"><PortfolioGrid /></Section>}
      {enabled('faq') && <Section eyebrow="FAQ" title="Built for customization and growth"><FAQ /></Section>}
      {enabled('contact') && <Section eyebrow="Contact" title="Tell us about your growth goals"><LeadForms /></Section>}
      {enabled('newsletter') && <CTA />}
    </>
  );
}

function CTA() {
  const { config } = useApp();
  return <section className="cta"><h2>Ready to make marketing more measurable?</h2><p>Launch with {config.agencyName}, then customize every section from the admin panel.</p><button className="button light" onClick={() => navigate('/contact')}>Book a Strategy Call</button></section>;
}

function StandardPage({ page }: { page: NavPage }) {
  const { config } = useApp();
  const id = page.id;
  return (
    <main className="page-shell">
      <div className="page-hero"><span className="eyebrow">{config.agencyName}</span><h1>{page.title}</h1><p>{page.content ?? 'Use the admin dashboard to edit this page, add rich content, and publish unlimited custom pages.'}</p></div>
      {id === 'services' && <ServicesGrid />}
      {id === 'portfolio' && <PortfolioGrid />}
      {id === 'case-studies' && <CaseStudies />}
      {id === 'blog' && <Blog />}
      {id === 'pricing' && <Pricing />}
      {id === 'contact' && <LeadForms />}
      {id === 'about' && <AboutContent />}
    </main>
  );
}

function AboutContent() {
  return <div className="split-card"><div><h2>Strategy, execution, and analytics in one team.</h2><p>Our operating system combines senior strategy, fast creative cycles, channel expertise, and transparent reporting so every stakeholder knows what is working.</p></div><ul><li><Check /> Conversion-first roadmaps</li><li><Check /> Weekly optimization loops</li><li><Check /> Secure, scalable implementation</li></ul></div>;
}

function CaseStudies() {
  const { config } = useApp();
  return <div className="card-grid">{config.portfolio.map((item) => <article className="card" key={item.id}><h3>{item.title}</h3><p>{item.category}</p><strong>{item.result}</strong><p>Challenge, solution, and outcome blocks can be expanded from the unlimited pages editor.</p></article>)}</div>;
}

function Blog() {
  const { config } = useApp();
  return <div className="card-grid">{config.blogPosts.map((post) => <article className="card" key={post.id}><span className="eyebrow">{post.tags.join(' • ')}</span><h3>{post.title}</h3><p>{post.excerpt}</p><small>{post.author} · {post.date}</small></article>)}</div>;
}

function Pricing() {
  const { config } = useApp();
  return <div className="pricing-grid">{config.pricing.map((plan) => <article className={plan.highlighted ? 'price-card highlighted' : 'price-card'} key={plan.id}><h3>{plan.name}</h3><strong>{plan.price}</strong><p>{plan.description}</p><ul>{plan.features.map((feature) => <li key={feature}><Check /> {feature}</li>)}</ul><button className="button primary" onClick={() => navigate('/contact')}>Choose Plan</button></article>)}</div>;
}

function AuthPage({ mode }: { mode: 'login' | 'register' | 'reset' }) {
  const { config, setConfig, setCurrentUser } = useApp();
  const [message, setMessage] = useState('');
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email'));
    if (mode === 'reset') {
      setMessage('Password reset instructions would be emailed in a connected backend.');
      return;
    }
    let user = config.users.find((existing) => existing.email === email);
    if (!user) {
      user = { id: crypto.randomUUID(), name: String(data.get('name') || 'New User'), email, role: 'user' };
      setConfig((prev) => ({ ...prev, users: [...prev.users, user as User] }));
    }
    setCurrentUser(user);
    navigate(user.role === 'admin' ? '/admin' : '/dashboard');
  };
  return (
    <main className="auth-shell">
      <form className="form-card auth-card" onSubmit={submit}>
        <Lock className="auth-icon" />
        <h1>{mode === 'login' ? 'User Login' : mode === 'register' ? 'User Registration' : 'Password Reset'}</h1>
        {mode === 'register' && <label>Name<input name="name" required /></label>}
        <label>Email<input name="email" type="email" defaultValue={mode === 'login' ? 'admin@example.com' : ''} required /></label>
        {mode !== 'reset' && <label>Password<input name="password" type="password" defaultValue="demo-password" minLength={8} required /></label>}
        <button className="button primary" type="submit">Continue</button>
        {message && <p className="success">{message}</p>}
        <div className="auth-links"><button type="button" onClick={() => navigate('/register')}>Create account</button><button type="button" onClick={() => navigate('/reset-password')}>Reset password</button></div>
      </form>
    </main>
  );
}

function UserDashboard() {
  const { currentUser, setConfig } = useApp();
  if (!currentUser) return <AuthPage mode="login" />;
  return <main className="page-shell"><div className="page-hero"><UserCircle /><h1>Welcome, {currentUser.name}</h1><p>Manage your profile, requests, subscription preferences, and project visibility.</p></div><form className="form-card" onSubmit={(e) => { e.preventDefault(); const data = new FormData(e.currentTarget); setConfig((prev) => ({ ...prev, users: prev.users.map((user) => user.id === currentUser.id ? { ...user, name: String(data.get('name')), company: String(data.get('company')) } : user) })); alert('Profile updated in demo mode.'); }}><h3>Profile Management</h3><label>Name<input name="name" defaultValue={currentUser.name} /></label><label>Company<input name="company" defaultValue={currentUser.company} /></label><button className="button primary">Save Profile</button></form></main>;
}

// Admin dashboard intentionally edits data objects, not layout internals, to keep the website highly customizable without core code changes.
function AdminDashboard() {
  const { config, setConfig, currentUser } = useApp();
  if (!currentUser || currentUser.role !== 'admin') return <AuthPage mode="login" />;
  const updateField = (key: keyof SiteConfig, value: string | boolean) => setConfig((prev) => ({ ...prev, [key]: value }));
  const addPage = () => setConfig((prev) => ({ ...prev, pages: [...prev.pages, { id: crypto.randomUUID(), title: 'New Page', slug: `/page-${prev.pages.length + 1}`, enabled: true, showInNav: true, content: 'Edit this dynamic page content.' }] }));
  const addPost = () => setConfig((prev) => ({ ...prev, blogPosts: [{ id: crypto.randomUUID(), title: 'New Blog Post', excerpt: 'Edit this blog excerpt.', author: 'Admin', date: new Date().toISOString().slice(0, 10), tags: ['News'] }, ...prev.blogPosts] }));
  return (
    <main className="admin-shell">
      <div className="page-hero"><LayoutDashboard /><h1>Admin Dashboard</h1><p>Manage users, services, blog posts, testimonials, contact requests, analytics, colors, fonts, pages, media URLs, and homepage sections.</p></div>
      <div className="admin-grid">
        <AdminPanel title="Brand Customization"><label>Agency Name<input value={config.agencyName} onChange={(e) => updateField('agencyName', e.target.value)} /></label><label>Tagline<textarea value={config.tagline} onChange={(e) => updateField('tagline', e.target.value)} /></label><label>Font Family<input value={config.fontFamily} onChange={(e) => updateField('fontFamily', e.target.value)} /></label><label>Logo URL<input value={config.logoUrl} onChange={(e) => updateField('logoUrl', e.target.value)} /></label><label>Hero Image URL<input value={config.heroImage} onChange={(e) => updateField('heroImage', e.target.value)} /></label></AdminPanel>
        <AdminPanel title="Colors & Display"><label>Primary<input type="color" value={config.primaryColor} onChange={(e) => updateField('primaryColor', e.target.value)} /></label><label>Secondary<input type="color" value={config.secondaryColor} onChange={(e) => updateField('secondaryColor', e.target.value)} /></label><label>Accent<input type="color" value={config.accentColor} onChange={(e) => updateField('accentColor', e.target.value)} /></label><label>Language<select value={config.language} onChange={(e) => setConfig((prev) => ({ ...prev, language: e.target.value as SiteConfig['language'] }))}><option value="en">English</option><option value="es">Spanish</option><option value="fr">French</option></select></label></AdminPanel>
        <AdminPanel title="Homepage Sections">{config.sections.map((section) => <label className="checkbox" key={section.id}><input type="checkbox" checked={section.enabled} onChange={(e) => setConfig((prev) => ({ ...prev, sections: prev.sections.map((item) => item.id === section.id ? { ...item, enabled: e.target.checked } : item) }))} /> {section.label}</label>)}</AdminPanel>
        <AdminPanel title="Analytics Integrations"><label>Google Analytics ID<input value={config.analytics.googleAnalyticsId} onChange={(e) => setConfig((prev) => ({ ...prev, analytics: { ...prev.analytics, googleAnalyticsId: e.target.value } }))} placeholder="G-XXXXXXXX" /></label><label>Google Tag Manager<input value={config.analytics.googleTagManagerId} onChange={(e) => setConfig((prev) => ({ ...prev, analytics: { ...prev.analytics, googleTagManagerId: e.target.value } }))} placeholder="GTM-XXXX" /></label><label>Search Console<input value={config.analytics.searchConsoleVerification} onChange={(e) => setConfig((prev) => ({ ...prev, analytics: { ...prev.analytics, searchConsoleVerification: e.target.value } }))} /></label><label>AdSense Publisher<input value={config.analytics.adsensePublisherId} onChange={(e) => setConfig((prev) => ({ ...prev, analytics: { ...prev.analytics, adsensePublisherId: e.target.value } }))} /></label></AdminPanel>
        <AdminPanel title="Unlimited Pages"><button className="button outline" onClick={addPage}><Plus /> Add Page</button>{config.pages.map((page) => <EditablePage key={page.id} page={page} />)}</AdminPanel>
        <AdminPanel title="Manage Services">{config.services.map((service) => <EditableService key={service.id} service={service} />)}</AdminPanel>
        <AdminPanel title="Manage Blog Posts"><button className="button outline" onClick={addPost}><Plus /> Add Blog Post</button>{config.blogPosts.map((post) => <EditableBlog key={post.id} post={post} />)}</AdminPanel>
        <AdminPanel title="Manage Users"><Users />{config.users.map((user) => <p key={user.id}><strong>{user.name}</strong> — {user.email} ({user.role})</p>)}</AdminPanel>
        <AdminPanel title="Contact Requests">{config.contactRequests.length === 0 ? <p>No requests yet.</p> : config.contactRequests.map((request) => <p key={request.id}><strong>{request.name}</strong> requested {request.service}<br />{request.email}</p>)}</AdminPanel>
        <AdminPanel title="Website Analytics Dashboard"><BarChart3 /><div className="analytics-cards"><strong>{config.users.length}<span>Users</span></strong><strong>{config.blogPosts.length}<span>Posts</span></strong><strong>{config.contactRequests.length}<span>Leads</span></strong><strong>{config.services.length}<span>Services</span></strong></div></AdminPanel>
      </div>
    </main>
  );
}

function AdminPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="admin-panel"><h2><Edit3 size={18} /> {title}</h2>{children}</section>;
}

function EditablePage({ page }: { page: NavPage }) {
  const { setConfig } = useApp();
  const patch = (updates: Partial<NavPage>) => setConfig((prev) => ({ ...prev, pages: prev.pages.map((item) => item.id === page.id ? { ...item, ...updates } : item) }));
  return <div className="editable-row"><input value={page.title} onChange={(e) => patch({ title: e.target.value })} /><input value={page.slug} onChange={(e) => patch({ slug: e.target.value })} /><label className="checkbox"><input type="checkbox" checked={page.enabled} onChange={(e) => patch({ enabled: e.target.checked })} /> Enabled</label></div>;
}

function EditableService({ service }: { service: Service }) {
  const { setConfig } = useApp();
  const patch = (updates: Partial<Service>) => setConfig((prev) => ({ ...prev, services: prev.services.map((item) => item.id === service.id ? { ...item, ...updates } : item) }));
  return <div className="editable-row"><input value={service.title} onChange={(e) => patch({ title: e.target.value })} /><textarea value={service.description} onChange={(e) => patch({ description: e.target.value })} /></div>;
}

function EditableBlog({ post }: { post: BlogPost }) {
  const { setConfig } = useApp();
  const patch = (updates: Partial<BlogPost>) => setConfig((prev) => ({ ...prev, blogPosts: prev.blogPosts.map((item) => item.id === post.id ? { ...item, ...updates } : item) }));
  return <div className="editable-row"><input value={post.title} onChange={(e) => patch({ title: e.target.value })} /><textarea value={post.excerpt} onChange={(e) => patch({ excerpt: e.target.value })} /></div>;
}


function MarketingTags() {
  const { config } = useApp();
  useEffect(() => {
    document.title = `${config.agencyName} | Digital Marketing Agency`;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', config.tagline);

    const ensureMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let tag = document.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    ensureMeta('meta[property="og:title"]', 'property', 'og:title', `${config.agencyName} | Digital Marketing Agency`);
    ensureMeta('meta[property="og:description"]', 'property', 'og:description', config.tagline);
    if (config.analytics.searchConsoleVerification) ensureMeta('meta[name="google-site-verification"]', 'name', 'google-site-verification', config.analytics.searchConsoleVerification);
    if (config.analytics.adsensePublisherId) ensureMeta('meta[name="google-adsense-account"]', 'name', 'google-adsense-account', config.analytics.adsensePublisherId);
  }, [config]);
  return null;
}

function Footer() {
  const { config } = useApp();
  return <footer><div><strong>{config.agencyName}</strong><p>SEO, ads, social, content, email, development, analytics, and lead generation.</p></div><div><button onClick={() => navigate('/privacy-policy')}>Privacy Policy</button><button onClick={() => navigate('/terms-conditions')}>Terms & Conditions</button></div><div className="security"><ShieldCheck /> Secure authentication-ready · HTTPS-ready · Spam-protected forms</div></footer>;
}

function FloatingWhatsApp() {
  const { config } = useApp();
  return <a className="floating-whatsapp" href={`https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><Phone /></a>;
}

// Lightweight client router keeps deployment simple for Netlify/Vercel static hosting while supporting unlimited dynamic pages.
function Router() {
  const { config } = useApp();
  const path = usePath();
  if (path === '/login') return <AuthPage mode="login" />;
  if (path === '/register') return <AuthPage mode="register" />;
  if (path === '/reset-password') return <AuthPage mode="reset" />;
  if (path === '/dashboard') return <UserDashboard />;
  if (path === '/admin') return <AdminDashboard />;
  const page = config.pages.find((item) => item.slug === path && item.enabled);
  if (!page || page.id === 'home') return <HomePage />;
  return <StandardPage page={page} />;
}

function App() {
  return <AppProvider><MarketingTags /><Header /><Router /><FloatingWhatsApp /><Footer /></AppProvider>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
