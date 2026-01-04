"use client"

import { useState, useEffect } from "react"
import PropertyCard from "../PropertyCard"
import LoadingSkeleton from "../LoadingSkeleton"

const DEFAULT_PROPERTIES = [
  {
    _id: "1",
    address: { street: "Luxury Downtown Apartment", city: "Mumbai", state: "MH" },
    price: 45000,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "apartment",
    description: "Modern luxury apartment with premium amenities and city views",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500"],
    safetyRating: 92,
  },
  {
    _id: "2",
    address: { street: "Suburban Family Home", city: "Bangalore", state: "KA" },
    price: 35000,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "villa",
    description: "Spacious villa with garden and parking facility",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500"],
    safetyRating: 88,
  },
  {
    _id: "3",
    address: { street: "Premium Penthouse", city: "Delhi", state: "DL" },
    price: 65000,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: "penthouse",
    description: "Exclusive penthouse with rooftop access and city skyline views",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500"],
    safetyRating: 95,
  },
  {
    _id: "4",
    address: { street: "Cozy Studio Apartment", city: "Hyderabad", state: "TG" },
    price: 18000,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: "studio",
    description: "Perfect for professionals and students",
    images: ["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"],
    safetyRating: 85,
  },
  {
    _id: "5",
    address: { street: "Modern Commercial Space", city: "Pune", state: "MH" },
    price: 55000,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "apartment",
    description: "Well-designed space with excellent natural light",
    images: ["https://images.unsplash.com/photo-1560276365-2a9f8e55b5d2?w=500"],
    safetyRating: 90,
  },
  {
    _id: "6",
    address: { street: "Heritage Bungalow", city: "Jaipur", state: "RJ" },
    price: 42000,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "villa",
    description: "Classic architectural design with traditional charm",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500"],
    safetyRating: 87,
  },
]

export default function TenantHome() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/property")
      const data = await response.json()
      setProperties(data.properties?.length > 0 ? data.properties : DEFAULT_PROPERTIES)
    } catch (error) {
      console.error("Error fetching properties:", error)
      setProperties(DEFAULT_PROPERTIES)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSkeleton />

  return (
    /* Dark theme styling with improved typography and spacing */
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-100 mb-2">Find Your Perfect Home</h1>
        <p className="text-slate-400 mb-6">Discover amazing properties with verified safety ratings</p>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by city or location..."
            className="flex-1 px-4 py-3 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold hover:shadow-lg">
            Search
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-6">AI Recommended Properties</h2>
        {properties.length === 0 ? (
          <p className="text-center text-slate-400 py-8">No properties available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
