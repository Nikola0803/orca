import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { defaultBrands } from '../../../lib/defaults';

interface FeaturedBrandsSectionProps {
  data?: any[];
}

const FeaturedBrandsSection: React.FC<FeaturedBrandsSectionProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const allBrands = data || defaultBrands;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('featured-brands');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const brands = allBrands.map(b => ({
    name: b.name,
    category: b.category,
    image: b.image,
  }));

  const doubledBrands = [...brands, ...brands];

  return (
    <section id="featured-brands" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gray-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gray-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl font-light text-gray-800 mb-6">
            Our <span className="text-black font-medium">Premium Brands</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            We proudly represent over 30 world class brands, each carefully selected for their exceptional quality, 
            consistency, and commitment to culinary excellence.
          </p>
        </div>

        <div className={`relative transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="overflow-hidden">
            <div className="flex animate-scroll">
              {doubledBrands.map((brand, index) => (
                <div key={`${brand.name}-${index}`} className="flex-shrink-0 w-80 mx-4 group">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-105">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 relative overflow-hidden">
                      <img src={brand.image} alt={brand.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-black transition-colors duration-300">
                          {brand.name}
                        </h3>
                      </div>
                      <p className="text-sm text-black font-medium mb-3">{brand.category}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <i className="ri-star-fill text-yellow-400 mr-1"></i>
                        <span>Premium Quality</span>
                        <span className="mx-2">•</span>
                        <span>Trusted Partner</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>

        <div className={`mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-2">30+</div>
            <div className="text-sm text-gray-600">Premium Brands</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 mb-2">500+</div>
            <div className="text-sm text-gray-600">Active Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-700 mb-2">15+</div>
            <div className="text-sm text-gray-600">Years Partnership</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">Quality Assured</div>
          </div>
        </div>

        <div className={`text-center mt-12 transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-black to-gray-800 text-white font-medium rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer whitespace-nowrap group"
          >
            Explore All Brands
            <i className="ri-arrow-right-line ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default FeaturedBrandsSection;
