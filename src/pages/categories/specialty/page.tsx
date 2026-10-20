import React from 'react';
import { Link } from 'react-router-dom';
import { defaultHomePage } from '../../../lib/defaults';

const specialtyCategories = defaultHomePage.product_categories.filter(
  (c) => c.id === 3 || c.id === 6
);

const SpecialtyPage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/GOURMET-SPECIALTIES.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-4">
            Our Categories
          </p>
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
            Specialty <span className="font-bold text-gray-300">Products</span>
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
            Truffles, caviar, foie gras, and exclusive delicacies for the world's most discerning kitchens
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            Rare &amp; Gourmet Ingredients, <span className="font-semibold">At Your Fingertips</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            From black truffles to authentic Ibérico cured meats, our specialty range covers the ingredients
            that define fine dining. We source directly from origin producers and deliver to your kitchen
            in perfect condition.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { icon: 'ri-vip-crown-line', label: 'Gourmet Delicacies' },
              { icon: 'ri-global-line', label: 'International Cuisine' },
              { icon: 'ri-price-tag-3-line', label: 'Direct from Origin' },
              { icon: 'ri-shield-check-line', label: 'Fine Dining Grade' },
            ].map((tag, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-full px-5 py-2 text-sm font-medium text-gray-700">
                <i className={`${tag.icon} text-gray-500`} /> {tag.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light text-gray-900 text-center mb-12">
            Specialty <span className="font-semibold">Categories</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {specialtyCategories.map((category) => (
              <div
                key={category.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-11 h-11 bg-black rounded-full flex items-center justify-center text-white shadow-lg">
                      <i className={`${category.icon} text-lg`} />
                    </div>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-5 leading-relaxed">{category.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {category.items.map((item, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-black rounded-full mr-2 flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light text-gray-900 text-center mb-12">
            Signature <span className="font-semibold">Specialties</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Black Truffles', detail: 'Australian', icon: 'ri-vip-crown-line' },
              { name: 'Caviar', detail: 'Premium Grade', icon: 'ri-vip-crown-line' },
              { name: 'Specialty Sausages', detail: 'Handmade in Singapore', icon: 'ri-vip-crown-line' },
              { name: 'Red Wine Jus', detail: 'Chef Ready', icon: 'ri-restaurant-line' },
              { name: 'USDA Prime Beef', detail: 'American', icon: 'ri-global-line' },
              { name: 'Spanish Ibérico', detail: 'Acorn-Fed Pork', icon: 'ri-global-line' },
              { name: 'Sea Salt', detail: 'Natural Australian', icon: 'ri-vip-crown-line' },
              { name: 'Artisan Pies', detail: 'Handmade Australian', icon: 'ri-restaurant-line' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-5 text-center hover:bg-black hover:text-white transition-all duration-300 group"
              >
                <i className={`${item.icon} text-2xl mb-3 block text-gray-500 group-hover:text-white`} />
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-xs text-gray-500 group-hover:text-gray-300 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl font-light mb-4">Looking for Rare Ingredients?</h2>
          <p className="text-gray-300 text-lg mb-10">
            Our specialists can source hard-to-find gourmet ingredients for your restaurant or event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact-us"
              className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              <i className="ri-customer-service-line mr-3" />
              Contact Our Team
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              <i className="ri-book-open-line mr-3" />
              View All Brands
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpecialtyPage;
