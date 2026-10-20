
import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '../components/Layout';

const HomePage = lazy(() => import('../pages/home/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const ProductsPage = lazy(() => import('../pages/exclusive-brands/page'));
const ProductDetailPage = lazy(() => import('../pages/product-detail/page'));
const RetailPage = lazy(() => import('../pages/retail/page'));
const TestimonialsPage = lazy(() => import('../pages/testimonials/page'));
const SeafoodPage = lazy(() => import('../pages/categories/seafood/page'));
const MeatsPage = lazy(() => import('../pages/categories/meats/page'));
const SpecialtyPage = lazy(() => import('../pages/categories/specialty/page'));
const PrivacyPolicyPage = lazy(() => import('../pages/privacy-policy/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

function SuspenseWrap({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="min-h-screen bg-white" />}>{children}</Suspense>;
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <SuspenseWrap><Layout transparentHeader><HomePage /></Layout></SuspenseWrap>,
  },
  {
    path: '/contact-us',
    element: <SuspenseWrap><Layout><ContactPage /></Layout></SuspenseWrap>,
  },
  {
    path: '/products',
    element: <SuspenseWrap><Layout transparentHeader><ProductsPage /></Layout></SuspenseWrap>,
  },
  {
    path: '/products/:productSlug',
    element: <SuspenseWrap><Layout><ProductDetailPage /></Layout></SuspenseWrap>,
  },
  {
    path: '/retail',
    element: <SuspenseWrap><Layout transparentHeader><RetailPage /></Layout></SuspenseWrap>,
  },
  {
    path: '/testimonials',
    element: <SuspenseWrap><Layout transparentHeader><TestimonialsPage /></Layout></SuspenseWrap>,
  },
  {
    path: '/categories/seafood',
    element: <SuspenseWrap><Layout transparentHeader><SeafoodPage /></Layout></SuspenseWrap>,
  },
  {
    path: '/categories/meats',
    element: <SuspenseWrap><Layout transparentHeader><MeatsPage /></Layout></SuspenseWrap>,
  },
  {
    path: '/categories/specialty',
    element: <SuspenseWrap><Layout transparentHeader><SpecialtyPage /></Layout></SuspenseWrap>,
  },
  {
    path: '/privacy-policy',
    element: <SuspenseWrap><Layout><PrivacyPolicyPage /></Layout></SuspenseWrap>,
  },
  {
    path: '*',
    element: <SuspenseWrap><Layout><NotFound /></Layout></SuspenseWrap>,
  },
];

export default routes;
