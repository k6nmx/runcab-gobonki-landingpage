'use client'
import { useState } from 'react'
import { ArrowRight, Users, Building2 } from 'lucide-react'

export default function Hero() {
  const [userType, setUserType] = useState<'customer' | 'business'>('customer')

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Type Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-lg shadow-lg inline-flex">
            <button
              onClick={() => setUserType('customer')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                userType === 'customer' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users size={20} />
              <span>For Customers</span>
            </button>
            <button
              onClick={() => setUserType('business')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                userType === 'business' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Building2 size={20} />
              <span>For Businesses</span>
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="text-center">
          {userType === 'customer' ? (
            <>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Your phone = <br />
                <span className="text-blue-600">Your loyalty cards</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Never lose rewards again. Every purchase counts. 
                Works at restaurants, barbers, cafes - no downloads needed.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center space-x-2 transition-colors">
                <span>Find participating businesses</span>
                <ArrowRight size={20} />
              </button>
            </>
          ) : (
            <>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Turn strangers into <br />
                <span className="text-blue-600">regulars instantly</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Setup in 2 minutes, customize everything, zero monthly fees. 
                The loyalty program that actually works for small businesses.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center space-x-2 transition-colors">
                <span>Start your free loyalty program</span>
                <ArrowRight size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}