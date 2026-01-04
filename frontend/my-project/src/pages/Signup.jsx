
// "use client"

// import { useState } from "react"
// import { useNavigate, useSearchParams } from "react-router-dom"
// import { useAuth } from "../hooks/useAuth"

// export default function Signup() {
//   const [searchParams] = useSearchParams()
//   const role = searchParams.get("role") || "tenant"
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     phone: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//   const { login } = useAuth()

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSignup = async (e) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, role }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         setError(data.message || "Signup failed")
//         return
//       }

//       login(data.user, data.token)
//       navigate(data.user.role === "tenant" ? "/tenant" : "/owner", { replace: true })
//     } catch (error) {
//       setError("Network error. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-8">
//           <h2 className="text-3xl font-bold text-center text-white mb-8">Create Account</h2>

//           {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">{error}</div>}

//           <form onSubmit={handleSignup} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
//               />
//             </div>

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
//             />

//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
//             />

//             <div>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-400 pr-10"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
//                 >
//                   {showPassword ? "👁️" : "👁️‍🗨️"}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
//             >
//               {loading ? "Creating account..." : "Sign Up"}
//             </button>
//           </form>

//           <p className="text-center text-slate-400 mt-6">
//             Already have an account?{" "}
//             <button
//               onClick={() => navigate(`/login?role=${role}`)}
//               className="text-blue-400 hover:text-blue-300 font-semibold"
//             >
//               Login
//             </button>
//           </p>

//           <button
//             onClick={() => navigate("/role-selection")}
//             className="w-full mt-4 text-slate-400 hover:text-slate-300 py-2 text-sm"
//           >
//             ← Back to Role Selection
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function Signup() {
  const [searchParams] = useSearchParams()
  const role = searchParams.get("role") || "tenant"
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Signup failed")
        return
      }

      login(data.user, data.token)
      navigate(data.user.role === "tenant" ? "/tenant" : "/owner", { replace: true })
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-500/10 rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Join SmartRent</h1>
          <p className="text-slate-400">Create your account and start exploring properties.</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
          <div className="flex gap-8 mb-8 border-b border-slate-700">
            <button
              onClick={() => navigate(`/login?role=${role}`)}
              className="text-slate-400 font-semibold pb-4 hover:text-white transition"
            >
              Log In
            </button>
            <button className="text-white font-semibold pb-4 border-b-2 border-blue-500">Sign Up</button>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700/50 text-red-200 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-4 pr-12 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 mt-8"
            >
              {loading ? "Creating account..." : "Continue"}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-8">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
