import { Link } from 'react-router-dom';
import { defaultHomePage } from '../../../lib/defaults';

interface ProductCategoriesSectionProps {
  data?: typeof defaultHomePage.product_categories;
}

export default function ProductCategoriesSection({ data }: ProductCategoriesSectionProps) {
  const categories = data || defaultHomePage.product_categories;

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Exceptional Quality in Every Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From prime cuts to ocean-fresh seafood, we source the finest ingredients 
            from trusted suppliers worldwide to meet your culinary standards.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shadow-lg">
                    <i className={`${category.icon} text-xl`}></i>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-black transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Items List */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {category.items.map((item, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-black rounded-full mr-2 flex-shrink-0"></div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  to="/products"
                  className="group/btn inline-flex items-center text-black hover:text-gray-700 font-semibold transition-colors duration-300 cursor-pointer"
                >
                  <span className="mr-2">Explore Products</span>
                  <i className="ri-arrow-right-line group-hover/btn:translate-x-1 transition-transform duration-300"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-black rounded-2xl p-12 text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-light mb-4">
              Need Custom Sourcing?
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Can't find what you're looking for? We'll work with you to source the right premium ingredients to match your exact needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg transform hover:scale-105"
              >
                <i className="ri-customer-service-line mr-3"></i>
                <span>Request Custom Quote</span>
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-book-open-line mr-3"></i>
                <span>View Full Catalog</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
