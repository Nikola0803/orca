import { useState, useEffect } from 'react';
import { fetchHomePage } from '../../lib/api';
import { defaultHomePage, defaultBrands } from '../../lib/defaults';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WhyOrcaSection from './components/WhyOrcaSection';
import ExperienceSection from './components/ExperienceSection';
import FeaturedBrandsSection from './components/FeaturedBrandsSection';
import ProductCategoriesSection from './components/ProductCategoriesSection';
import StatsSection from './components/StatsSection';
import CTASection from './components/CTASection';
import TeamSection from './components/TeamSection';

export default function HomePage() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    fetchHomePage().then((data) => {
      if (data) setPageData(data);
    });
  }, []);

  // Merge API data with defaults - API data wins when present
  const d = pageData || {};

  return (
    <>
      <HeroSection data={d.hero_slides} content={d.hero_content} />
      <StatsSection data={d.stats} />
      <AboutSection data={d.about} />
      <ProductCategoriesSection data={d.product_categories} />
      <FeaturedBrandsSection data={d.featured_brands || undefined} />
      <WhyOrcaSection data={d.why_orca} />
      <ExperienceSection data={d.experience} />
      <TeamSection data={d.team} />
      <CTASection data={d.cta} />
    </>
  );
}
