import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import RoleSelection from "./pages/RoleSelection"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import TenantDashboard from "./pages/TenantDashboard"
import OwnerDashboard from "./pages/OwnerDashboard"

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/tenant/*"
            element={
              <ProtectedRoute requiredRole="tenant">
                <TenantDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/*"
            element={
              <ProtectedRoute requiredRole="owner">
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/role-selection" replace />} />
          <Route path="*" element={<Navigate to="/role-selection" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
