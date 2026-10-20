import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

export default function Footer() {
  const { settings, navigation } = useSite();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Company Info */}
          <div className="space-y-6">
            <img
              src='https://orca.com.sg/wp-content/uploads/2026/02/orca-logo-white-5.png'
              alt={settings.company_name}
              className="h-12 brightness-0 invert hover:scale-110 transition-transform duration-300"
            />
            <p className="text-gray-300 text-base leading-relaxed">
              {settings.company_description}
            </p>
            <div className="flex space-x-4">
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-full hover:from-teal-600 hover:to-teal-500 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:-translate-y-1 group"
                >
                  <i className="ri-instagram-line text-xl group-hover:scale-110 transition-transform duration-300"></i>
                </a>
              )}
              {settings.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-full hover:from-blue-600 hover:to-blue-500 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:-translate-y-1 group"
                >
                  <i className="ri-linkedin-fill text-xl group-hover:scale-110 transition-transform duration-300"></i>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-white to-gray-400 mt-2"></div>
            </h4>
            <ul className="space-y-4">
              {navigation.items.slice(0, 3).map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group text-gray-300 text-base hover:text-white transition-all duration-300 cursor-pointer inline-flex items-center"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white relative">
              Services
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 mt-2"></div>
            </h4>
            <ul className="space-y-4">
              {navigation.items.slice(3).map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group text-gray-300 text-base hover:text-gray-400 transition-all duration-300 cursor-pointer inline-flex items-center"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                  </Link>
                </li>
              ))}
              {navigation.cta && (
                <li>
                  <Link
                    to={navigation.cta.to}
                    className="group text-gray-300 text-base hover:text-gray-500 transition-all duration-300 cursor-pointer inline-flex items-center"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{navigation.cta.label}</span>
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/categories/seafood"
                  className="group text-gray-300 text-base hover:text-gray-400 transition-all duration-300 cursor-pointer inline-flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Premium Seafood</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/meats"
                  className="group text-gray-300 text-base hover:text-gray-400 transition-all duration-300 cursor-pointer inline-flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Quality Meats</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/specialty"
                  className="group text-gray-300 text-base hover:text-gray-400 transition-all duration-300 cursor-pointer inline-flex items-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Specialty Products</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white relative">
              Contact Info
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-gray-500 to-gray-700 mt-2"></div>
            </h4>
            <div className="space-y-6">
              <div className="flex items-start group">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-gray-600/20 to-gray-700/20 backdrop-blur-md rounded-xl mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-map-pin-line text-gray-400 text-xl"></i>
                </div>
                <div>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {settings.contact_address}
                  </p>
                </div>
              </div>
              <div className="flex items-center group">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-gray-600/20 to-gray-700/20 backdrop-blur-md rounded-xl mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <i className="ri-mail-line text-gray-400 text-xl"></i>
                </div>
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="text-gray-300 text-base hover:text-gray-400 transition-colors cursor-pointer"
                >
                  {settings.contact_email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-base">
              {settings.copyright_text}
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy-policy"
                className="text-gray-400 text-base hover:text-white transition-all duration-300"
              >
                Privacy Policy
              </Link>
              <a
                href={settings.powered_by_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 text-base hover:text-white transition-all duration-300 cursor-pointer hover:scale-105 transform"
              >
                {settings.powered_by_text}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
