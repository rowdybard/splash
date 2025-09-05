import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Splashtastic Foam Parties
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're more than just a foam party company – we're memory makers, joy creators, 
              and the team that turns ordinary events into extraordinary experiences!
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Splashtastic Foam Parties was born from a simple idea: what if we could bring 
                  the pure joy and excitement of foam parties to every celebration? Founded in 2025 
                  by Tammy and her family, we started with a passion for fun and a dream to make every party unforgettable.
                </p>
                <p>
                  As a brand new company serving the Greater Lansing area, we're excited to bring 
                  professional foam party entertainment to our community. We specialize in creating 
                  magical moments for birthday parties, family gatherings, and special celebrations 
                  of all kinds.
                </p>
                <p>
                  Our fresh approach combines professional equipment, safety-first practices, and 
                  genuine enthusiasm for making people smile. Every party we host is a chance to 
                  create new memories and spread joy through the magic of foam!
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-green-400 rounded-2xl p-8 text-white text-center">
                <div className="text-6xl mb-4">🫧</div>
                <h3 className="text-2xl font-bold mb-2">Fun Fact</h3>
                <p className="text-lg">
                  Our foam is 100% biodegradable and safe for kids, pets, and the environment!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything we do is guided by our core values and commitment to creating 
              unforgettable experiences for our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To create the most memorable, safe, and exciting foam party experiences 
                that bring joy to people of all ages and create lasting memories.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Safety First</h3>
              <p className="text-gray-600">
                We never compromise on safety. Every event is carefully planned and executed 
                with the highest safety standards to ensure everyone has fun safely.
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Eco-Friendly</h3>
              <p className="text-gray-600">
                We're committed to environmental responsibility, using only biodegradable 
                foam solutions that are safe for people and the planet.
              </p>
            </div>
            
            <div className="bg-yellow-50 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Focus</h3>
              <p className="text-gray-600">
                We're proud to be part of the Lansing community and actively support 
                local events, schools, and charitable organizations.
              </p>
            </div>
            
            <div className="bg-pink-50 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service, from equipment 
                quality to customer experience and event execution.
              </p>
            </div>
            
            <div className="bg-indigo-50 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">😊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Joy & Fun</h3>
              <p className="text-gray-600">
                At the heart of everything we do is the belief that life should be fun! 
                We're passionate about spreading joy and creating magical moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're a family-owned business passionate about creating amazing foam party experiences. 
              With Tammy's experience from Fluff N' Stuff and our shared love for fun, we bring 
              professional entertainment to every event we host.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">👩</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tammy</h3>
              <p className="text-blue-600 font-semibold mb-3">Owner & Operations</p>
              <p className="text-gray-600 text-sm">
                Tammy brings her passion for creating magical moments and attention to detail 
                to every event. She also owns Fluff N' Stuff, a local cotton candy and snow cone vendor, 
                bringing years of experience in party entertainment to Splashtastic.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">👨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Daniel</h3>
              <p className="text-green-600 font-semibold mb-3">Family Member & Technical</p>
              <p className="text-gray-600 text-sm">
                Daniel handles all the technical aspects, from equipment setup to safety protocols. 
                His expertise ensures every foam party is both fun and safe for everyone involved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Special
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              As a new company, we're bringing fresh energy and modern approaches to foam party entertainment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🆕</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fresh & Modern</h3>
              <p className="text-gray-600">
                We're bringing the latest foam party technology and techniques to the Greater Lansing area.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Family Business</h3>
              <p className="text-gray-600">
                As a family-owned business with experience from Fluff N' Stuff, we provide personalized service and attention to every detail.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💫</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Excited to Serve</h3>
              <p className="text-gray-600">
                We're passionate about creating amazing experiences and building lasting relationships with our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Promise to You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              As a new business, we're committed to earning your trust through exceptional service and memorable experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Service</h3>
              <p className="text-gray-600">
                We promise to deliver professional, safe, and fun foam party experiences every time.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Eco-Friendly</h3>
              <p className="text-gray-600">
                We use only biodegradable foam solutions that are safe for people and the environment.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Local & Personal</h3>
              <p className="text-gray-600">
                As a local business, we're here to build lasting relationships with our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Commitment */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Community Commitment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              As a new business in the Greater Lansing area, we're excited to become an active part of our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Partnerships</h3>
              <p className="text-gray-600 mb-6">
                We're building relationships with local schools, community centers, and organizations 
                to bring foam party fun to special events and celebrations.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• School birthday parties and end-of-year celebrations</li>
                <li>• Community center events and fundraisers</li>
                <li>• Local business team building events</li>
                <li>• Neighborhood block parties and festivals</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Environmental Responsibility</h3>
              <p className="text-gray-600 mb-6">
                We're committed to protecting our environment and using only the safest, 
                most eco-friendly foam solutions available.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• 100% biodegradable foam solutions</li>
                <li>• Safe for kids, pets, and the environment</li>
                <li>• Minimal water usage and cleanup</li>
                <li>• Sustainable business practices</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience the Splashtastic Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Be among the first to experience our amazing foam parties! 
            Let us create an unforgettable experience for your next celebration!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🎉 Book Your Party
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              📞 Get in Touch
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
                <li>📱 517-930-3292 (Tammy) | 517-505-1122 (Daniel)</li>
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
