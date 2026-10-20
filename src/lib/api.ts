import {
  defaultLayout,
  defaultHomePage,
  defaultBrands,
  defaultCategoryOrder,
  defaultStores,
  defaultTestimonials,
} from './defaults';

export async function fetchLayout() {
  return defaultLayout;
}

export async function fetchHomePage() {
  return defaultHomePage;
}

export async function fetchProductsPage() {
  return {
    page_settings: {},
    brands: defaultBrands,
    brand_categories: [...new Set(defaultBrands.map(b => b.category))],
    category_order: defaultCategoryOrder,
  };
}

export async function fetchBrandBySlug(slug: string) {
  return defaultBrands.find(b => b.slug === slug) ?? null;
}

export async function fetchRetailPage() {
  return {
    page_settings: {},
    stores: defaultStores,
  };
}

export async function fetchTestimonialsPage() {
  return {
    page_settings: {},
    testimonials: defaultTestimonials,
  };
}

export async function fetchContactPage() {
  return {
    page_settings: {},
    stores: defaultStores,
    contact_info: null,
  };
}

export async function fetchAllBrands() {
  return defaultBrands;
}

export async function fetchTeam() {
  return defaultHomePage.team;
}

export async function fetchTestimonials() {
  return defaultTestimonials;
}

export async function fetchStores() {
  return defaultStores;
}

export async function fetchSettings() {
  return defaultLayout.settings;
}

export async function submitContactForm(_data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  inquiry_type?: string;
  message: string;
}) {
  return { ok: false, data: null };
}
