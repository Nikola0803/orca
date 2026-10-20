import { defaultHomePage } from '../../../lib/defaults';

interface ExperienceSectionProps {
  data?: typeof defaultHomePage.experience;
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
  const experience = data || defaultHomePage.experience;
  const values = experience.values || [];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {experience.title || 'Excellence in Food Distribution'}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {experience.description || "Since 2009, Orca has been at the forefront of Singapore's food distribution industry, building a reputation for quality, reliability, and exceptional service."}
            </p>
            <div className="space-y-4">
              {values.map((value: any, index: number) => (
                <div key={index} className="flex items-start group cursor-pointer">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl mr-4 flex-shrink-0 group-hover:bg-black transition-all duration-300">
                    <i className={`${value.icon} text-xl text-black group-hover:text-white transition-colors`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-black transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-gray-100 rounded-full opacity-50 filter blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gray-200 rounded-full opacity-50 filter blur-3xl"></div>
              
              <div className="relative bg-gradient-to-br from-gray-600 to-gray-700 rounded-3xl p-12 shadow-2xl">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full mb-6 border-4 border-white/30">
                    <div className="text-6xl font-bold text-white">{experience.highlight_number || '15'}</div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {experience.highlight_title || 'Years of Excellence'}
                  </h3>
                  <p className="text-gray-50 text-base leading-relaxed mb-8">
                    {experience.highlight_description || "Serving Singapore's finest restaurants, hotels, and retailers with premium quality products and unmatched service."}
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
