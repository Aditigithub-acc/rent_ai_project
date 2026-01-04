
// "use client"

// import { useState } from "react"
// import { useNavigate, useSearchParams } from "react-router-dom"
// import { useAuth } from "../hooks/useAuth"

// export default function Login() {
//   const [searchParams] = useSearchParams()
//   const role = searchParams.get("role") || "tenant"
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [showForgotPassword, setShowForgotPassword] = useState(false)
//   const navigate = useNavigate()
//   const { login } = useAuth()

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         setError(data.message || "Login failed")
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
//           <h2 className="text-3xl font-bold text-center text-white mb-8">Welcome Back</h2>

//           {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">{error}</div>}

//           {!showForgotPassword ? (
//             <form onSubmit={handleLogin} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="your@email.com"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-200 mb-2">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
//                     placeholder="••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
//                   >
//                     {showPassword ? "👁️" : "👁️‍🗨️"}
//                   </button>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//             </form>
//           ) : (
//             <ForgotPasswordForm email={email} setEmail={setEmail} />
//           )}

//           {!showForgotPassword && (
//             <>
//               <p className="text-center text-slate-400 mt-6">
//                 Don't have an account?{" "}
//                 <button
//                   onClick={() => navigate(`/signup?role=${role}`)}
//                   className="text-blue-400 hover:text-blue-300 font-semibold"
//                 >
//                   Sign up
//                 </button>
//               </p>

//               <button
//                 onClick={() => setShowForgotPassword(true)}
//                 className="w-full text-slate-400 hover:text-slate-300 py-2 text-sm mt-4"
//               >
//                 Forgot Password?
//               </button>
//             </>
//           )}

//           <button
//             onClick={() => {
//               if (showForgotPassword) {
//                 setShowForgotPassword(false)
//               } else {
//                 navigate("/role-selection")
//               }
//             }}
//             className="w-full mt-4 text-slate-400 hover:text-slate-300 py-2 text-sm"
//           >
//             ← Back
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// function ForgotPasswordForm({ email, setEmail }) {
//   const [resetMethod, setResetMethod] = useState(null)
//   const [otp, setOtp] = useState("")
//   const [newPassword, setNewPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [showNewPassword, setShowNewPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [step, setStep] = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [success, setSuccess] = useState("")
//   const [error, setError] = useState("")

//   const handleSendOTP = async () => {
//     setError("")
//     setLoading(true)

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, method: resetMethod }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         setError(data.message || "Failed to send OTP")
//         return
//       }

//       setStep(2)
//       setSuccess(`OTP sent to your ${resetMethod}`)
//     } catch (error) {
//       setError("Network error. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleVerifyOTP = async () => {
//     if (!otp || newPassword !== confirmPassword) {
//       setError("Please verify OTP and ensure passwords match")
//       return
//     }

//     setError("")
//     setLoading(true)

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/reset-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp, newPassword }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         setError(data.message || "Failed to reset password")
//         return
//       }

//       setSuccess("Password reset successfully! Redirecting to login...")
//       setTimeout(() => {
//         window.location.reload()
//       }, 2000)
//     } catch (error) {
//       setError("Network error. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="space-y-4">
//       {success && (
//         <div className="bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded">{success}</div>
//       )}

//       {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">{error}</div>}

//       {step === 1 && !resetMethod && (
//         <>
//           <div>
//             <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="your@email.com"
//             />
//           </div>

//           <div className="space-y-3 mt-6">
//             <p className="text-slate-300 font-semibold mb-4">Reset Password Via:</p>
//             <button
//               onClick={() => setResetMethod("email")}
//               className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg hover:bg-slate-600 transition font-semibold"
//             >
//               📧 Email
//             </button>
//             <button
//               onClick={() => setResetMethod("phone")}
//               className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg hover:bg-slate-600 transition font-semibold"
//             >
//               📱 Phone
//             </button>
//           </div>
//         </>
//       )}

//       {step === 1 && resetMethod && (
//         <>
//           <p className="text-slate-300 mb-4">
//             We'll send an OTP to your {resetMethod}. Enter it below to reset your password.
//           </p>
//           <button
//             onClick={handleSendOTP}
//             disabled={loading || !email}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
//           >
//             {loading ? "Sending..." : "Send OTP"}
//           </button>
//           <button
//             onClick={() => setResetMethod(null)}
//             className="w-full text-slate-400 hover:text-slate-300 py-2 text-sm"
//           >
//             ← Change method
//           </button>
//         </>
//       )}

//       {step === 2 && (
//         <>
//           <div>
//             <label className="block text-sm font-medium text-slate-200 mb-2">OTP</label>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter 6-digit OTP"
//               maxLength="6"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-200 mb-2">New Password</label>
//             <div className="relative">
//               <input
//                 type={showNewPassword ? "text" : "password"}
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
//                 placeholder="••••••"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowNewPassword(!showNewPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
//               >
//                 {showNewPassword ? "👁️" : "👁️‍🗨️"}
//               </button>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-200 mb-2">Confirm Password</label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
//                 placeholder="••••••"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
//               >
//                 {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
//               </button>
//             </div>
//           </div>

//           <button
//             onClick={handleVerifyOTP}
//             disabled={loading || !otp || !newPassword || !confirmPassword}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
//           >
//             {loading ? "Resetting..." : "Reset Password"}
//           </button>
//         </>
//       )}
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function Login() {
  const [searchParams] = useSearchParams()
  const role = searchParams.get("role") || "tenant"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Login failed")
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
          <h1 className="text-4xl font-bold text-white mb-2">Welcome to SmartRent</h1>
          <p className="text-slate-400">Find your perfect smart home with AI-driven discovery.</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
          {!showForgotPassword ? (
            <>
              <div className="flex gap-8 mb-8 border-b border-slate-700">
                <button className="text-white font-semibold pb-4 border-b-2 border-blue-500">Log In</button>
                <button
                  onClick={() => navigate(`/signup?role=${role}`)}
                  className="text-slate-400 font-semibold pb-4 hover:text-white transition"
                >
                  Sign Up
                </button>
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-700/50 text-red-200 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-slate-300">Password</label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500"
                      placeholder="••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m7.58-1.706l2.121-2.121m-1.414 1.414L3 3m6.364 6.364l-1.414-1.414"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 mt-8"
                >
                  Continue →
                </button>
              </form>

              <div className="mt-8 space-y-4">
                <button className="w-full text-slate-400 hover:text-slate-300 font-semibold transition">
                  💬 Log in with OTP instead
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-800 text-slate-500">OR CONTINUE WITH</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="border border-slate-600 text-slate-300 py-3 rounded-lg hover:border-slate-500 hover:text-white transition font-semibold">
                    👤 Google
                  </button>
                  <button className="border border-slate-600 text-slate-300 py-3 rounded-lg hover:border-slate-500 hover:text-white transition font-semibold">
                    ⭐ Apple
                  </button>
                </div>
              </div>

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
            </>
          ) : (
            <ForgotPasswordForm email={email} setEmail={setEmail} setShowForgotPassword={setShowForgotPassword} />
          )}
        </div>
      </div>
    </div>
  )
}

function ForgotPasswordForm({ email, setEmail, setShowForgotPassword }) {
  const [resetMethod, setResetMethod] = useState(null)
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleSendOTP = async () => {
    setError("")
    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, method: resetMethod }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Failed to send OTP")
        return
      }

      setStep(2)
      setSuccess(`OTP sent to your ${resetMethod}`)
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp || newPassword !== confirmPassword) {
      setError("Please verify OTP and ensure passwords match")
      return
    }

    setError("")
    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Failed to reset password")
        return
      }

      setSuccess("Password reset successfully! Redirecting to login...")
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {success && (
        <div className="bg-green-900/30 border border-green-700/50 text-green-200 px-4 py-3 rounded-lg">{success}</div>
      )}

      {error && <div className="bg-red-900/30 border border-red-700/50 text-red-200 px-4 py-3 rounded-lg">{error}</div>}

      {step === 1 && !resetMethod && (
        <>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-3 mt-6">
            <p className="text-slate-300 font-semibold">Reset Password Via:</p>
            <button
              onClick={() => setResetMethod("email")}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg hover:bg-slate-600 transition font-semibold"
            >
              📧 Email
            </button>
            <button
              onClick={() => setResetMethod("phone")}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg hover:bg-slate-600 transition font-semibold"
            >
              📱 Phone
            </button>
          </div>
        </>
      )}

      {step === 1 && resetMethod && (
        <>
          <p className="text-slate-300 mb-4">
            We'll send an OTP to your {resetMethod}. Enter it below to reset your password.
          </p>
          <button
            onClick={handleSendOTP}
            disabled={loading || !email}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
          <button
            onClick={() => setResetMethod(null)}
            className="w-full text-slate-400 hover:text-slate-300 py-2 text-sm"
          >
            ← Change method
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
              placeholder="Enter 6-digit OTP"
              maxLength="6"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                placeholder="••••••"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showNewPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                placeholder="••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button
            onClick={handleVerifyOTP}
            disabled={loading || !otp || !newPassword || !confirmPassword}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 mt-6"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </>
      )}

      <button
        onClick={() => {
          setShowForgotPassword(false)
          setResetMethod(null)
          setStep(1)
        }}
        className="w-full text-slate-400 hover:text-slate-300 py-2 text-sm mt-4"
      >
        ← Back to Login
      </button>
    </div>
  )
}
