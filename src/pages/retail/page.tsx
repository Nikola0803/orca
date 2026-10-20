import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchRetailPage } from '../../lib/api';
import { defaultStores } from '../../lib/defaults';

const RetailPage: React.FC = () => {
  const [stores, setStores] = useState<any[]>(defaultStores);

  useEffect(() => {
    fetchRetailPage().then((data) => {
      if (data?.stores?.length) setStores(data.stores);
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://orca.com.sg/wp-content/uploads/2026/02/Olssons-2.webp)` }}>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl font-light mb-4">Butcher Box Retail Stores</h1>
          <p className="text-xl font-light">Visit our retail locations to pick up premium products</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light text-gray-800 mb-8">About Our Retail Stores</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              While Orca Marketing specializes in wholesale food distribution to restaurants and businesses, 
              we also operate <strong>Butcher Box retail stores</strong> where individual customers can purchase 
              premium meats, seafood, and specialty products directly.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Visit any of our Butcher Box locations across Singapore to browse our selection, 
              place orders, and pick up your premium products.
            </p>
          </div>
        </div>
      </section>

      {/* Retail Stores */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Visit Our Retail Stores</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {stores.map((store: any, index: number) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                  <div className="w-full h-64 overflow-hidden">
                    <img src={store.image} alt={store.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <i className="ri-store-2-line text-black mr-2"></i>
                      {store.name}
                    </h3>
                    <div className="space-y-3 flex-1">
                      <div className="flex items-start text-gray-700 min-h-[80px]">
                        <i className="ri-map-pin-line text-black mt-1 mr-2 flex-shrink-0"></i>
                        <div>
                          <p>{store.address_line1}</p>
                          {store.address_line2 && <p>{store.address_line2}</p>}
                          <p>{store.address_line3}</p>
                        </div>
                      </div>
                      <p className="flex items-center text-gray-700">
                        <i className="ri-phone-line text-black mr-2"></i>
                        {store.phone}
                      </p>
                      <div className="flex items-start text-gray-700">
                        <i className="ri-time-line text-black mt-1 mr-2 flex-shrink-0"></i>
                        <div>
                          <p><strong>Mon - Fri:</strong> {store.hours_weekday}</p>
                          <p><strong>Sat, Sun & PH:</strong> {store.hours_weekend}</p>
                        </div>
                      </div>
                    </div>
                    <a href={store.maps_url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer text-center">
                      Get Directions
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale Notice */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-information-line text-4xl text-white"></i>
            </div>
            <h3 className="text-3xl font-light mb-6">Looking for Wholesale?</h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Butcher Box retail stores serve individual customers and home cooks. 
              If you're a restaurant, hotel, or business looking for wholesale food distribution services, 
              please contact Orca Marketing directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-us" className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap cursor-pointer">Contact for Wholesale</Link>
              <Link to="/products" className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap cursor-pointer">View Our Products</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RetailPage;
