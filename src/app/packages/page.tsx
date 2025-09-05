import Link from 'next/link'

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Perfect Package
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From intimate gatherings to epic celebrations, we have the perfect foam party package 
              for every occasion and budget. All packages include professional setup, safety equipment, 
              and cleanup.
            </p>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Starter Party */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎈</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Starter Party</h2>
                <div className="text-5xl font-bold text-blue-600 mb-2">$399</div>
                <p className="text-gray-600">Perfect for small gatherings</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Up to 20 guests</span>
                  </li>
                                     <li className="flex items-center">
                     <span className="text-green-500 mr-3 text-xl">✓</span>
                     <span>1 hour of foam fun</span>
                   </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Professional foam machine</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Biodegradable foam solution</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Safety equipment & briefing</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Setup & cleanup included</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Basic party props</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Link
                  href="/book?package=starter"
                  className="inline-block w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Book Starter Party
                </Link>
              </div>
            </div>

            {/* Deluxe Party */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-2 border-green-200 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎉</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Deluxe Party</h2>
                <div className="text-5xl font-bold text-green-600 mb-2">$499</div>
                <p className="text-gray-600">Our most requested package</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Up to 40 guests</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>3 hours of foam fun</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Everything in Starter</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Premium foam machine</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Enhanced party props</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Link
                  href="/book?package=deluxe"
                  className="inline-block w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Book Deluxe Party
                </Link>
              </div>
            </div>

            {/* Premium Party */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">👑</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Premium Party</h2>
                <div className="text-5xl font-bold text-purple-600 mb-2">$799</div>
                <p className="text-gray-600">Ultimate foam party experience</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Up to 60 guests</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>4 hours of foam fun</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Everything in Deluxe</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Premium foam machine</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span>Enhanced party props</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Link
                  href="/book?package=premium"
                  className="inline-block w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  Book Premium Party
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Customize Your Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Add extra fun and excitement to your foam party with our premium add-ons. 
              Mix and match to create the perfect party for your special occasion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         {/* Extra Foam */}
             <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
               <div className="text-center mb-4">
                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                   <span className="text-2xl">🫧</span>
                 </div>
                 <h3 className="text-xl font-semibold text-gray-900">Extra Foam Hours</h3>
                 <div className="text-2xl font-bold text-blue-600">$99</div>
                 <p className="text-gray-600 text-center">Per additional hour</p>
               </div>
               <p className="text-gray-600 text-center mb-4">
                 Extend your party by 1-3 additional hours with continuous foam coverage.
               </p>
               <ul className="text-sm text-gray-600 space-y-1 mb-4">
                 <li>• +1 hour: $99</li>
                 <li>• +2 hours: $198</li>
                 <li>• +3 hours: $297</li>
                 <li>• Continuous foam coverage</li>
               </ul>
             </div>



            {/* Glow/Neon Foam Upgrade */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Glow/Neon Foam Upgrade</h3>
                <div className="text-2xl font-bold text-yellow-600">$99</div>
              </div>
              <p className="text-gray-600 text-center mb-4">
                Make your party glow with UV lighting and neon/glow foam effects.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• UV black lights</li>
                <li>• Glow accessories</li>
                <li>• Neon/glow foam effects</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Book Your Foam Party?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose your package, add your favorite extras, and let us create an unforgettable experience!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🎉 Start Booking Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              📞 Get Custom Quote
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
                <li>📍 Greater Lansing Area</li>
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
