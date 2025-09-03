import Link from 'next/link'

export default function ServiceAreaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Service Area
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We proudly serve the entire Greater Lansing area and surrounding communities. 
              From downtown Lansing to the suburbs, we bring foam party magic to your doorstep!
            </p>
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Greater Lansing Area
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive coverage includes Ingham, Eaton, and Clinton counties, 
              ensuring we can serve your foam party needs wherever you are in the metro area.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ingham County */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🏙️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Ingham County</h3>
                <p className="text-gray-600">The heart of Lansing</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-3">Major Cities:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">📍</span>
                    Lansing (Downtown, Eastside, Westside)
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">📍</span>
                    East Lansing
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">📍</span>
                    Okemos
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">📍</span>
                    Haslett
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">📍</span>
                    Williamston
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">📍</span>
                    Mason
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">📍</span>
                    Holt
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">📍</span>
                    Dimondale
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">📍</span>
                    Leslie
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">📍</span>
                    Stockbridge
                  </li>
                </ul>
              </div>
            </div>

            {/* Eaton County */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🌳</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Eaton County</h3>
                <p className="text-gray-600">Suburban excellence</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-3">Major Cities:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">📍</span>
                    Charlotte
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">📍</span>
                    Grand Ledge
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">📍</span>
                    Potterville
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">📍</span>
                    Eaton Rapids
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">📍</span>
                    Delta Township
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">📍</span>
                    Oneida Township
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">📍</span>
                    Brookfield Township
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">📍</span>
                    Benton Township
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">📍</span>
                    Windsor Township
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">📍</span>
                    Sunfield
                  </li>
                </ul>
              </div>
            </div>

            {/* Clinton County */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🏘️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Clinton County</h3>
                <p className="text-gray-600">Family-friendly communities</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-3">Major Cities:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">📍</span>
                    St. Johns
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">📍</span>
                    DeWitt
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">📍</span>
                    Bath Township
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">📍</span>
                    Watertown Township
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">📍</span>
                    Bengal Township
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">📍</span>
                    Eagle Township
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">📍</span>
                    Greenbush Township
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">📍</span>
                    Olive Township
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">📍</span>
                    Riley Township
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">📍</span>
                    Victor Township
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Policy */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Travel & Coverage Policy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-green-50 rounded-xl p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Included Coverage</h3>
              <p className="text-gray-600">
                Travel within 25 miles of downtown Lansing is included in your package price. 
                This covers most of the Greater Lansing area.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Extended Coverage</h3>
              <p className="text-gray-600">
                Locations beyond 25 miles may incur a small travel fee. We'll clearly communicate 
                any additional costs during booking.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How We Calculate Distance</h3>
            <p className="text-gray-600 mb-6">
              We measure from our central location in downtown Lansing to your event location 
              using the most direct route. This ensures fair and transparent pricing for all customers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="font-semibold text-gray-900 mb-2">0-25 miles</div>
                <div className="text-green-600">✅ No additional fee</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-2">26-35 miles</div>
                <div className="text-blue-600">💰 $25 travel fee</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-2">36+ miles</div>
                <div className="text-purple-600">📞 Contact for quote</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Event Locations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Event Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've hosted foam parties at countless amazing venues throughout the Greater Lansing area. 
              From backyards to event spaces, we can set up anywhere!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Private Homes</h3>
              <p className="text-sm text-gray-600">Backyards, driveways, and patios</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏫</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Schools & Daycares</h3>
              <p className="text-sm text-gray-600">End-of-year celebrations and events</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Corporate Events</h3>
              <p className="text-sm text-gray-600">Team building and company parties</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏟️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Centers</h3>
              <p className="text-sm text-gray-600">Public events and celebrations</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏕️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Parks & Recreation</h3>
              <p className="text-sm text-gray-600">Outdoor community events</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏨</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hotels & Venues</h3>
              <p className="text-sm text-gray-600">Weddings and special occasions</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⛪</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Churches & Temples</h3>
              <p className="text-sm text-gray-600">Religious community events</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎪</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Event Spaces</h3>
              <p className="text-sm text-gray-600">Dedicated party and event venues</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Checker */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Check Your Coverage
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Not sure if we cover your area? Contact us with your address and we'll let you know 
            immediately if we can serve your location and what the travel costs would be.
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Coverage Check</h3>
            <p className="text-gray-600 mb-6">
              Send us your address and we'll respond within 2 hours with coverage confirmation 
              and any applicable travel fees.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg text-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📍 Check My Address
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg text-lg hover:bg-blue-50 transition-all duration-200"
              >
                🎉 Book Now
              </Link>
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
            Don't let location hold you back! We serve most of the Greater Lansing area and 
            we're always expanding our coverage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🎉 Check Availability
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              📞 Contact Us
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
