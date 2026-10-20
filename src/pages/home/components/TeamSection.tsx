import { useState, useEffect, useRef } from 'react';
import { defaultHomePage } from '../../../lib/defaults';

interface TeamMember {
  name: string;
  position: string;
  image: string;
}

interface TeamSectionProps {
  data?: TeamMember[];
}

export default function TeamSection({ data }: TeamSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const teamMembers = data || defaultHomePage.team;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gray-300 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gray-400 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Meet the Experts
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our dedicated team of professionals brings decades of combined experience in premium food distribution, ensuring exceptional service and quality for every client.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member: any, index: number) => (
            <div
              key={member.name}
              className={`group relative transform transition-all duration-1000 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.position} at Orca Marketing`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-500/20 to-transparent" />
                </div>
                <div className="relative p-6 bg-gradient-to-br from-white to-gray-50">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-black to-gray-600" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-base text-gray-600 font-semibold mb-3">
                    {member.position}
                  </p>
                  <div className="w-12 h-1 bg-gradient-to-r from-black to-gray-500 rounded-full group-hover:w-full transition-all duration-500" />
                </div>
                <div className="absolute inset-0 border-2 border-gray-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <p className="text-lg text-gray-600 mb-8">
            Ready to work with Singapore's premier food distribution team?
          </p>
          <a
            href="/contact"
            className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-black to-gray-800 text-white text-base font-bold rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-300 whitespace-nowrap cursor-pointer shadow-2xl hover:shadow-gray-600/50 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10">Get in Touch</span>
            <i className="ri-arrow-right-line ml-3 text-xl relative z-10 group-hover:translate-x-1 transition-transform duration-300"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
