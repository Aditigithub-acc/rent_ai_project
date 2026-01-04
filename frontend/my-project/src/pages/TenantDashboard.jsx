"use client"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import TenantNavbar from "../components/TenantNavbar"
import TenantHome from "../components/tenant/TenantHome"
import SearchProperty from "../components/tenant/SearchProperty"
import Favorites from "../components/tenant/Favorites"
import MyProperties from "../components/tenant/MyProperties"
import Community from "../components/tenant/Community"
import Profile from "../components/tenant/Profile"

export default function TenantDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/role-selection", { replace: true })
  }

  return (
    /* Changed background to dark navy theme */
    <div className="min-h-screen bg-slate-900">
      <TenantNavbar onLogout={handleLogout} />

      <main className="pt-20">
        <Routes>
          <Route path="/" element={<TenantHome />} />
          <Route path="/search" element={<SearchProperty />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/my-properties" element={<MyProperties />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}
