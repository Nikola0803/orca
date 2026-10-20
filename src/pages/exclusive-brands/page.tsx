import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProductsPage } from '../../lib/api';
import { defaultBrands, defaultCategoryOrder } from '../../lib/defaults';

const ExclusiveBrandsPage: React.FC = () => {
  const [brands, setBrands] = useState<any[]>(defaultBrands);
  const [categoryOrder, setCategoryOrder] = useState<string[]>(defaultCategoryOrder);

  useEffect(() => {
    fetchProductsPage().then((data) => {
      if (data) {
        if (data.brands?.length) setBrands(data.brands);
        if (data.category_order?.length) setCategoryOrder(data.category_order);
      }
    });
  }, []);

  const brandsByCategory = brands.reduce((acc: Record<string, any[]>, brand: any) => {
    if (!acc[brand.category]) acc[brand.category] = [];
    acc[brand.category].push(brand);
    return acc;
  }, {});

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://orca.com.sg/wp-content/uploads/2026/02/Portoro-Beef-1-1.jpg')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">Our Exclusive <span className="font-bold text-gray-300">Brands</span></h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">Representing the world's finest producers of premium meats, seafood, and specialty products</p>
        </div>
      </section>

      {/* Brands by Category */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">World-Class <span className="font-semibold text-black">Partners</span></h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We represent over 30 premium brands from around the world, each selected for their exceptional quality, consistency, and commitment to excellence.
            </p>
          </div>

          {categoryOrder.map((category) => {
            const categoryBrands = brandsByCategory[category];
            if (!categoryBrands) return null;

            return (
              <div key={category} className="mb-24">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-light text-gray-800 mb-4">{category}</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-black to-gray-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {categoryBrands.map((brand: any, index: number) => (
                    <Link
                      to={`/products/${brand.slug}`}
                      key={index} 
                      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                    >
                      <div className="relative h-64 bg-gray-100 overflow-hidden">
                        <img src={brand.image} alt={brand.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-4 right-4">
                          <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-black text-xs font-bold rounded-full shadow-lg">{brand.origin}</span>
                        </div>
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="px-4 py-2 bg-black text-white text-xs font-bold rounded-full flex items-center">
                            View Details
                            <i className="ri-arrow-right-line ml-2"></i>
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-black transition-colors duration-300">{brand.name}</h4>
                        <div className="flex items-center mb-3">
                          <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
                          <p className="text-black text-sm font-semibold">{brand.specialty}</p>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{brand.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Quality Assurance Section */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 mt-20 shadow-xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-light text-gray-800 mb-4">Quality <span className="font-semibold text-black">Assurance</span></h3>
              <p className="text-gray-600 max-w-2xl mx-auto">Every brand we represent meets our stringent quality standards and shares our commitment to excellence.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-shield-check-line text-3xl text-white"></i>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Certified Quality</h4>
                <p className="text-gray-600 leading-relaxed">All products meet international quality and safety standards</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-truck-line text-3xl text-white"></i>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Cold Chain</h4>
                <p className="text-gray-600 leading-relaxed">Maintained temperature control from source to delivery</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-time-line text-3xl text-white"></i>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Freshness</h4>
                <p className="text-gray-600 leading-relaxed">Same-day delivery ensures maximum freshness</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-800 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h3 className="text-3xl md:text-4xl font-light text-white mb-6">Ready to Experience Premium Quality?</h3>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Contact us to learn more about our exclusive brands and availability</p>
          <Link
            to="/contact-us" 
            className="inline-flex items-center px-10 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 whitespace-nowrap group"
          >
            Get In Touch
            <i className="ri-arrow-right-line ml-3 text-xl group-hover:translate-x-1 transition-transform duration-300"></i>
          </Link>
        </div>
      </section>
    </>
  );
};

export default ExclusiveBrandsPage;
