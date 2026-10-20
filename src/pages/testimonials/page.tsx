import React, { useState, useEffect } from 'react';
import { fetchTestimonialsPage } from '../../lib/api';
import { defaultTestimonials } from '../../lib/defaults';

const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>(defaultTestimonials);

  const stats = [
    { number: '500+', label: 'Restaurant Partners' },
    { number: '15+', label: 'Years of Service' },
    { number: '30+', label: 'Premium Brands' },
    { number: '6-Days', label: 'Delivery Schedule' }
  ];

  useEffect(() => {
    fetchTestimonialsPage().then((data) => {
      if (data?.testimonials?.length) {
        setTestimonials(data.testimonials);
      }
    });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-top" style={{ backgroundImage: `url(https://orca.com.sg/wp-content/uploads/2026/02/JBS-King-Island_.png)` }}>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-light mb-4">Testimonials</h1>
          <p className="text-xl font-light">What our partners say about us</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl md:text-5xl font-light mb-2">{stat.number}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-6">Client Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Hear from our valued partners about their experience working with Orca Marketing</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {testimonials.map((t: any) => (
              <div key={t.id} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-yellow-400 text-lg"></i>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">"{t.testimonial}"</p>
                {t.date && <p className="text-sm text-gray-500 mb-4">{t.date}</p>}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{t.name}</h4>
                    <p className="text-sm text-gray-600">{t.position}</p>
                    <p className="text-sm text-black font-medium">{t.restaurant}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-light text-gray-800 mb-6">Why Clients Trust Orca</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'ri-shield-check-line', title: 'Reliable Quality', text: "Consistent premium quality that restaurants can depend on" },
              { icon: 'ri-time-line', title: 'Timely Delivery', text: "Same-day delivery ensures fresh products when you need them" },
              { icon: 'ri-customer-service-2-line', title: 'Personal Service', text: "Dedicated account management and responsive support" },
              { icon: 'ri-global-line', title: 'Global Network', text: "Access to premium suppliers from Australia, USA, Japan, and New Zealand" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`${item.icon} text-3xl text-black`}></i>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-light text-white mb-4">Ready to Join Our Success Stories?</h3>
          <p className="text-xl text-gray-300 mb-8">Discover how Orca can elevate your restaurant's offerings</p>
          <a href="/contact-us" className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap">Start Your Partnership</a>
        </div>
      </section>
    </>
  );
};

export default TestimonialsPage;
