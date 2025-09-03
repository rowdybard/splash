import Link from 'next/link'

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about Splashtastic Foam Parties. Can't find what you're looking for? 
              <Link href="/contact" className="text-blue-600 hover:text-blue-800 ml-1">Contact us</Link> directly!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Safety & Health */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">🛡️</span>
                Safety & Health
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Is the foam safe for children and adults?
                  </h3>
                  <p className="text-gray-600">
                    Absolutely! We use only hypoallergenic, biodegradable foam that's specifically formulated 
                    for foam parties. It's safe for all ages and skin types, and meets all safety standards. 
                    The foam is non-toxic and washes off easily with water.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What safety measures do you have in place?
                  </h3>
                  <p className="text-gray-600">
                    Safety is our top priority! We provide safety equipment including goggles, provide a 
                    comprehensive safety briefing, and have trained staff on-site. Our foam machines are 
                    positioned safely and we ensure proper supervision throughout the event.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Is the foam environmentally friendly?
                  </h3>
                  <p className="text-gray-600">
                    Yes! Our foam solution is biodegradable and eco-friendly. It breaks down naturally 
                    and won't harm your lawn, plants, or the environment. Cleanup is simple with just water.
                  </p>
                </div>
              </div>
            </div>

            {/* Booking & Payment */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">📅</span>
                Booking & Payment
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    How far in advance should I book?
                  </h3>
                  <p className="text-gray-600">
                    We recommend booking at least 2-3 weeks in advance for weekend dates, especially during 
                    peak season (May-September). Weekday bookings can often be accommodated with shorter notice. 
                    For last-minute requests, give us a call and we'll do our best to help!
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What payment options do you accept?
                  </h3>
                  <p className="text-gray-600">
                    We accept all major credit cards, debit cards, and digital payments. We require a 30% 
                    deposit to secure your booking, with the remaining balance due 7 days before your event. 
                    Full payment is also accepted at the time of booking.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What's your cancellation policy?
                  </h3>
                  <p className="text-gray-600">
                    We understand that plans can change! Cancellations made 7+ days before your event receive 
                    a full refund. Cancellations 3-6 days before receive a 50% refund. Cancellations within 
                    48 hours are non-refundable. We're happy to reschedule when possible.
                  </p>
                </div>
              </div>
            </div>

            {/* Setup & Requirements */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">🏠</span>
                Setup & Requirements
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What do I need to provide for the party?
                  </h3>
                  <p className="text-gray-600">
                    Very little! We handle almost everything. You just need to provide:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 ml-4">
                    <li>Access to a water source (garden hose connection)</li>
                    <li>An electrical outlet within 50 feet</li>
                    <li>A clear area of at least 20x20 feet</li>
                    <li>Permission to use the space</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    How long does setup and cleanup take?
                  </h3>
                  <p className="text-gray-600">
                    Our team arrives 30 minutes before your scheduled start time to set up. Cleanup takes 
                    about 15-20 minutes after the party ends. We handle all the heavy lifting so you can 
                    focus on enjoying your event!
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Can you set up indoors?
                  </h3>
                  <p className="text-gray-600">
                    We primarily offer outdoor foam parties for safety and cleanup reasons. However, we do 
                    offer indoor options for large venues with proper drainage and waterproof flooring. 
                    Contact us to discuss indoor possibilities for your specific venue.
                  </p>
                </div>
              </div>
            </div>

            {/* Weather & Contingencies */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">🌤️</span>
                Weather & Contingencies
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What happens if it rains on my party day?
                  </h3>
                  <p className="text-gray-600">
                    Don't worry! We monitor the weather closely and will contact you 24 hours before your 
                    event if there are concerns. We can reschedule at no additional cost, or move your 
                    party to a covered area if available. Your deposit is always protected.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Do you offer indoor alternatives?
                  </h3>
                  <p className="text-gray-600">
                    Yes! We have indoor foam party options for venues with proper facilities. We can also 
                    offer alternative entertainment like bubble parties or dry foam activities if outdoor 
                    foam isn't possible. We'll work with you to ensure your event is amazing regardless of weather!
                  </p>
                </div>
              </div>
            </div>

            {/* Service Area & Travel */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">🚗</span>
                Service Area & Travel
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Where do you provide services?
                  </h3>
                  <p className="text-gray-600">
                    We serve the entire Detroit metropolitan area including Wayne, Oakland, and Macomb counties. 
                    This includes Detroit, Royal Oak, Troy, Birmingham, Bloomfield Hills, Grosse Pointe, 
                    and surrounding communities. Contact us to confirm coverage for your specific location.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Do you charge travel fees?
                  </h3>
                  <p className="text-gray-600">
                    Travel within 25 miles of downtown Detroit is included in your package price. Locations 
                    beyond 25 miles may incur a small travel fee, which we'll clearly communicate during 
                    booking. We never surprise you with hidden fees!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We're here to help! Our team is available to answer any questions and help you plan 
            the perfect foam party experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              📞 Contact Us
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              🎉 Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Splashtastic Foam Parties</h3>
              <p className="text-gray-400">
                Making memories one bubble at a time! 🫧
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/packages" className="hover:text-white transition-colors">Packages</Link></li>
                <li><Link href="/add-ons" className="hover:text-white transition-colors">Add-ons</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/service-area" className="hover:text-white transition-colors">Service Area</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/policies" className="hover:text-white transition-colors">Policies</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@splashtastic.com</li>
                <li>📱 (555) 123-4567</li>
                <li>📍 Detroit Metro Area</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Splashtastic Foam Parties. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
