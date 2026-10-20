import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { submitContactForm, fetchRetailPage } from '../../lib/api';
import { useSite } from '../../context/SiteContext';
import { defaultStores } from '../../lib/defaults';

const ContactPage = () => {
  const { settings } = useSite();
  const [stores, setStores] = useState<any[]>(defaultStores);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', message: '', inquiry_type: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    fetchRetailPage().then((data) => {
      if (data?.stores?.length) setStores(data.stores);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    try {
      const result = await submitContactForm(formData);
      setSubmitStatus(result.ok ? 'success' : 'error');
      if (result.ok) {
        setFormData({ name: '', email: '', phone: '', company: '', message: '', inquiry_type: '' });
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Connect with Singapore's premier food distribution experts.</p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-phone-line text-2xl text-black"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">Main Office: +65 8806 8023</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-mail-line text-2xl text-black"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">{settings.contact_email}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-map-pin-line text-2xl text-black"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Head Office</h3>
              <p className="text-gray-600">{settings.contact_address}</p>
            </div>
          </div>

          {/* Retail Stores */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Visit Our Retail Stores</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {stores.map((store: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <i className="ri-store-2-line text-black mr-2"></i>{store.name}
                  </h3>
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start text-gray-700 min-h-[80px]">
                      <i className="ri-map-pin-line text-black mt-1 mr-2 flex-shrink-0"></i>
                      <div>
                        <p>{store.address_line1}</p>
                        {store.address_line2 && <p>{store.address_line2}</p>}
                        <p>{store.address_line3}</p>
                      </div>
                    </div>
                    <p className="flex items-center text-gray-700"><i className="ri-phone-line text-black mr-2"></i>{store.phone}</p>
                    <div className="flex items-start text-gray-700">
                      <i className="ri-time-line text-black mt-1 mr-2 flex-shrink-0"></i>
                      <div>
                        <p><strong>Mon - Fri:</strong> {store.hours_weekday}</p>
                        <p><strong>Sat, Sun & PH:</strong> {store.hours_weekend}</p>
                      </div>
                    </div>
                  </div>
                  <a href={store.maps_url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer text-center">Get Directions</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
            <p className="text-xl text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm" placeholder="Enter your full name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm" placeholder="Enter your email address" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm" placeholder="Enter your phone number" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company/Restaurant</label>
                  <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm" placeholder="Enter your company name" />
                </div>
              </div>
              <div>
                <label htmlFor="inquiry_type" className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type *</label>
                <select id="inquiry_type" name="inquiry_type" value={formData.inquiry_type} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm">
                  <option value="">Select inquiry type</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="retail">Retail Information</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="custom">Custom Order Request</option>
                  <option value="support">Customer Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required maxLength={500} rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm resize-none" placeholder="Tell us about your requirements..." />
                <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
              </div>
              <div className="text-center space-y-3">
                <button type="submit" disabled={isSubmitting} className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors text-lg font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
                <p className="text-xs text-gray-500">
                  By submitting this form, you agree to our{' '}
                  <Link to="/privacy-policy" className="underline hover:text-gray-800 transition-colors">
                    Data Protection Notice
                  </Link>
                  .
                </p>
              </div>
              {submitStatus === 'success' && (
                <div className="text-center text-black font-medium">Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.</div>
              )}
              {submitStatus === 'error' && (
                <div className="text-center text-red-600 font-medium">Sorry, there was an error. Please try again or contact us directly.</div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Find Our Locations</h2>
          <div className="bg-gray-100 rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127512.78269093886!2d103.8198!3d1.3521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da11238a8b9375%3A0x887869cf52abf5c4!2sSingapore!5e0!3m2!1sen!2ssg!4v1642678234567!5m2!1sen!2ssg"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
