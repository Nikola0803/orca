import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

interface HeaderProps {
  /** If true, header starts transparent and becomes solid on scroll (for pages with hero) */
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const { settings, navigation } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = transparent && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center relative z-10 group">
            <img
              src='https://orca.com.sg/wp-content/uploads/2026/02/orca-logo-black-3.png'
              alt={`${settings.company_name} Premium Food Distribution Singapore`}
              className={`h-12 transition-all duration-500 group-hover:scale-110 ${
                isTransparent ? 'brightness-0 invert' : 'brightness-100'
              }`}
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-12">
            {navigation.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`relative text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer group ${
                  isTransparent ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-black'
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-black to-gray-600 transition-all duration-300 group-hover:w-full" />
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent transition-all duration-300 group-hover:w-full transform -translate-x-1/2 opacity-50" />
              </Link>
            ))}

            <Link
              to={navigation.cta.to}
              className="group relative px-8 py-3 bg-gradient-to-r from-black to-gray-800 text-white text-sm font-semibold rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-300 whitespace-nowrap cursor-pointer shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <span className="relative z-10">{navigation.cta.label}</span>
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden w-12 h-12 flex items-center justify-center cursor-pointer rounded-full transition-all duration-300 hover:scale-110 ${
              isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'
            }`}
            aria-label="Toggle menu"
          >
            <i className={`text-2xl transition-transform duration-300 ${
              mobileMenuOpen ? 'ri-close-line rotate-180' : 'ri-menu-line'
            }`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
        mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl">
          <nav className="container mx-auto px-6 py-8 space-y-6">
            {navigation.items.map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                className={`block text-base font-semibold text-gray-900 hover:text-black transition-all duration-300 cursor-pointer transform hover:translate-x-2 ${
                  mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to={navigation.cta.to}
              className={`block px-8 py-4 bg-gradient-to-r from-black to-gray-800 text-white text-base font-semibold rounded-2xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 text-center cursor-pointer shadow-xl transform hover:scale-105 ${
                mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: '500ms' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {navigation.cta.label}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
