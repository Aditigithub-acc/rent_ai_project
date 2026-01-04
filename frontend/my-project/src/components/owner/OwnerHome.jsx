// "use client"

// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { useAuth } from "../../hooks/useAuth"

// /* Default stats for owner dashboard demo */
// const DEFAULT_STATS = {
//   totalProperties: 8,
//   vacantProperties: 2,
//   pendingRequests: 5,
//   totalTenants: 12,
// }

// export default function OwnerHome() {
//   const { token } = useAuth()
//   const [stats, setStats] = useState(DEFAULT_STATS)

//   useEffect(() => {
//     fetchStats()
//   }, [token])

//   const fetchStats = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/property/owner/my-properties", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       const data = await response.json()
//       const properties = data.properties || []
//       setStats({
//         totalProperties: properties.length,
//         vacantProperties: properties.filter((p) => p.status === "vacant").length,
//         pendingRequests: 5,
//         totalTenants: 12,
//       })
//     } catch (error) {
//       console.error("Error fetching stats:", error)
//     }
//   }

//   /* Dark theme owner dashboard with enhanced stats cards */
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-slate-100 mb-2">Owner Dashboard</h1>
//         <p className="text-slate-400">Manage your properties and tenant relationships</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-lg transition border border-slate-700 hover:border-blue-500">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-slate-400 font-semibold">Total Properties</h3>
//             <span className="text-3xl">🏠</span>
//           </div>
//           <p className="text-4xl font-bold text-blue-400">{stats.totalProperties}</p>
//           <p className="text-sm text-slate-500 mt-2">Active listings</p>
//         </div>

//         <div className="bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-lg transition border border-slate-700 hover:border-yellow-500">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-slate-400 font-semibold">Vacant Properties</h3>
//             <span className="text-3xl">📭</span>
//           </div>
//           <p className="text-4xl font-bold text-yellow-400">{stats.vacantProperties}</p>
//           <p className="text-sm text-slate-500 mt-2">Ready to rent</p>
//         </div>

//         <div className="bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-lg transition border border-slate-700 hover:border-orange-500">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-slate-400 font-semibold">Pending Requests</h3>
//             <span className="text-3xl">📋</span>
//           </div>
//           <p className="text-4xl font-bold text-orange-400">{stats.pendingRequests}</p>
//           <p className="text-sm text-slate-500 mt-2">Awaiting response</p>
//         </div>

//         <div className="bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-lg transition border border-slate-700 hover:border-green-500">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-slate-400 font-semibold">Total Tenants</h3>
//             <span className="text-3xl">👥</span>
//           </div>
//           <p className="text-4xl font-bold text-green-400">{stats.totalTenants}</p>
//           <p className="text-sm text-slate-500 mt-2">Active tenants</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Link
//           to="/owner/add-property"
//           className="bg-slate-800 rounded-lg shadow-md p-8 text-center hover:shadow-lg transition border border-slate-700 hover:border-blue-500 group"
//         >
//           <span className="text-5xl mb-4 block group-hover:scale-110 transition">➕</span>
//           <h2 className="text-xl font-bold text-slate-100 mb-2">Add New Property</h2>
//           <p className="text-slate-400">List a new property to attract tenants</p>
//         </Link>

//         <Link
//           to="/owner/my-properties"
//           className="bg-slate-800 rounded-lg shadow-md p-8 text-center hover:shadow-lg transition border border-slate-700 hover:border-blue-500 group"
//         >
//           <span className="text-5xl mb-4 block group-hover:scale-110 transition">🔑</span>
//           <h2 className="text-xl font-bold text-slate-100 mb-2">Manage Properties</h2>
//           <p className="text-slate-400">Edit, delete, or view all your properties</p>
//         </Link>

//         <Link
//           to="/owner/tenant-requests"
//           className="bg-slate-800 rounded-lg shadow-md p-8 text-center hover:shadow-lg transition border border-slate-700 hover:border-blue-500 group"
//         >
//           <span className="text-5xl mb-4 block group-hover:scale-110 transition">📧</span>
//           <h2 className="text-xl font-bold text-slate-100 mb-2">Tenant Requests</h2>
//           <p className="text-slate-400">Review and respond to rental applications</p>
//         </Link>
//       </div>
//     </div>
//   )
// }









// "use client"

// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { useAuth } from "../../hooks/useAuth"

// export default function OwnerHome() {
//   const { token } = useAuth()
//   const [properties, setProperties] = useState([])
//   const [requests, setRequests] = useState([])
//   const [loading, setLoading] = useState(true)

//   const defaultProperties = [
//     { _id: "1", address: "Modern 2BHK Apartment", city: "Koramangala", price: 25000, status: "Listed", views: 234, requests: 12 },
//     { _id: "2", address: "Cozy 1BHK Flat", city: "HSR Layout", price: 18000, status: "Rented", views: 156, requests: 8 },
//     { _id: "3", address: "Spacious Studio", city: "Indiranagar", price: 15000, status: "Listed", views: 189, requests: 5 },
//   ]

//   const defaultRequests = [
//     { _id: "1", tenant: "Priya Patel", property: "Modern 2BHK Apartment", status: "pending" },
//     { _id: "2", tenant: "Amit Kumar", property: "Cozy 1BHK Flat", status: "accepted" },
//     { _id: "3", tenant: "Sneha Reddy", property: "Spacious Studio", status: "rejected" },
//   ]

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true)
//       try {
//         const resProps = await fetch("http://localhost:5000/api/property/owner/my-properties", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         const dataProps = await resProps.json()
//         setProperties(dataProps.properties?.length ? dataProps.properties : defaultProperties)

//         const resReq = await fetch("http://localhost:5000/api/request/owner/requests", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         const dataReq = await resReq.json()
//         setRequests(dataReq.requests?.length ? dataReq.requests : defaultRequests)
//       } catch (err) {
//         console.error(err)
//         setProperties(defaultProperties)
//         setRequests(defaultRequests)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [token])

//   const availableCount = properties.filter(p => p.status === "Listed").length
//   const totalViews = properties.reduce((sum, p) => sum + p.views, 0)
//   const totalRequests = requests.length

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Top Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           <div className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/20 transition">
//             <p className="text-slate-400 font-medium">Available Properties</p>
//             <p className="text-4xl font-bold text-white mt-2">{availableCount}</p>
//           </div>
//           <div className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/20 transition">
//             <p className="text-slate-400 font-medium">Total Views</p>
//             <p className="text-4xl font-bold text-white mt-2">{totalViews}</p>
//           </div>
//           <div className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/20 transition">
//             <p className="text-slate-400 font-medium">Tenant Requests</p>
//             <p className="text-4xl font-bold text-white mt-2">{totalRequests}</p>
//           </div>
//         </div>

//         {/* Properties Section */}
//         <div>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold text-white">My Properties</h2>
//             <Link
//               to="/owner/add-property"
//               className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl font-semibold text-white transition"
//             >
//               + Add Property
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {properties.map((prop) => (
//               <div key={prop._id} className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-blue-500/20 transition">
//                 <p className="font-semibold text-white text-lg">{prop.address}</p>
//                 <p className="text-slate-400 text-sm">{prop.city}</p>
//                 <div className="flex justify-between mt-4 text-sm text-slate-300">
//                   <span>Status: <span className="font-semibold text-white">{prop.status}</span></span>
//                   <span>Views: {prop.views}</span>
//                 </div>
//                 <div className="flex justify-between mt-2 text-sm text-slate-300">
//                   <span>Requests: {prop.requests}</span>
//                   <span>Rent: ₹{prop.price.toLocaleString()}</span>
//                 </div>
//                 <div className="flex gap-2 mt-4">
//                   <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 font-semibold transition">
//                     Edit
//                   </button>
//                   <button className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-2 font-semibold transition">
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Tenant Requests Section */}
//         <div>
//           <h2 className="text-2xl font-bold text-white mb-4">Recent Tenant Requests</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {requests.map((req) => (
//               <div key={req._id} className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-blue-500/20 transition">
//                 <p className="font-semibold text-white">{req.tenant}</p>
//                 <p className="text-slate-400 text-sm">{req.property}</p>
//                 <span
//                   className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
//                     req.status === "pending"
//                       ? "bg-yellow-900/30 text-yellow-300"
//                       : req.status === "accepted"
//                       ? "bg-green-900/30 text-green-300"
//                       : "bg-red-900/30 text-red-300"
//                   }`}
//                 >
//                   {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {loading && <p className="text-center text-white text-lg">Loading data...</p>}
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function OwnerDashboard() {
  const { token } = useAuth()
  const [properties, setProperties] = useState([])
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  // Dummy data in case backend fails
  const defaultProperties = [
    { _id: "1", address: "Modern 2BHK Apartment", city: "Koramangala", price: 25000, status: "Listed", views: 234, requests: 12, verified: true },
    { _id: "2", address: "Cozy 1BHK Flat", city: "HSR Layout", price: 18000, status: "Rented", views: 156, requests: 8, verified: true },
    { _id: "3", address: "Spacious Studio", city: "Indiranagar", price: 15000, status: "Listed", views: 189, requests: 5, verified: false },
  ]

  const defaultRequests = [
    { _id: "1", tenant: "Priya Patel", property: "Modern 2BHK Apartment", status: "pending", timeAgo: "2 hours ago" },
    { _id: "2", tenant: "Amit Kumar", property: "Cozy 1BHK Flat", status: "accepted", timeAgo: "5 hours ago" },
    { _id: "3", tenant: "Sneha Reddy", property: "Spacious Studio", status: "rejected", timeAgo: "1 day ago" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const resProps = await fetch("http://localhost:5000/api/property/owner/my-properties", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const dataProps = await resProps.json()
        setProperties(dataProps.properties?.length ? dataProps.properties : defaultProperties)

        const resReq = await fetch("http://localhost:5000/api/request/owner/requests", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const dataReq = await resReq.json()
        setRequests(dataReq.requests?.length ? dataReq.requests : defaultRequests)
      } catch (err) {
        console.error(err)
        setProperties(defaultProperties)
        setRequests(defaultRequests)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token])

  // Derived metrics
  const availableCount = properties.filter(p => p.status === "Listed").length
  const totalViews = properties.reduce((sum, p) => sum + p.views, 0)
  const totalRequests = requests.length
  const newRequestsToday = requests.filter(r => r.timeAgo.includes("hours")).length
  const totalEarnings = properties.reduce((sum, p) => sum + (p.price || 0), 0)
  const verifiedCount = properties.filter(p => p.verified).length
  const occupancyRate = ((properties.length - availableCount) / properties.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Greeting + Quick Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white">Welcome Back, Owner!</h1>
            <p className="text-slate-400 mt-1">Here's a quick overview of your properties and requests</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 w-full sm:w-auto">
            {[
              { label: "Available Properties", value: availableCount, color: "blue" },
              { label: "Total Views", value: totalViews, color: "blue" },
              { label: "Tenant Requests", value: totalRequests, color: "green" },
              { label: "New Requests Today", value: newRequestsToday, color: "yellow" },
              { label: "Total Earnings", value: `₹${totalEarnings.toLocaleString()}`, color: "green" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`bg-slate-800 rounded-2xl p-5 shadow-lg hover:shadow-${stat.color}-500/30 transition`}
              >
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/owner/add-property"
            className="bg-green-600 hover:bg-green-700 text-white rounded-2xl py-5 px-6 text-center font-semibold shadow-md transition transform hover:scale-105"
          >
            + Add Property
          </Link>
          <Link
            to="/owner/requests"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-5 px-6 text-center font-semibold shadow-md transition transform hover:scale-105"
          >
            View All Requests
          </Link>
          <Link
            to="/owner/chat"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-5 px-6 text-center font-semibold shadow-md transition transform hover:scale-105"
          >
            Chat with Tenants
          </Link>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Properties */}
          <div className="bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-blue-500/20 transition">
            <h2 className="text-2xl font-bold text-white mb-4">Recent Property Updates</h2>
            <div className="space-y-3">
              {properties.slice(0, 3).map(p => (
                <div key={p._id} className="flex justify-between items-center bg-slate-900/50 p-3 rounded-xl">
                  <div>
                    <p className="text-white font-semibold">{p.address}</p>
                    <p className="text-slate-400 text-sm">{p.city}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    p.status === "Listed"
                      ? "bg-green-900/30 text-green-300"
                      : "bg-blue-900/30 text-blue-300"
                  }`}>{p.status}</span> 
                </div>
              ))}
            </div>
          </div>

          {/* Recent Requests */}
          <div className="bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-blue-500/20 transition">
            <h2 className="text-2xl font-bold text-white mb-4">Recent Tenant Requests</h2>
            <div className="space-y-3">
              {requests.slice(0, 3).map(r => (
                <div key={r._id} className="flex justify-between items-center bg-slate-900/50 p-3 rounded-xl">
                  <div>
                    <p className="text-white font-semibold">{r.tenant}</p>
                    <p className="text-slate-400 text-sm">{r.property}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    r.status === "pending"
                      ? "bg-yellow-900/30 text-yellow-300"
                      : r.status === "accepted"
                      ? "bg-green-900/30 text-green-300"
                      : "bg-red-900/30 text-red-300"
                  }`}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Extra Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-blue-500/20 transition">
            <p className="text-slate-400 text-sm">AI Verified Properties</p>
            <p className="text-3xl font-bold text-white mt-2">{verifiedCount}/{properties.length}</p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-blue-500/20 transition">
            <p className="text-slate-400 text-sm">Occupancy Rate</p>
            <p className="text-3xl font-bold text-white mt-2">{occupancyRate.toFixed(0)}%</p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-blue-500/20 transition">
            <p className="text-slate-400 text-sm">Alerts</p>
            <p className="text-3xl font-bold text-white mt-2">{requests.filter(r => r.status === "pending").length > 5 ? "⚠️ High Pending" : "✅ All Good"}</p>
          </div>
        </div>

        {loading && <p className="text-center text-white text-lg mt-4">Loading dashboard...</p>}
      </div>
    </div>
  )
}
