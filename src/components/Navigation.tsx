'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isCompanyOpen, setIsCompanyOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@splashtastic.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Greater Lansing Area</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🫧</span>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">Splashtastic</div>
              <div className="text-sm text-gray-600">Foam Parties</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <span>Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div
                className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <div className="py-2">
                  <Link
                    href="/packages"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    Party Packages
                  </Link>
                  <Link
                    href="/add-ons"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    Add-ons & Extras
                  </Link>
                  <Link
                    href="/service-area"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    Service Area
                  </Link>
                </div>
              </div>
            </div>

            {/* Company Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onMouseEnter={() => setIsCompanyOpen(true)}
                onMouseLeave={() => setIsCompanyOpen(false)}
              >
                <span>Company</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div
                className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}
                onMouseEnter={() => setIsCompanyOpen(true)}
                onMouseLeave={() => setIsCompanyOpen(false)}
              >
                <div className="py-2">
                  <Link
                    href="/about"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/policies"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    Policies
                  </Link>
                  <Link
                    href="/faq"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    FAQ
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </Link>

            <Link
              href="/admin"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Admin
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/book"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🎉 Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="bg-white border-t border-gray-200 px-4 py-6 space-y-4">
          {/* Services Section */}
          <div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Services
            </div>
            <div className="space-y-2">
              <Link
                href="/packages"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={closeMenu}
              >
                Party Packages
              </Link>
              <Link
                href="/add-ons"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={closeMenu}
              >
                Add-ons & Extras
              </Link>
              <Link
                href="/service-area"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={closeMenu}
              >
                Service Area
              </Link>
            </div>
          </div>

          {/* Company Section */}
          <div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Company
            </div>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={closeMenu}
              >
                About Us
              </Link>
              <Link
                href="/policies"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={closeMenu}
              >
                Policies
              </Link>
              <Link
                href="/faq"
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={closeMenu}
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Other Links */}
          <div className="space-y-2">
            <Link
              href="/contact"
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              Contact
            </Link>
            <Link
              href="/admin"
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              Admin
            </Link>
          </div>

          {/* Mobile CTA */}
          <div className="pt-4">
            <Link
              href="/book"
              className="block w-full text-center py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200"
              onClick={closeMenu}
            >
              🎉 Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
