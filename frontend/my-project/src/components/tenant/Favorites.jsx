

"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import PropertyCard from "../PropertyCard"

export default function Favorites() {
  const { token } = useAuth()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    fetchFavorites()
  }, [token])

  const fetchFavorites = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setFavorites(data.favorites || [])
    } catch (error) {
      console.error("Error fetching favorites:", error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-300 text-lg">No favorite properties yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((property) => (
            <PropertyCard key={property._id} property={property} onFavoriteChange={fetchFavorites} />
          ))}
        </div>
      )}
    </div>
  )
}
