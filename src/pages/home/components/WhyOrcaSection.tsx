import { defaultHomePage } from '../../../lib/defaults';

interface WhyOrcaSectionProps {
  data?: typeof defaultHomePage.why_orca;
}

export default function WhyOrcaSection({ data }: WhyOrcaSectionProps) {
  const features = data || defaultHomePage.why_orca;

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Orca Advantage
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover what sets us apart as Singapore's premier food distribution partner and why leading restaurants and retailers trust Orca.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-gray-500/50 transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-black/20 rounded-2xl mb-6 group-hover:bg-black transition-all duration-300 group-hover:scale-110 transform border border-gray-500/30">
                <i className={`${feature.icon} text-3xl text-gray-400 group-hover:text-white transition-colors`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
