import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

interface LayoutProps {
  children: ReactNode;
  /** If true, header starts transparent (for pages with hero banners) */
  transparentHeader?: boolean;
}

export default function Layout({ children, transparentHeader = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Header transparent={transparentHeader} />
      {children}
      <Footer />
    </div>
  );
}
