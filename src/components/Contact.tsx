import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Calendar, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (!formData.name || !formData.email || !formData.message) {
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            service: formData.service || null,
            message: formData.message
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Message saved:', data);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });

      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Contact Us Today
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Schedule your appointment and get the professional legal support you need
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 border border-red-100 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-red-600" />
                  Book Your Appointment
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We operate on an appointment-based system to ensure you receive our full attention
                  and personalized service. Contact us to schedule your consultation.
                </p>

                <div className="space-y-4">
                  <a
                    href="tel:6473339381"
                    className="flex items-center gap-4 p-4 bg-white rounded-xl hover:bg-red-50 transition-all border border-gray-200 hover:border-red-300 shadow-sm hover:shadow-md group"
                  >
                    <div className="bg-gradient-to-br from-red-600 to-red-700 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Call Us</p>
                      <p className="text-lg font-bold text-gray-900">(647) 333-9381</p>
                    </div>
                  </a>

                  <a
                    href="mailto:Canada@shamslegalservices.ca"
                    className="flex items-center gap-4 p-4 bg-white rounded-xl hover:bg-red-50 transition-all border border-gray-200 hover:border-red-300 shadow-sm hover:shadow-md group"
                  >
                    <div className="bg-gradient-to-br from-red-600 to-red-700 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Email Us</p>
                      <p className="text-sm lg:text-base font-bold text-gray-900 break-all">
                        Canada@shamslegalservices.ca
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="bg-gradient-to-br from-red-600 to-red-700 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Visit Us</p>
                      <p className="text-lg font-bold text-gray-900">315 Dublin St</p>
                      <p className="text-gray-600">Peterborough, Ontario</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-red-600" />
                  Business Hours
                </h3>
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
                    >
                      <span className="text-gray-700 font-medium">{schedule.day}</span>
                      <span className="text-gray-900 font-bold">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 lg:p-10 shadow-2xl text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Send className="w-6 h-6" />
                Send Us a Message
              </h3>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-300 rounded-lg flex items-start gap-3 animate-fadeIn">
                  <CheckCircle className="w-5 h-5 text-green-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-100">Message sent successfully!</p>
                    <p className="text-sm text-green-50">We'll respond to your inquiry within 24 hours.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-400/20 border border-red-300 rounded-lg flex items-start gap-3 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-red-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-100">Failed to send message</p>
                    <p className="text-sm text-red-50">Please try again or contact us directly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-red-50">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/95 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-red-50">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/95 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-red-50">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/95 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2 text-red-50">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/95 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <option value="">Select a service</option>
                    <option value="paralegal">Paralegal Services</option>
                    <option value="notary">Notary Public</option>
                    <option value="consultation">Legal Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-red-50">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/95 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                    placeholder="Tell us about your legal needs..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-red-600 py-4 rounded-lg hover:bg-gray-50 disabled:bg-gray-300 disabled:text-gray-600 transition-all font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-5 h-5" />
                </button>

                <p className="text-red-50 text-sm text-center">
                  We'll respond to your inquiry within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
