import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Splashtastic Foam Parties</h3>
            <p className="text-gray-400">
              Making memories one bubble at a time! 🫧
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <span>📍</span>
                <span>Greater Lansing Area</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <span>📧</span>
                <span>info@splashtastic.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <span>📱</span>
                <span>517-930-3292 (Tammy) | 517-505-1122 (Daniel)</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/packages" className="hover:text-white transition-colors">Party Packages</Link></li>
              <li><Link href="/add-ons" className="hover:text-white transition-colors">Add-ons & Extras</Link></li>
              <li><Link href="/service-area" className="hover:text-white transition-colors">Service Area</Link></li>
              <li><Link href="/book" className="hover:text-white transition-colors">Book Now</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/policies" className="hover:text-white transition-colors">Policies</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Actions</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/book" className="hover:text-white transition-colors">Get Quote</Link></li>
              <li><Link href="/service-area" className="hover:text-white transition-colors">Check Coverage</Link></li>
              <li><Link href="/packages" className="hover:text-white transition-colors">View Pricing</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Splashtastic Foam Parties. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Serving Lansing, East Lansing, Grand Ledge, Okemos, Holt, Mason, Potterville, Charlotte, Haslett, DeWitt, and surrounding areas.
          </p>
        </div>
      </div>
    </footer>
  )
}
