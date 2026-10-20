import React from 'react';
import { Link } from 'react-router-dom';
import { defaultHomePage, defaultBrands } from '../../../lib/defaults';

const seafoodCategories = defaultHomePage.product_categories.filter(
  (c) => c.id === 2 || c.id === 5
);

const seafoodBrands = defaultBrands.filter((b) =>
  ['Fresh Seafood', 'Seafood', 'Premium Seafood'].some((kw) =>
    b.category?.toLowerCase().includes('seafood')
  )
);

const SeafoodPage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://orca.com.sg/wp-content/uploads/2026/02/FRESH-SEAFOOD-1-2.png')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-4">
            Our Categories
          </p>
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
            Premium <span className="font-bold text-gray-300">Seafood</span>
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
            Ocean-fresh fish, premium shellfish, and wild Caught selections delivered daily from global waters
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            The Finest Seafood, <span className="font-semibold">Sourced Globally</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            From New Zealand King Salmon to live Australian Marron, Orca Marketing sources premium
            seafood from trusted, sustainable suppliers worldwide. Every product is handled under
            strict cold-chain protocols to ensure freshness from sea to kitchen.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-5 py-2 text-sm font-medium text-gray-700">
              <i className="ri-anchor-line text-gray-500" /> Wild Caught
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-5 py-2 text-sm font-medium text-gray-700">
              <i className="ri-leaf-line text-gray-500" /> Sustainably Sourced
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-5 py-2 text-sm font-medium text-gray-700">
              <i className="ri-temp-cold-line text-gray-500" /> Cold-Chain Delivered
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-5 py-2 text-sm font-medium text-gray-700">
              <i className="ri-shield-check-line text-gray-500" /> Quality Certified
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light text-gray-900 text-center mb-12">
            Seafood <span className="font-semibold">Categories</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {seafoodCategories.map((category) => (
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

      {/* Popular Items */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light text-gray-900 text-center mb-12">
            Popular <span className="font-semibold">Seafood Items</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'NZ King Salmon', detail: 'Chilled & Frozen', icon: 'ri-anchor-line' },
              { name: 'Live Marron', detail: 'Australian', icon: 'ri-anchor-line' },
              { name: 'Murray Cod', detail: 'Freshwater', icon: 'ri-anchor-line' },
              { name: 'Australian Octopus', detail: 'Wild Caught', icon: 'ri-anchor-line' },
              { name: 'King Prawns', detail: 'Snap Frozen', icon: 'ri-anchor-line' },
              { name: 'Barramundi', detail: 'BAP Certified', icon: 'ri-anchor-line' },
              { name: 'Sustainable Seafood', detail: 'Eco-Certified', icon: 'ri-leaf-line' },
              { name: 'Australian Tuna', detail: 'Wild Caught', icon: 'ri-vip-crown-line' },
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
          <h2 className="text-3xl font-light mb-4">
            Ready to Order Premium Seafood?
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Talk to our team about your seafood requirements, volumes, and delivery schedule.
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

export default SeafoodPage;
