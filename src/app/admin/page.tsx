'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Booking {
  id: string
  customerName: string
  eventDate: string
  eventTime: string
  eventAddress: string
  packageName: string
  totalPrice: number
  depositAmount: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  isDeposit: boolean
  createdAt: string
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // In a real app, this would fetch from your API
    // For now, we'll use mock data
    const mockBookings: Booking[] = [
      {
        id: 'booking_001',
        customerName: 'John Smith',
        eventDate: '2024-06-15',
        eventTime: '2:00 PM',
        eventAddress: '123 Main St, Detroit, MI 48201',
        packageName: 'Starter Party',
        totalPrice: 299.00,
        depositAmount: 89.70,
        status: 'confirmed',
        isDeposit: true,
        createdAt: '2024-05-01T10:00:00Z'
      },
      {
        id: 'booking_002',
        customerName: 'Sarah Johnson',
        eventDate: '2024-06-20',
        eventTime: '3:00 PM',
        eventAddress: '456 Oak Ave, Detroit, MI 48202',
        packageName: 'Deluxe Party',
        totalPrice: 499.00,
        depositAmount: 149.70,
        status: 'pending',
        isDeposit: true,
        createdAt: '2024-05-02T14:30:00Z'
      },
      {
        id: 'booking_003',
        customerName: 'Mike Davis',
        eventDate: '2024-06-10',
        eventTime: '1:00 PM',
        eventAddress: '789 Pine Rd, Detroit, MI 48203',
        packageName: 'Premium Party',
        totalPrice: 799.00,
        depositAmount: 239.70,
        status: 'completed',
        isDeposit: false,
        createdAt: '2024-04-25T09:15:00Z'
      }
    ]

    setBookings(mockBookings)
    setLoading(false)
  }, [])

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.eventAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.packageName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳'
      case 'confirmed': return '✅'
      case 'cancelled': return '❌'
      case 'completed': return '🎉'
      default: return '❓'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">Manage Splashtastic Foam Party bookings</p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-lg">📊</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                    <dd className="text-lg font-medium text-gray-900">{bookings.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-lg">✅</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Confirmed</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {bookings.filter(b => b.status === 'confirmed').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-lg">⏳</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {bookings.filter(b => b.status === 'pending').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-lg">💰</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${bookings.reduce((sum, b) => sum + b.totalPrice, 0).toFixed(2)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="search" className="sr-only">Search bookings</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">🔍</span>
                  </div>
                  <input
                    id="search"
                    type="text"
                    placeholder="Search by customer name, address, or package..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package & Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                        <div className="text-sm text-gray-500">ID: {booking.id}</div>
                        <div className="text-xs text-gray-400">
                          Created: {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">
                          {new Date(booking.eventDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">{booking.eventTime}</div>
                        <div className="text-xs text-gray-400 truncate max-w-xs">
                          {booking.eventAddress}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.packageName}</div>
                        <div className="text-sm text-gray-500">
                          Total: ${booking.totalPrice.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-400">
                          {booking.isDeposit ? `Deposit: $${booking.depositAmount.toFixed(2)}` : 'Paid in full'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        <span className="mr-1">{getStatusIcon(booking.status)}</span>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                        <button className="text-green-600 hover:text-green-900">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Cancel</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📭</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
