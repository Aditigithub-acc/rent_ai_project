"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function TenantNavbar({ onLogout }) {
  const location = useLocation()
  const { user } = useAuth()
  const [showProfile, setShowProfile] = useState(false)

  const isActive = (path) =>
    location.pathname.includes(path)
      ? "text-blue-400 border-b-2 border-blue-400"
      : "text-white"

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/tenant" className="text-2xl font-bold text-blue-400 tracking-wide">
          RENT_AI
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 font-medium">
          <Link to="/tenant" className={`hover:text-blue-400 transition ${isActive("/tenant")}`}>
            Home
          </Link>
          <Link to="/tenant/search" className={`hover:text-blue-400 transition ${isActive("search")}`}>
            Search Property
          </Link>
          <Link to="/tenant/community" className={`hover:text-blue-400 transition ${isActive("community")}`}>
            Community
          </Link>
          <Link to="/tenant/my-properties" className={`hover:text-blue-400 transition ${isActive("my-properties")}`}>
            My Properties
          </Link>
          <Link to="/tenant/favorites" className={`hover:text-blue-400 transition ${isActive("favorites")}`}>
            Favorites
          </Link>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition shadow-lg"
          >
            {user?.firstName?.charAt(0).toUpperCase()}
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-3 w-48 bg-slate-900/90 backdrop-blur rounded-xl shadow-lg py-2 border border-slate-700">
              <Link
                to="/tenant/profile"
                className="block px-4 py-2 text-slate-200 hover:bg-slate-800 transition"
              >
                Profile
              </Link>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-800 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
