"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import LoadingSkeleton from "./LoadingSkeleton"

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSkeleton />

  if (!user) return <Navigate to="/role-selection" replace />

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === "tenant" ? "/tenant" : "/owner"} replace />
  }

  return children
}
