import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBrandBySlug } from '../../lib/api';
import { defaultBrands } from '../../lib/defaults';
import { submitContactForm } from '../../lib/api';

export default function ProductDetailPage() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try API first, fall back to defaults
    fetchBrandBySlug(productSlug || '').then((data) => {
      if (data) {
        setProduct(data);
      } else {
        // Fallback to defaults
        const found = defaultBrands.find(b => b.slug === productSlug);
        setProduct(found || null);
      }
      setLoading(false);
    });
  }, [productSlug]);

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center pt-20"><div className="text-gray-400">Loading...</div></div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link to="/products" className="text-black hover:underline">← Back to Products</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = defaultBrands
    .filter(p => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 500) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const result = await submitContactForm({
        ...formData,
        inquiry_type: 'product_enquiry',
        message: `[Product: ${product.name}] ${formData.message}`,
      });

      if (result.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        setTimeout(() => {
          setShowEnquiryModal(false);
          setSubmitSuccess(false);
        }, 2500);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const gallery = product.gallery?.length ? product.gallery : [product.image];

  return (
    <>
      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isSubmitting && setShowEnquiryModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-8 pt-8 pb-4 border-b border-gray-100 rounded-t-3xl">
              <button onClick={() => !isSubmitting && setShowEnquiryModal(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
                <i className="ri-close-line text-xl text-gray-600"></i>
              </button>
              <h3 className="text-2xl font-bold text-gray-900">Product Enquiry</h3>
              <p className="text-gray-500 mt-1">We'll get back to you within 24 hours</p>
            </div>
            <div className="px-8 py-6">
              {submitSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-4xl text-green-600"></i>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Enquiry Sent!</h4>
                  <p className="text-gray-600">Thank you for your interest. Our team will contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitEnquiry} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product</label>
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium">{product.name}</div>
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all" placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all" placeholder="+65 XXXX XXXX" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all" placeholder="Your company or restaurant" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={4} maxLength={500} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all resize-none" placeholder="Tell us about your requirements..." />
                    <p className="text-xs text-gray-400 mt-1 text-right">{formData.message.length}/500</p>
                  </div>
                  {submitError && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">Something went wrong. Please try again.</div>}
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-gradient-to-r from-black to-gray-800 text-white font-semibold rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? <span className="flex items-center justify-center"><i className="ri-loader-4-line animate-spin mr-2"></i>Sending...</span> : 'Send Enquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="pt-24 bg-gray-50">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-black transition-colors cursor-pointer">Home</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <Link to="/products" className="text-gray-500 hover:text-black transition-colors cursor-pointer">Products</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-black font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl mb-4 relative group">
                <img src={gallery[activeImageIndex]} alt={`${product.name} - Image ${activeImageIndex + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {gallery.length > 1 && (
                  <>
                    <button onClick={() => setActiveImageIndex(prev => prev === 0 ? gallery.length - 1 : prev - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 cursor-pointer">
                      <i className="ri-arrow-left-s-line text-xl text-gray-800"></i>
                    </button>
                    <button onClick={() => setActiveImageIndex(prev => prev === gallery.length - 1 ? 0 : prev + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 cursor-pointer">
                      <i className="ri-arrow-right-s-line text-xl text-gray-800"></i>
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {activeImageIndex + 1} / {gallery.length}
                    </div>
                  </>
                )}
              </div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {gallery.map((img: string, index: number) => (
                    <button key={index} onClick={() => setActiveImageIndex(index)} className={`aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${activeImageIndex === index ? 'ring-2 ring-black ring-offset-2 shadow-lg scale-[1.02]' : 'opacity-60 hover:opacity-100 hover:shadow-md'}`}>
                      <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              <div className="absolute top-6 right-6">
                <span className="px-6 py-3 bg-white/95 backdrop-blur-sm text-black text-sm font-bold rounded-full shadow-lg">{product.origin}</span>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">{product.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-black rounded-full mr-3"></div>
                <p className="text-black text-lg font-semibold">{product.specialty}</p>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{product.fullDescription}</p>

              {product.features?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Key Features</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.features.map((feature: string, index: number) => (
                      <span key={index} className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium rounded-full">{feature}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setShowEnquiryModal(true)} className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-black to-gray-800 text-white font-semibold rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 whitespace-nowrap">
                  Enquire About This Product
                  <i className="ri-arrow-right-line ml-2"></i>
                </button>
                <Link to="/products" className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-800 font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer whitespace-nowrap">
                  <i className="ri-arrow-left-line mr-2"></i>Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Related Products</h2>
              <p className="text-gray-600">More from {product.category}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedProducts.map((rp: any, index: number) => (
                <Link key={index} to={`/products/${rp.slug}`} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img src={rp.image} alt={rp.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-black text-xs font-bold rounded-full">{rp.origin}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-black transition-colors">{rp.name}</h4>
                    <p className="text-gray-600 text-sm line-clamp-2">{rp.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
