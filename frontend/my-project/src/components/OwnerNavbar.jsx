"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function OwnerNavbar({ onLogout }) {
  const location = useLocation()
  const { user } = useAuth()
  const [showProfile, setShowProfile] = useState(false)

  const isActive = (path) => (location.pathname.includes(path) ? "text-green-600 border-b-2 border-green-600" : "")

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/owner" className="text-2xl font-bold text-green-600">
          RENT_AI
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link to="/owner" className={`hover:text-green-600 transition ${isActive("")}`}>
            Home
          </Link>
          <Link to="/owner/my-properties" className={`hover:text-green-600 transition ${isActive("my-properties")}`}>
            My Properties
          </Link>
          <Link
            to="/owner/tenant-requests"
            className={`hover:text-green-600 transition ${isActive("tenant-requests")}`}
          >
            Requests
          </Link>
          <Link to="/owner/tenant-records" className={`hover:text-green-600 transition ${isActive("tenant-records")}`}>
            Records
          </Link>
          <Link to="/owner/community" className={`hover:text-green-600 transition ${isActive("community")}`}>
            Community
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition"
          >
            {user?.firstName?.charAt(0).toUpperCase()}
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              <Link to="/owner/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
              <button onClick={onLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
