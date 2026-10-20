import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { defaultHomePage } from '../../../lib/defaults';

interface HeroSectionProps {
  data?: typeof defaultHomePage.hero_slides;
  content?: typeof defaultHomePage.hero_content;
}

export default function HeroSection({ data, content }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = data || defaultHomePage.hero_slides;
  const heroContent = content || defaultHomePage.hero_content;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          </div>
        ))}
      </div>

      {/* Floating Elements - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-20 pb-28 md:pt-0 md:pb-0">
        <div className="max-w-4xl">
          {/* Main Headlines */}
          <div className={`transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-white mb-4 md:mb-8 leading-[0.9] tracking-tight">
              <span className="text-gray-300 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light block mb-2 md:mb-4">
                {heroContent.headline}
              </span>
            </h1>
          </div>

          {/* Description */}
          <div className={`transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <p className="text-base sm:text-lg md:text-2xl text-gray-200 mb-6 md:mb-12 leading-relaxed max-w-3xl font-light"
              dangerouslySetInnerHTML={{ __html: heroContent.description }}
            />
          </div>

          {/* Quality Badges */}
          <div className={`flex flex-wrap gap-2 sm:gap-3 md:gap-6 mb-6 md:mb-12 transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {heroContent.badges.map((badge: any, i: number) => (
              <div key={i} className="flex items-center space-x-2 md:space-x-3 px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <i className={`${badge.icon} text-lg md:text-2xl text-white`}></i>
                <span className="text-white text-xs sm:text-sm md:text-base font-semibold">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className={`flex flex-col sm:flex-row flex-wrap gap-3 md:gap-6 transform transition-all duration-1000 delay-800 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <Link
              to={heroContent.cta_primary.to}
              className="group relative px-6 sm:px-8 md:px-12 py-4 md:py-6 bg-white text-black text-sm sm:text-base md:text-lg font-bold rounded-full hover:bg-gray-100 transition-all duration-300 whitespace-nowrap cursor-pointer shadow-2xl hover:shadow-white/50 transform hover:-translate-y-2 hover:scale-105 inline-flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10">{heroContent.cta_primary.label}</span>
              <i className={`${heroContent.cta_primary.icon} ml-3 md:ml-4 text-xl md:text-2xl relative z-10 group-hover:translate-x-2 transition-transform duration-300`}></i>
            </Link>
            
            <Link
              to={heroContent.cta_secondary.to}
              className="group relative px-6 sm:px-8 md:px-12 py-4 md:py-6 bg-white/10 backdrop-blur-md text-white text-sm sm:text-base md:text-lg font-bold rounded-full hover:bg-white/20 transition-all duration-300 whitespace-nowrap cursor-pointer border-2 border-white/20 hover:border-white/40 transform hover:-translate-y-2 hover:scale-105 inline-flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="relative z-10">{heroContent.cta_secondary.label}</span>
              <i className={`${heroContent.cta_secondary.icon} ml-3 md:ml-4 text-xl md:text-2xl relative z-10 group-hover:rotate-12 transition-transform duration-300`}></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Controls - hidden on mobile, visible on md+ */}
      <div className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col space-y-4 z-20">
        <button
          onClick={prevSlide}
          className="w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 rounded-full border border-white/20 hover:scale-110 cursor-pointer group"
          aria-label="Previous slide"
        >
          <i className="ri-arrow-left-line text-2xl group-hover:-translate-x-1 transition-transform duration-300"></i>
        </button>
        <button
          onClick={nextSlide}
          className="w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 rounded-full border border-white/20 hover:scale-110 cursor-pointer group"
          aria-label="Next slide"
        >
          <i className="ri-arrow-right-line text-2xl group-hover:translate-x-1 transition-transform duration-300"></i>
        </button>
      </div>

      {/* Slide Indicators */}
      <div className={`absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20 transition-all duration-1000 delay-1200 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide
                ? 'bg-white shadow-lg shadow-white/50'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}