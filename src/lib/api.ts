/**
 * Orca Headless CMS API Client
 * Maps WP plugin REST API fields → React frontend fields
 */

const API_NAMESPACE = '/wp-json/orca/v1';

function getBaseUrl(): string {
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin + API_NAMESPACE;
  }
  return API_NAMESPACE;
}

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const url = `${getBaseUrl()}${endpoint}`;
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.warn(`[Orca API] Failed to fetch ${endpoint}:`, error);
    return null;
  }
}

// ─── DATA NORMALIZERS ──────────────────────────────────────────
// These map plugin API field names to what the React components expect

export function normalizeBrand(b: any, full = false): any {
  const brand: any = {
    name: b.title || b.name || '',
    slug: b.slug || '',
    origin: b.origin || '',
    specialty: b.specialty || '',
    description: b.short_description || b.description || '',
    image: b.card_image || b.image || b.featured_image || '',
    category: b.categories?.[0]?.name || b.category || '',
    features: b.features || [],
  };
  if (full) {
    brand.fullDescription = b.full_description || b.fullDescription || brand.description;
    brand.cuts = b.cuts || [];
    // Gallery: API returns [{id, url, alt}], frontend expects string[]
    if (Array.isArray(b.gallery)) {
      brand.gallery = b.gallery.map((g: any) =>
        typeof g === 'string' ? g : g.url || ''
      ).filter(Boolean);
    } else {
      brand.gallery = [brand.image];
    }
  }
  return brand;
}

export function normalizeTestimonial(t: any): any {
  return {
    id: t.id,
    name: t.name || '',
    position: t.position || '',
    restaurant: t.company || t.restaurant || '',
    testimonial: t.text || t.testimonial || '',
    rating: t.rating || 5,
    date: t.date || '',
    image: t.image || '',
  };
}

export function normalizeStore(s: any): any {
  return {
    id: s.id,
    name: s.name || '',
    address_line1: s.address?.line1 || s.address_line1 || '',
    address_line2: s.address?.line2 || s.address_line2 || '',
    address_line3: s.address?.line3 || s.address_line3 || '',
    phone: s.phone || '',
    hours_weekday: s.hours?.weekday || s.hours_weekday || '',
    hours_weekend: s.hours?.weekend || s.hours_weekend || '',
    maps_url: s.maps_url || '',
    image: s.image || '',
    lat: s.coordinates?.lat || 0,
    lng: s.coordinates?.lng || 0,
  };
}

// Normalize CTA buttons: API {text, url} → FE {label, to, icon}
function normalizeButton(btn: any, fallbackIcon = ''): any {
  if (!btn) return null;
  return {
    label: btn.text || btn.label || '',
    to: btn.url || btn.to || '#',
    icon: btn.icon || fallbackIcon,
  };
}

// ─── LAYOUT / GLOBAL ──────────────────────────────────────────

export async function fetchLayout() {
  const data = await apiFetch<any>('/layout');
  if (!data) return null;
  return {
    settings: {
      logo_url: data.site?.logo_url || '',
      company_name: data.site?.company_name || '',
      company_description: data.site?.description || data.site?.tagline || '',
      contact_email: data.site?.email || '',
      contact_phone: data.site?.phone_main || '',
      contact_phone_sales: data.site?.phone_sales || '',
      contact_address: data.site?.address || '',
      instagram_url: data.site?.instagram_url || '',
      linkedin_url: data.site?.linkedin_url || '',
      youtube_video_url: data.site?.youtube_video_url || '',
      copyright_text: data.site?.copyright_text || '',
      powered_by_text: data.site?.powered_by_text || '',
      powered_by_url: data.site?.powered_by_url || '',
      google_maps_embed: data.site?.google_maps_embed || '',
    },
    navigation: {
      items: data.navigation?.items || [],
      cta: data.navigation?.cta_button || null,
    },
  };
}

// ─── HOME PAGE ──────────────────────────────────────────────────

export async function fetchHomePage() {
  const data = await apiFetch<any>('/page/home');
  if (!data) return null;

  // Normalize hero_content buttons
  const hc = data.hero_content || {};
  const heroContent = {
    ...hc,
    cta_primary: normalizeButton(hc.cta_primary, 'ri-arrow-right-line'),
    cta_secondary: normalizeButton(hc.cta_secondary, 'ri-phone-line'),
  };

  // Normalize CTA section buttons
  const cta = data.cta || {};
  const ctaNorm: any = {
    ...cta,
    primary_button: normalizeButton(cta.primary_button, 'ri-arrow-right-line'),
    secondary_button: normalizeButton(cta.secondary_button, 'ri-shopping-bag-line'),
  };
  // contact_methods: API .url → FE .href
  if (cta.contact_methods) {
    ctaNorm.contact_methods = cta.contact_methods.map((m: any) => ({
      ...m,
      href: m.url || m.href || '',
    }));
  }

  return {
    hero_slides: data.hero_slides,
    hero_content: heroContent,
    stats: data.stats,
    about: data.about,
    product_categories: data.product_categories,
    featured_brands: data.featured_brands?.map((b: any) => normalizeBrand(b)),
    why_orca: data.why_orca,
    experience: data.experience,
    team: data.team, // team fields already match
    cta: ctaNorm,
  };
}

// ─── PRODUCTS PAGE ──────────────────────────────────────────────

export async function fetchProductsPage() {
  const data = await apiFetch<any>('/page/products');
  if (!data) return null;

  return {
    page_settings: data.page_settings,
    brands: data.brands?.map((b: any) => normalizeBrand(b)) || [],
    brand_categories: data.brand_categories || [],
    // category_order from settings is comma-separated string
    category_order: data.page_settings?.category_order
      ? data.page_settings.category_order.split(',').map((s: string) => s.trim())
      : null,
  };
}

// ─── SINGLE BRAND ───────────────────────────────────────────────

export async function fetchBrandBySlug(slug: string) {
  const data = await apiFetch<any>(`/brands/${slug}`);
  if (!data) return null;
  return normalizeBrand(data, true);
}

// ─── RETAIL PAGE ────────────────────────────────────────────────

export async function fetchRetailPage() {
  const data = await apiFetch<any>('/page/retail');
  if (!data) return null;
  return {
    page_settings: data.page_settings,
    stores: data.stores?.map(normalizeStore) || [],
  };
}

// ─── TESTIMONIALS PAGE ──────────────────────────────────────────

export async function fetchTestimonialsPage() {
  const data = await apiFetch<any>('/page/testimonials');
  if (!data) return null;
  return {
    page_settings: data.page_settings,
    testimonials: data.testimonials?.map(normalizeTestimonial) || [],
  };
}

// ─── CONTACT PAGE ───────────────────────────────────────────────

export async function fetchContactPage() {
  const data = await apiFetch<any>('/page/contact');
  if (!data) return null;
  return {
    page_settings: data.page_settings,
    stores: data.stores?.map(normalizeStore) || [],
    contact_info: data.contact_info,
  };
}

// ─── STANDALONE ENDPOINTS ───────────────────────────────────────

export async function fetchAllBrands() {
  const data = await apiFetch<any[]>('/brands');
  if (!data) return null;
  return data.map((b: any) => normalizeBrand(b));
}

export async function fetchTeam() {
  return apiFetch<any[]>('/team');
}

export async function fetchTestimonials() {
  const data = await apiFetch<any[]>('/testimonials');
  if (!data) return null;
  return data.map(normalizeTestimonial);
}

export async function fetchStores() {
  const data = await apiFetch<any[]>('/stores');
  if (!data) return null;
  return data.map(normalizeStore);
}

export async function fetchSettings() {
  return apiFetch<any>('/settings');
}

// ─── CONTACT FORM ───────────────────────────────────────────────

export async function submitContactForm(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  inquiry_type?: string;
  message: string;
}) {
  try {
    const url = `${getBaseUrl()}/contact`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return { ok: response.ok, data: await response.json().catch(() => null) };
  } catch (error) {
    console.warn('[Orca API] Contact form submission failed:', error);
    return { ok: false, data: null };
  }
}
