"use client"

import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

export default function PropertyCard({ property, onFavoriteChange }) {
  const { token, user } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavorite = async () => {
    if (!token) return

    try {
      const method = isFavorite ? "DELETE" : "POST"
      await fetch(`http://localhost:5000/api/user/favorites/${property._id}`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      })
      setIsFavorite(!isFavorite)
      if (onFavoriteChange) onFavoriteChange()
    } catch (error) {
      console.error("Error updating favorite:", error)
    }
  }

  /* Dark theme property card with safety rating badge and improved hover effects */
  return (
    <div className="property-card group">
      <div className="property-image">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0] || "/placeholder.svg"}
            alt={property.address.street}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-700 text-slate-400">No image</div>
        )}

        {property.safetyRating && (
          <div className="safety-badge">
            <span className="text-yellow-400">★</span> {property.safetyRating}%
          </div>
        )}

        {user?.role === "tenant" && (
          <button
            onClick={handleFavorite}
            className="absolute top-3 left-3 w-10 h-10 rounded-full bg-slate-900 bg-opacity-70 hover:bg-opacity-100 shadow-md flex items-center justify-center transition transform hover:scale-110"
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        )}
      </div>

      <div className="property-info">
        <h3 className="property-title">{property.address.street}</h3>
        <p className="text-sm text-slate-400">
          {property.address.city}, {property.address.state}
        </p>

        <p className="property-price">
          ₹{property.price.toLocaleString()}
          <span className="text-sm text-slate-400">/mo</span>
        </p>

        <div className="flex gap-4 my-3 text-sm text-slate-400">
          <span className="flex items-center gap-1">🛏️ {property.bedrooms} BHK</span>
          <span className="flex items-center gap-1">🚿 {property.bathrooms} Bath</span>
          <span className="capitalize flex items-center gap-1">📍 {property.propertyType}</span>
        </div>

        <p className="text-sm text-slate-300 flex-1">{property.description?.substring(0, 80)}...</p>

        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold hover:shadow-lg">
          View Details
        </button>
      </div>
    </div>
  )
}
