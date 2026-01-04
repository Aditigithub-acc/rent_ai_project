"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const defaultProperties = [
  {
    _id: "1",
    address: { street: "Modern 2BHK Apartment", city: "Koramangala", state: "Bangalore", pinCode: "560034" },
    price: 25000,
    bedrooms: 2,
    propertyType: "Apartment",
    status: "Listed",
    views: 234,
    requests: 12,
    isVerified: true,
    lastUpdated: "3 hours ago",
  },
  {
    _id: "2",
    address: { street: "Cozy 1BHK Flat", city: "HSR Layout", state: "Bangalore", pinCode: "560102" },
    price: 18000,
    bedrooms: 1,
    propertyType: "Flat",
    status: "Rented",
    views: 156,
    requests: 8,
    isVerified: true,
    lastUpdated: "1 day ago",
  },
  {
    _id: "3",
    address: { street: "Spacious Studio", city: "Indiranagar", state: "Bangalore", pinCode: "560038" },
    price: 15000,
    bedrooms: 0,
    propertyType: "Studio",
    status: "Listed",
    views: 189,
    requests: 5,
    isVerified: true,
    lastUpdated: "2 days ago",
  },
]

export default function MyProperties() {
  const { token } = useAuth()
  const [properties, setProperties] = useState(defaultProperties)
  const [sortBy, setSortBy] = useState("recent")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:5000/api/property/owner/my-properties", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.ok) throw new Error("Failed to fetch properties")
        const data = await response.json()
        setProperties(data.properties && data.properties.length ? data.properties : defaultProperties)
      } catch (error) {
        console.error("Error fetching properties:", error)
        setProperties(defaultProperties)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [token])

  const handleDelete = async (propertyId) => {
    if (!window.confirm("Are you sure?")) return
    try {
      await fetch(`http://localhost:5000/api/property/${propertyId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      setProperties(prev => prev.filter(p => p._id !== propertyId))
    } catch (error) {
      console.error("Error deleting property:", error)
    }
  }

  const availableCount = properties.filter((p) => p.status === "Listed").length
  const totalViews = properties.reduce((sum, p) => sum + p.views, 0)
  const totalRequests = properties.reduce((sum, p) => sum + p.requests, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">Available Properties</p>
          <p className="text-3xl font-bold text-white mt-2">{availableCount}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">Total Views</p>
          <p className="text-3xl font-bold text-white mt-2">{totalViews}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-400 text-sm">Inquiries</p>
          <p className="text-3xl font-bold text-white mt-2">{totalRequests}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">My Properties</h1>
        <div className="flex gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2"
          >
            <option value="recent">Recently Updated</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
          </select>
          <Link
            to="/owner/add-property"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            + Add Property
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="text-white text-center py-10">Loading properties...</p>
      ) : properties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-300 text-lg mb-4">No properties yet</p>
          <Link
            to="/owner/add-property"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Add Your First Property
          </Link>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Property</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">AI Verified</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Views</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Requests</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Rent</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property, index) => (
                  <tr key={property._id} className={index !== properties.length - 1 ? "border-b border-slate-700" : ""}>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-white">{property.address.street}</p>
                        <p className="text-sm text-slate-400">
                          {property.bedrooms} BHK • {property.propertyType}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {property.address.city}, {property.address.state}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          property.status === "Listed" ? "bg-green-900/30 text-green-300" : "bg-blue-900/30 text-blue-300"
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {property.isVerified ? (
                        <span className="text-green-400 font-semibold">✓ Verified</span>
                      ) : (
                        <span className="text-yellow-400 text-sm">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-white">👁️ {property.views}</td>
                    <td className="px-6 py-4 text-center text-white">{property.requests}</td>
                    <td className="px-6 py-4 text-right font-bold text-green-400">₹{property.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 font-semibold transition">Edit</button>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="text-red-400 hover:text-red-300 font-semibold transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
