import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Star, Shield, Clock, Users, Droplets } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Splashtastic</h1>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <Link href="/packages" className="text-gray-700 hover:text-blue-600">Packages</Link>
                <Link href="/add-ons" className="text-gray-700 hover:text-blue-600">Add-ons</Link>
                <Link href="/service-area" className="text-gray-700 hover:text-blue-600">Service Area</Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/book">
                <Button size="lg">Book Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Backyard magic, <span className="text-blue-600">in minutes.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Transform any space into a foam wonderland with our professional foam party services. 
                Safe, biodegradable, and unforgettable fun for kids and adults alike.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Check Availability
                  </Button>
                </Link>
                <Link href="/quote">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                    Get Instant Quote
                  </Button>
                </Link>
              </div>
              
              {/* Trust badges */}
              <div className="flex items-center space-x-6 mt-8">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  Fully Insured
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Licensed & Trained
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                  Eco-Friendly
                </div>
              </div>
            </div>
            
            <div className="relative animate-bounce-in">
              <div className="aspect-square bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-white text-center">
                  <Droplets className="h-24 w-24 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Foam Party Magic</p>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center animate-bounce">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-400 rounded-full w-12 h-12 flex items-center justify-center animate-bounce" style={{animationDelay: '0.5s'}}>
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Package</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From intimate gatherings to epic celebrations, we have the perfect foam party package for every occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Package */}
            <Card className="relative hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Starter Party</CardTitle>
                <div className="text-3xl font-bold text-blue-600">$299</div>
                <p className="text-gray-600">60 minutes • Up to 15 guests</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Professional foam machine
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Biodegradable foam solution
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Setup and breakdown
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Basic safety briefing
                  </li>
                </ul>
                <Button className="w-full mt-6" asChild>
                  <Link href="/book?package=starter">Select Package</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Mega Package */}
            <Card className="relative hover:shadow-lg transition-shadow border-blue-200 ring-2 ring-blue-500">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Mega Splash</CardTitle>
                <div className="text-3xl font-bold text-blue-600">$449</div>
                <p className="text-gray-600">90 minutes • Up to 25 guests</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Everything in Starter
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Extended 90-minute experience
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Fun props and games
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Photo opportunities
                  </li>
                </ul>
                <Button className="w-full mt-6" asChild>
                  <Link href="/book?package=mega">Select Package</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Glow Package */}
            <Card className="relative hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Glow Night Spectacular</CardTitle>
                <div className="text-3xl font-bold text-blue-600">$599</div>
                <p className="text-gray-600">90 minutes • Up to 30 guests</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Everything in Mega Splash
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Glow-in-the-dark foam
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    UV lighting setup
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Glow accessories
                  </li>
                </ul>
                <Button className="w-full mt-6" asChild>
                  <Link href="/book?package=glow">Select Package</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Safety First, Fun Always</h2>
              <p className="text-lg text-gray-600 mb-6">
                Your safety is our top priority. We use only hypoallergenic, biodegradable foam that's 
                safe for kids, adults, and the environment.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span>Hypoallergenic, biodegradable foam</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span>Fully insured and trained staff</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span>Safe for all ages and skin types</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span>Easy cleanup with water</span>
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <Shield className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Fully Insured</h3>
                <p className="text-sm text-gray-600">Comprehensive liability coverage</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <Users className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Trained Staff</h3>
                <p className="text-sm text-gray-600">Professional, experienced team</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <Droplets className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Eco-Friendly</h3>
                <p className="text-sm text-gray-600">Biodegradable, safe formula</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <Clock className="h-12 w-12 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">On-Time</h3>
                <p className="text-sm text-gray-600">Reliable, punctual service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Requirements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Setup Requirements</h2>
            <p className="text-xl text-gray-600">
              Just three things needed for an amazing foam party
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Water Spigot</h3>
              <p className="text-gray-600">
                Access to a standard garden hose connection within 100 feet
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-yellow-600 rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Standard Outlet</h3>
              <p className="text-gray-600">
                110V electrical outlet within 100 feet of the party area
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-2 border-green-600 border-dashed rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">20' × 20' Space</h3>
              <p className="text-gray-600">
                Open area for safe foam party fun (grass or concrete)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <div className="flex justify-center items-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-lg font-semibold">4.9/5 from 200+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Amazing experience! The kids had a blast and the cleanup was so easy. 
                  Professional service from start to finish."
                </p>
                <div className="font-semibold">Sarah M.</div>
                <div className="text-sm text-gray-500">Birmingham, MI</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Best birthday party ever! The glow night package was incredible. 
                  Worth every penny and the kids are still talking about it."
                </p>
                <div className="font-semibold">Mike D.</div>
                <div className="text-sm text-gray-500">Royal Oak, MI</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Super easy booking process and the team arrived right on time. 
                  The foam was safe for our toddler and cleanup was a breeze!"
                </p>
                <div className="font-semibold">Jennifer L.</div>
                <div className="text-sm text-gray-500">Troy, MI</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready for Some Foam Fun?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your foam party today and create memories that will last a lifetime. 
            Same-day booking available for select dates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Book Your Party Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600">
                Get Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Splashtastic</h3>
              <p className="text-gray-400 mb-4">
                Professional foam parties bringing joy to the Detroit metro area.
              </p>
              <div className="text-sm text-gray-400">
                Licensed • Insured • Professional
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/packages" className="hover:text-white">Packages</Link></li>
                <li><Link href="/add-ons" className="hover:text-white">Add-ons</Link></li>
                <li><Link href="/service-area" className="hover:text-white">Service Area</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/policies" className="hover:text-white">Policies</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div>Detroit Metro Area</div>
                <div>info@splashtastic.com</div>
                <div>(248) 555-FOAM</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Splashtastic Foam Parties. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
