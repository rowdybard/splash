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
                  the pure joy and excitement of foam parties to every celebration? Founded in 2020 
                  by a group of friends who loved creating memorable experiences, we started with 
                  just one foam machine and a dream.
                </p>
                <p>
                  What began as a small operation serving birthday parties in our local Lansing 
                  community has grown into the region's premier foam party entertainment company. 
                  We've hosted thousands of events, from intimate backyard celebrations to 
                  corporate team-building extravaganzas.
                </p>
                <p>
                  Our journey has been filled with laughter, foam, and countless happy faces. 
                  Every party we host reminds us why we started this company – to spread joy, 
                  create memories, and bring people together through the magic of foam!
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-green-400 rounded-2xl p-8 text-white text-center">
                <div className="text-6xl mb-4">🫧</div>
                <h3 className="text-2xl font-bold mb-2">Fun Fact</h3>
                <p className="text-lg">
                  We've used enough foam to fill over 50 Olympic-sized swimming pools!
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
              We're a passionate team of foam enthusiasts, safety experts, and party professionals 
              who love what we do and it shows in every event we host.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mike Johnson</h3>
              <p className="text-blue-600 font-semibold mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                A former event planner with 15+ years of experience, Mike's vision and 
                passion for creating memorable experiences drives everything we do.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">👩‍🔬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sarah Chen</h3>
              <p className="text-green-600 font-semibold mb-3">Safety Director</p>
              <p className="text-gray-600 text-sm">
                With a background in chemical engineering, Sarah ensures all our foam 
                solutions meet the highest safety and environmental standards.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">👨‍🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">David Rodriguez</h3>
              <p className="text-purple-600 font-semibold mb-3">Creative Director</p>
              <p className="text-gray-600 text-sm">
                David's artistic vision and attention to detail ensure every party is 
                visually stunning and perfectly themed to your preferences.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">👩‍💻</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Emily Watson</h3>
              <p className="text-yellow-600 font-semibold mb-3">Customer Experience</p>
              <p className="text-gray-600 text-sm">
                Emily's warm personality and attention to detail ensure every customer 
                feels valued and every event runs smoothly from start to finish.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">👨‍🔧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tom Anderson</h3>
              <p className="text-pink-600 font-semibold mb-3">Technical Director</p>
              <p className="text-gray-600 text-sm">
                Tom's mechanical expertise keeps our foam machines running perfectly 
                and ensures every event has the right equipment and setup.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">👩‍🎓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lisa Park</h3>
              <p className="text-indigo-600 font-semibold mb-3">Event Coordinator</p>
              <p className="text-gray-600 text-sm">
                Lisa's organizational skills and event planning expertise ensure every 
                detail is perfect and every party exceeds expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Splashtastic by the Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our growth and success in numbers – each one represents a happy customer 
              and a successful foam party!
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">2,500+</div>
              <p className="text-gray-600">Events Hosted</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-green-600 mb-2">15,000+</div>
              <p className="text-gray-600">Happy Guests</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-purple-600 mb-2">4.9</div>
              <p className="text-gray-600">Star Rating</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-yellow-600 mb-2">3</div>
              <p className="text-gray-600">Years Strong</p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Awards & Recognition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're honored to have received recognition for our commitment to excellence, 
              safety, and customer satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏆</span>
              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-3">Best of Lansing 2023</h3>
                <p className="text-gray-600">
                  Voted #1 Entertainment Company by Lansing State Journal readers
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Green Business Award</h3>
              <p className="text-gray-600">
                Recognized for our commitment to environmental responsibility
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Safety Excellence</h3>
              <p className="text-gray-600">
                Perfect safety record recognized by Michigan Entertainment Association
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Community Involvement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in giving back to the community that has supported us. 
              Here are some of the ways we're making a difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Charitable Events</h3>
              <p className="text-gray-600 mb-6">
                We regularly donate our services to local charities, schools, and community 
                organizations, helping them raise funds and create memorable experiences.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Annual Children's Hospital Fundraiser</li>
                <li>• School District End-of-Year Celebrations</li>
                <li>• Community Center Summer Programs</li>
                <li>• Local Animal Shelter Events</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Environmental Initiatives</h3>
              <p className="text-gray-600 mb-6">
                We're committed to protecting our environment and educating others about 
                sustainable entertainment options.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Tree planting programs</li>
                <li>• Beach cleanup initiatives</li>
                <li>• Educational workshops on eco-friendly parties</li>
                <li>• Partnership with local environmental groups</li>
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
            Join thousands of happy customers who have experienced the magic of our foam parties. 
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
