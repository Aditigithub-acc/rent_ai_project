"use client"

import { Routes, Route, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import OwnerNavbar from "../components/OwnerNavbar"
import OwnerHome from "../components/owner/OwnerHome"
import MyProperties from "../components/owner/MyProperties"
import AddProperty from "../components/owner/AddProperty"
import TenantRequests from "../components/owner/TenantRequests"
import TenantRecords from "../components/owner/TenantRecords"
import OwnerCommunity from "../components/owner/OwnerCommunity"
import OwnerProfile from "../components/owner/OwnerProfile"

export default function OwnerDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/role-selection", { replace: true })
  }

  return (
    /* Dark navy blue background for owner dashboard */
    <div className="min-h-screen bg-slate-900">
      <OwnerNavbar onLogout={handleLogout} />

      <main className="pt-20">
        <Routes>
          <Route path="/" element={<OwnerHome />} />
          <Route path="/my-properties" element={<MyProperties />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/tenant-requests" element={<TenantRequests />} />
          <Route path="/tenant-records" element={<TenantRecords />} />
          <Route path="/community" element={<OwnerCommunity />} />
          <Route path="/profile" element={<OwnerProfile />} />
        </Routes>
      </main>
    </div>
  )
}
