import { useState, useEffect, useRef } from 'react';
import { defaultHomePage } from '../../../lib/defaults';

interface StatsSectionProps {
  data?: typeof defaultHomePage.stats;
}

export default function StatsSection({ data }: StatsSectionProps) {
  const statsData = data || defaultHomePage.stats;
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    years: 0,
    products: 0,
    clients: 0,
    support: 0
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start counting animation
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const items = statsData.items;
    const targets = {
      years: items[0]?.number || 15,
      products: items[1]?.number || 500,
      clients: items[2]?.number || 1000,
      support: items[3]?.number || 24
    };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        years: Math.floor(targets.years * progress),
        products: Math.floor(targets.products * progress),
        clients: Math.floor(targets.clients * progress),
        support: Math.floor(targets.support * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, stepTime);
  };

  const stats = statsData.items.map((item: any, i: number) => {
    const counterKeys = ['years', 'products', 'clients', 'support'] as const;
    return {
      number: counters[counterKeys[i]] || 0,
      suffix: item.suffix,
      label: item.label,
      description: item.description,
      icon: item.icon,
      color: item.color,
    };
  });

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          <h2 className="text-5xl font-black text-white mb-6">
            {statsData.title_line1}
            <br />
            <span className="text-gray-300">{statsData.title_line2}</span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {statsData.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-2xl border border-white/30 group-hover:from-white/30 group-hover:to-white/20 transition-all duration-300" />
                
                <div className="relative p-8 text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-r ${stat.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <i className={`${stat.icon} text-3xl text-white`}></i>
                    </div>
                  </div>

                  {/* Number */}
                  <div className="mb-4">
                    <span className="text-5xl font-black text-white group-hover:scale-110 transition-transform duration-300 inline-block">
                      {stat.number}
                    </span>
                    <span className="text-3xl font-bold text-gray-300 ml-1">
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/70 text-sm font-medium">
                    {stat.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <p className="text-white/80 text-lg mb-8">
            Ready to experience the Orca difference?
          </p>
          <a
            href="/contact-us"
            className="group inline-flex items-center px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-100 transition-all duration-300 whitespace-nowrap cursor-pointer shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105"
          >
            <span>Get Started Today</span>
            <i className="ri-arrow-right-line ml-3 text-xl group-hover:translate-x-2 transition-transform duration-300"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
