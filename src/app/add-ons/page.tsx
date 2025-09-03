import Link from 'next/link'

export default function AddOnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Party Add-ons & Enhancements
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take your foam party to the next level! Customize your experience with our premium add-ons 
              and create the perfect celebration for your special occasion.
            </p>
          </div>
        </div>
      </section>

      {/* Add-ons Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         {/* Extra Foam */}
             <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
               <div className="text-center mb-6">
                 <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                   <span className="text-4xl">🫧</span>
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900">Extra Foam Hours</h3>
                 <div className="text-3xl font-bold text-blue-600">$100</div>
                 <p className="text-gray-600">Per additional hour (up to 3 hours)</p>
               </div>
               
               <div className="space-y-4 mb-6">
                 <h4 className="font-semibold text-gray-900">Pricing Options:</h4>
                 <ul className="space-y-2 text-gray-600">
                   <li className="flex items-center justify-between">
                     <span className="flex items-center">
                       <span className="text-green-500 mr-2">✓</span>
                       +1 hour
                     </span>
                     <span className="font-semibold">$100</span>
                   </li>
                   <li className="flex items-center justify-between">
                     <span className="flex items-center">
                       <span className="text-green-500 mr-2">✓</span>
                       +2 hours
                     </span>
                     <span className="font-semibold">$200</span>
                   </li>
                   <li className="flex items-center justify-between">
                     <span className="flex items-center">
                       <span className="text-green-500 mr-2">✓</span>
                       +3 hours
                     </span>
                     <span className="font-semibold">$300</span>
                   </li>
                 </ul>
                 
                 <h4 className="font-semibold text-gray-900 mt-4">What's Included:</h4>
                 <ul className="space-y-2 text-gray-600">
                   <li className="flex items-center">
                     <span className="text-green-500 mr-2">✓</span>
                     Continuous foam coverage
                   </li>
                   <li className="flex items-center">
                     <span className="text-green-500 mr-2">✓</span>
                     Perfect for larger groups
                   </li>
                   <li className="flex items-center">
                     <span className="text-green-500 mr-2">✓</span>
                     Extended party duration
                   </li>
                 </ul>
               </div>
              
              <div className="text-center">
                <Link
                  href="/book"
                  className="inline-block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Add to Package
                </Link>
              </div>
            </div>

            {/* Music System */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎵</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Music System</h3>
                <div className="text-3xl font-bold text-green-600">$39</div>
                <p className="text-gray-600">Keep the energy high!</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900">What's Included:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Professional speakers
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Party playlist included
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Bluetooth connectivity
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Volume control
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <Link
                  href="/book"
                  className="inline-block w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                >
                  Add to Package
                </Link>
              </div>
            </div>

            {/* Themed Decorations */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎨</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Themed Decorations</h3>
                <div className="text-3xl font-bold text-purple-600">$29</div>
                <p className="text-gray-600">Transform your space!</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900">What's Included:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Balloons & banners
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Themed props
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Color coordination
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Setup & cleanup
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <Link
                  href="/book"
                  className="inline-block w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
                >
                  Add to Package
                </Link>
              </div>
            </div>

            {/* Glow Package */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Glow Package</h3>
                <div className="text-3xl font-bold text-yellow-600">$79</div>
                <p className="text-gray-600">Make it glow!</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900">What's Included:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    UV black lights
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Glow accessories
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Neon foam effects
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Glow-in-the-dark props
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <Link
                  href="/book"
                  className="inline-block w-full bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition-colors duration-200"
                >
                  Add to Package
                </Link>
              </div>
            </div>

            {/* Photo Booth */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📸</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Photo Booth</h3>
                <div className="text-3xl font-bold text-pink-600">$59</div>
                <p className="text-gray-600">Capture the fun!</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900">What's Included:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Professional camera setup
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Foam-themed props
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Digital photo delivery
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Photo booth attendant
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <Link
                  href="/book"
                  className="inline-block w-full bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition-colors duration-200"
                >
                  Add to Package
                </Link>
              </div>
            </div>

            {/* Party Games */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎮</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Party Games</h3>
                <div className="text-3xl font-bold text-red-600">$39</div>
                <p className="text-gray-600">Keep everyone engaged!</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900">What's Included:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Foam tag & relay races
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Bubble contests
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Party coordinator
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Organized activities
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <Link
                  href="/book"
                  className="inline-block w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                >
                  Add to Package
                </Link>
              </div>
            </div>

            {/* Custom Foam Colors */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🌈</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Custom Foam Colors</h3>
                <div className="text-3xl font-bold text-indigo-600">$25</div>
                <p className="text-gray-600">Match your theme!</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900">What's Included:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Choose from 10+ colors
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Safe, non-staining formula
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Perfect for themed parties
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Color coordination service
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <Link
                  href="/book"
                  className="inline-block w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
                >
                  Add to Package
                </Link>
              </div>
            </div>

            {/* Professional Lighting */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">💡</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Professional Lighting</h3>
                <div className="text-3xl font-bold text-teal-600">$45</div>
                <p className="text-gray-600">Set the mood!</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900">What's Included:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    LED color changing lights
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Professional light setup
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Remote control operation
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Multiple lighting modes
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <Link
                  href="/book"
                  className="inline-block w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
                >
                  Add to Package
                </Link>
              </div>
            </div>

            {/* Party Coordinator */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">👨‍💼</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Party Coordinator</h3>
                <div className="text-3xl font-bold text-orange-600">$69</div>
                <p className="text-gray-600">Let us handle everything!</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900">What's Included:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Dedicated event manager
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Timeline coordination
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Guest management
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Problem solving support
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <Link
                  href="/book"
                  className="inline-block w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200"
                >
                  Add to Package
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Deals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bundle & Save
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combine multiple add-ons and save! Our bundle deals make it easy to create the ultimate 
              foam party experience at a great value.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Entertainment Bundle</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">$89</div>
              <p className="text-gray-600 mb-6">Save $9 when you bundle!</p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• Music System</li>
                <li>• Party Games</li>
                <li>• Professional Lighting</li>
              </ul>
              <Link
                href="/book"
                className="inline-block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Choose Bundle
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Experience</h3>
              <div className="text-4xl font-bold text-green-600 mb-4">$149</div>
              <p className="text-gray-600 mb-6">Save $19 when you bundle!</p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• Extra Foam</li>
                <li>• Glow Package</li>
                <li>• Photo Booth</li>
                <li>• Custom Colors</li>
              </ul>
              <Link
                href="/book"
                className="inline-block w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
              >
                Choose Bundle
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ultimate Party</h3>
              <div className="text-4xl font-bold text-purple-600 mb-4">$199</div>
              <p className="text-gray-600 mb-6">Save $39 when you bundle!</p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• All Add-ons Included</li>
                <li>• Party Coordinator</li>
                <li>• Priority Scheduling</li>
                <li>• Setup & Cleanup</li>
              </ul>
              <Link
                href="/book"
                className="inline-block w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
              >
                Choose Bundle
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Customize Your Party?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Mix and match our add-ons to create the perfect foam party experience for your special occasion!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🎉 Start Building Your Package
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              📦 View Base Packages
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
