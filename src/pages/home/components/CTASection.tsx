import { Link } from 'react-router-dom';
import { defaultHomePage } from '../../../lib/defaults';

interface CTASectionProps {
  data?: typeof defaultHomePage.cta;
}

export default function CTASection({ data }: CTASectionProps) {
  const cta = data || defaultHomePage.cta;
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-600 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {cta.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            {cta.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to={cta.primary_button.to}
              className="px-10 py-5 bg-black text-white text-base font-bold rounded-full hover:bg-gray-800 transition-all duration-300 whitespace-nowrap cursor-pointer shadow-2xl hover:shadow-black/50 transform hover:-translate-y-1 inline-flex items-center"
            >
              {cta.primary_button.label}
              <i className={`${cta.primary_button.icon} ml-2 text-xl`}></i>
            </Link>
            <Link
              to={cta.secondary_button.to}
              className="px-10 py-5 bg-white/10 backdrop-blur-md text-white text-base font-bold rounded-full hover:bg-white/20 transition-all duration-300 whitespace-nowrap cursor-pointer border-2 border-white/30 hover:border-white/50 transform hover:-translate-y-1 inline-flex items-center"
            >
              {cta.secondary_button.label}
              <i className={`${cta.secondary_button.icon} ml-2 text-xl`}></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
            {cta.contact_methods.map((method: any, i: number) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl mx-auto mb-4 border border-gray-500/30">
                  <i className={`${method.icon} text-3xl text-gray-400`}></i>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{method.title}</h3>
                {method.href ? (
                  <a href={method.href} className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">
                    {method.text}
                  </a>
                ) : (
                  <p className="text-gray-400 text-sm">{method.text}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
