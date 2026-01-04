
// "use client"

// import { useNavigate } from "react-router-dom"
// import { useAuth } from "../hooks/useAuth"

// export default function RoleSelection() {
//   const navigate = useNavigate()
//   const { user } = useAuth()

//   if (user) {
//     navigate(user.role === "tenant" ? "/tenant" : "/owner", { replace: true })
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl">
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold text-white mb-4">RENT_AI</h1>
//           <p className="text-xl text-slate-300">Find your perfect property or connect with tenants</p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8">
//           <div
//             onClick={() => navigate("/login?role=tenant")}
//             className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-8 cursor-pointer hover:shadow-2xl hover:border-blue-500 transition-all duration-300 hover:scale-105"
//           >
//             <div className="text-center">
//               <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <span className="text-4xl">🏠</span>
//               </div>
//               <h2 className="text-2xl font-bold text-white mb-4">I'm a Tenant</h2>
//               <p className="text-slate-300 mb-6">Browse properties, save favorites, and connect with landlords</p>
//               <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
//                 Continue as Tenant
//               </button>
//             </div>
//           </div>

//           <div
//             onClick={() => navigate("/login?role=owner")}
//             className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-8 cursor-pointer hover:shadow-2xl hover:border-green-500 transition-all duration-300 hover:scale-105"
//           >
//             <div className="text-center">
//               <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <span className="text-4xl">🏢</span>
//               </div>
//               <h2 className="text-2xl font-bold text-white mb-4">I'm an Owner</h2>
//               <p className="text-slate-300 mb-6">List your properties and manage tenant applications</p>
//               <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
//                 Continue as Owner
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function RoleSelection() {
  const navigate = useNavigate()
  const { user } = useAuth()

  if (user) {
    navigate(user.role === "tenant" ? "/tenant" : "/owner", { replace: true })
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">RENT_AI</h1>
          <p className="text-xl text-slate-300">Find your perfect property or connect with tenants</p>
        </div>

        <div className="space-y-4">
          {/* Tenant Card */}
          <div
            onClick={() => navigate("/login?role=tenant")}
            className="bg-gradient-to-r from-slate-800 to-slate-700 border border-blue-500/30 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition">
                  <svg className="w-7 h-7 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Tenant</h3>
                  <p className="text-slate-400 text-sm">Find your perfect smart home</p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-slate-600 group-hover:border-blue-500 transition" />
            </div>
          </div>

          {/* Owner Card */}
          <div
            onClick={() => navigate("/login?role=owner")}
            className="bg-gradient-to-r from-slate-800 to-slate-700 border border-green-500/30 rounded-xl p-6 cursor-pointer hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition">
                  <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Owner</h3>
                  <p className="text-slate-400 text-sm">List properties & track income</p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-slate-600 group-hover:border-green-500 transition" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
