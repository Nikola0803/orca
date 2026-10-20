import { useState, useEffect, useRef } from 'react';
import { defaultHomePage } from '../../../lib/defaults';

interface AboutSectionProps {
  data?: typeof defaultHomePage.about;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const about = data || defaultHomePage.about;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gray-100/30 rounded-full -translate-x-48 -translate-y-48 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-200/30 rounded-full translate-x-48 translate-y-48 blur-3xl" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'
          }`}>
            
            <h2 className="text-5xl font-black text-gray-900 mb-8 leading-tight">
              {about.title_line1}
              <br />
              <span className="text-black">{about.title_line2}</span>
              <br />
              {about.title_line3}
            </h2>
            
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              {about.paragraphs.map((p: string, i: number) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>

            {/* Key Points */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {about.key_points.map((point: any, i: number) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-100 text-black rounded-xl flex-shrink-0">
                    <i className={`${point.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{point.title}</h4>
                    <p className="text-gray-600">{point.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video/Image */}
          <div className={`relative transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
          }`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-800 rounded-3xl transform rotate-6 group-hover:rotate-3 transition-transform duration-500"></div>
              
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-80 rounded-2xl overflow-hidden">
                  <iframe
                    src={about.video_url}
                    title="Orca Marketing Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-2xl"
                    style={{ border: 'none' }}
                  />
                </div>
              </div>
              
              {/* Decorative badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-black to-gray-800 text-white rounded-xl">
                    <i className="ri-calendar-line text-2xl"></i>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-gray-900">{about.years_number}</div>
                    <div className="text-sm text-gray-600 font-medium">{about.years_label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
