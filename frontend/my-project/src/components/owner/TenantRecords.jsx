// // export default function TenantRecords() {
// //   return (
// //     <div className="max-w-4xl mx-auto px-4 py-8">
// //       <h1 className="text-4xl font-bold text-gray-900 mb-8">Tenant Records</h1>
// //       <div className="bg-white rounded-lg shadow-md p-6">
// //         <p className="text-gray-600">Manage bills and past/present tenant information</p>
// //       </div>
// //     </div>
// //   )
// // }
// "use client"

// import { useState } from "react"

// const DEFAULT_TENANTS = [
//   {
//     _id: "1",
//     name: "Priya Patel",
//     email: "priya.patel@google.com",
//     phone: "+91 98765 43210",
//     property: "Modern 2BHK Apartment",
//     rent: "₹25,000",
//     status: "Active",
//     moveIn: "01 Feb 2024",
//     moveOut: "-",
//     lastPayment: "28 Dec 2025",
//   },
//   {
//     _id: "2",
//     name: "Amit Kumar",
//     email: "amit.kumar@flipkart.com",
//     phone: "+91 87654 32109",
//     property: "Cozy 1BHK Flat",
//     rent: "₹18,000",
//     status: "Active",
//     moveIn: "15 Feb 2024",
//     moveOut: "-",
//     lastPayment: "30 Dec 2025",
//   },
//   {
//     _id: "3",
//     name: "Sneha Reddy",
//     email: "sneha.reddy@iimb.org",
//     phone: "+91 76543 21098",
//     property: "Spacious Studio",
//     rent: "₹15,000",
//     status: "Pending",
//     moveIn: "10 Feb 2024",
//     moveOut: "-",
//     lastPayment: "25 Dec 2025",
//   },
//   {
//     _id: "4",
//     name: "Rahul Singh",
//     email: "rahul.singh@amazon.in",
//     phone: "+91 65432 10987",
//     property: "Modern 2BHK Apartment",
//     rent: "₹22,000",
//     status: "Inactive",
//     moveIn: "20 Feb 2023",
//     moveOut: "31 Dec 2023",
//     lastPayment: "31 Dec 2023",
//   },
// ]

// export default function TenantRecords() {
//   const [tenants, setTenants] = useState(DEFAULT_TENANTS)

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div>
//           <h1 className="text-4xl font-bold text-white mb-2">Tenant Records</h1>
//           <p className="text-slate-400">Manage bills and past/present tenant information</p>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
//           <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-blue-500/30 transition">
//             <p className="text-slate-400 text-sm">Total Tenants</p>
//             <p className="text-3xl font-bold text-white mt-2">{tenants.length}</p>
//           </div>
//           <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-green-500/30 transition">
//             <p className="text-slate-400 text-sm">Active Tenants</p>
//             <p className="text-3xl font-bold text-white mt-2">{tenants.filter(t => t.status === "Active").length}</p>
//           </div>
//           <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-yellow-500/30 transition">
//             <p className="text-slate-400 text-sm">Pending Tenants</p>
//             <p className="text-3xl font-bold text-white mt-2">{tenants.filter(t => t.status === "Pending").length}</p>
//           </div>
//           <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-red-500/30 transition">
//             <p className="text-slate-400 text-sm">Inactive Tenants</p>
//             <p className="text-3xl font-bold text-white mt-2">{tenants.filter(t => t.status === "Inactive").length}</p>
//           </div>
//         </div>

//         {/* Tenant Table */}
//         <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-md">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead className="bg-slate-900/50">
//                 <tr>
//                   <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Tenant</th>
//                   <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Property</th>
//                   <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Rent</th>
//                   <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Status</th>
//                   <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Move-in</th>
//                   <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Move-out</th>
//                   <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Last Payment</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tenants.map(t => (
//                   <tr key={t._id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
//                     <td className="px-6 py-4 text-white font-medium">{t.name}<br/><span className="text-slate-400 text-sm">{t.email}</span></td>
//                     <td className="px-6 py-4 text-slate-300">{t.property}</td>
//                     <td className="px-6 py-4 text-green-400 font-semibold">{t.rent}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                         t.status === "Active" ? "bg-green-900/30 text-green-300" :
//                         t.status === "Pending" ? "bg-yellow-900/30 text-yellow-300" :
//                         "bg-red-900/30 text-red-300"
//                       }`}>{t.status}</span>
//                     </td>
//                     <td className="px-6 py-4 text-slate-300">{t.moveIn}</td>
//                     <td className="px-6 py-4 text-slate-300">{t.moveOut}</td>
//                     <td className="px-6 py-4 text-slate-300">{t.lastPayment}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Empty state if no tenants */}
//         {tenants.length === 0 && (
//           <div className="text-center py-12 text-slate-400">
//             <p>No tenant records found.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useState } from "react"

// const DEFAULT_TENANTS = [
//   {
//     _id: "1",
//     name: "Priya Patel",
//     email: "priya.patel@google.com",
//     phone: "+91 98765 43210",
//     property: "Modern 2BHK Apartment",
//     rent: "₹25,000",
//     status: "Active",
//     rentStatus: "All Clear",
//     moveIn: "01 Feb 2024",
//     moveOut: "-",
//     lastPayment: "28 Dec 2025",
//   },
//   {
//     _id: "2",
//     name: "Amit Kumar",
//     email: "amit.kumar@flipkart.com",
//     phone: "+91 87654 32109",
//     property: "Cozy 1BHK Flat",
//     rent: "₹18,000",
//     status: "Active",
//     rentStatus: "Pending",
//     moveIn: "15 Feb 2024",
//     moveOut: "-",
//     lastPayment: "30 Dec 2025",
//   },
//   {
//     _id: "3",
//     name: "Sneha Reddy",
//     email: "sneha.reddy@iimb.org",
//     phone: "+91 76543 21098",
//     property: "Spacious Studio",
//     rent: "₹15,000",
//     status: "Pending",
//     rentStatus: "Pending",
//     moveIn: "10 Feb 2024",
//     moveOut: "-",
//     lastPayment: "25 Dec 2025",
//   },
//   {
//     _id: "4",
//     name: "Rahul Singh",
//     email: "rahul.singh@amazon.in",
//     phone: "+91 65432 10987",
//     property: "Modern 2BHK Apartment",
//     rent: "₹22,000",
//     status: "Inactive",
//     rentStatus: "All Clear",
//     moveIn: "20 Feb 2023",
//     moveOut: "31 Dec 2023",
//     lastPayment: "31 Dec 2023",
//   },
// ]

// export default function TenantRecords() {
//   const [tenants, setTenants] = useState(DEFAULT_TENANTS)

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div>
//           <h1 className="text-4xl font-bold text-white mb-2">Tenant Records</h1>
//           <p className="text-slate-400">Manage bills and past/present tenant information</p>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
//           <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-blue-500/30 transition">
//             <p className="text-slate-400 text-sm">Total Tenants</p>
//             <p className="text-3xl font-bold text-white mt-2">{tenants.length}</p>
//           </div>
//           <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-green-500/30 transition">
//             <p className="text-slate-400 text-sm">Active Tenants</p>
//             <p className="text-3xl font-bold text-white mt-2">{tenants.filter(t => t.status === "Active").length}</p>
//           </div>
//           <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-yellow-500/30 transition">
//             <p className="text-slate-400 text-sm">Pending Tenants</p>
//             <p className="text-3xl font-bold text-white mt-2">{tenants.filter(t => t.status === "Pending").length}</p>
//           </div>
//           <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-red-500/30 transition">
//             <p className="text-slate-400 text-sm">Inactive Tenants</p>
//             <p className="text-3xl font-bold text-white mt-2">{tenants.filter(t => t.status === "Inactive").length}</p>
//           </div>
//           <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-pink-500/30 transition">
//             <p className="text-slate-400 text-sm">Pending Rent</p>
//             <p className="text-3xl font-bold text-white mt-2">{tenants.filter(t => t.rentStatus === "Pending").length}</p>
//           </div>
//         </div>

//         {/* Tenant Table */}
//         <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-md">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead className="bg-slate-900/50">
//                 <tr>
//                   <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Tenant</th>
//                   <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Property</th>
//                   <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Rent</th>
//                   <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Rent Status</th>
//                   <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Tenant Status</th>
//                   <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Move-in</th>
//                   <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Move-out</th>
//                   <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Last Payment</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tenants.map(t => (
//                   <tr key={t._id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
//                     <td className="px-6 py-4 text-white font-medium">{t.name}<br/><span className="text-slate-400 text-sm">{t.email}</span></td>
//                     <td className="px-6 py-4 text-slate-300">{t.property}</td>
//                     <td className="px-6 py-4 text-green-400 font-semibold">{t.rent}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                         t.rentStatus === "All Clear" ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"
//                       }`}>{t.rentStatus}</span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                         t.status === "Active" ? "bg-green-900/30 text-green-300" :
//                         t.status === "Pending" ? "bg-yellow-900/30 text-yellow-300" :
//                         "bg-red-900/30 text-red-300"
//                       }`}>{t.status}</span>
//                     </td>
//                     <td className="px-6 py-4 text-slate-300">{t.moveIn}</td>
//                     <td className="px-6 py-4 text-slate-300">{t.moveOut}</td>
//                     <td className="px-6 py-4 text-slate-300">{t.lastPayment}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Empty state if no tenants */}
//         {tenants.length === 0 && (
//           <div className="text-center py-12 text-slate-400">
//             <p>No tenant records found.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"

const DEFAULT_TENANTS = [
  {
    _id: "1",
    name: "Priya Patel",
    email: "priya.patel@google.com",
    phone: "+91 98765 43210",
    property: "Modern 2BHK Apartment",
    rent: "₹25,000",
    status: "Active",
    rentStatus: "All Clear", // Rent paid
    moveIn: "01 Feb 2024",
    moveOut: "-",
    lastPayment: "28 Dec 2025",
  },
  {
    _id: "2",
    name: "Amit Kumar",
    email: "amit.kumar@flipkart.com",
    phone: "+91 87654 32109",
    property: "Cozy 1BHK Flat",
    rent: "₹18,000",
    status: "Active",
    rentStatus: "Pending", // Rent pending
    moveIn: "15 Feb 2024",
    moveOut: "-",
    lastPayment: "30 Nov 2025",
  },
  {
    _id: "3",
    name: "Sneha Reddy",
    email: "sneha.reddy@iimb.org",
    phone: "+91 76543 21098",
    property: "Spacious Studio",
    rent: "₹15,000",
    status: "Pending",
    rentStatus: "Pending",
    moveIn: "10 Feb 2024",
    moveOut: "-",
    lastPayment: "25 Nov 2025",
  },
  {
    _id: "4",
    name: "Rahul Singh",
    email: "rahul.singh@amazon.in",
    phone: "+91 65432 10987",
    property: "Modern 2BHK Apartment",
    rent: "₹22,000",
    status: "Inactive",
    rentStatus: "All Clear",
    moveIn: "20 Feb 2023",
    moveOut: "31 Dec 2023",
    lastPayment: "31 Dec 2023",
  },
  {
    _id: "5",
    name: "Divya Sharma",
    email: "divya.sharma@microsoft.com",
    phone: "+91 54321 09876",
    property: "Cozy 1BHK Flat",
    rent: "₹20,000",
    status: "Active",
    rentStatus: "Pending",
    moveIn: "05 Mar 2024",
    moveOut: "-",
    lastPayment: "20 Nov 2025",
  },
  {
    _id: "6",
    name: "Nikhil Pande",
    email: "nikhil.pande@accenture.com",
    phone: "+91 43210 98765",
    property: "Spacious Studio",
    rent: "₹14,000",
    status: "Active",
    rentStatus: "All Clear",
    moveIn: "12 Mar 2024",
    moveOut: "-",
    lastPayment: "28 Dec 2025",
  },
]

export default function TenantRecords() {
  const [tenants, setTenants] = useState(DEFAULT_TENANTS)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Tenant Records</h1>
          <p className="text-slate-400">Manage bills and past/present tenant information</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-blue-500/30 transition">
            <p className="text-slate-400 text-sm">Total Tenants</p>
            <p className="text-3xl font-bold text-white mt-2">{tenants.length}</p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-green-500/30 transition">
            <p className="text-slate-400 text-sm">Active Tenants</p>
            <p className="text-3xl font-bold text-white mt-2">{tenants.filter(t => t.status === "Active").length}</p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-yellow-500/30 transition">
            <p className="text-slate-400 text-sm">Pending Tenants</p>
            <p className="text-3xl font-bold text-white mt-2">{tenants.filter(t => t.status === "Pending").length}</p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-red-500/30 transition">
            <p className="text-slate-400 text-sm">Inactive Tenants</p>
            <p className="text-3xl font-bold text-white mt-2">{tenants.filter(t => t.status === "Inactive").length}</p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-pink-500/30 transition">
            <p className="text-slate-400 text-sm">Pending Rent</p>
            <p className="text-3xl font-bold text-white mt-2">{tenants.filter(t => t.rentStatus === "Pending").length}</p>
          </div>
        </div>

        {/* Tenant Table */}
        <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Tenant</th>
                  <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Property</th>
                  <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Rent</th>
                  <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Rent Status</th>
                  <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Tenant Status</th>
                  <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Move-in</th>
                  <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Move-out</th>
                  <th className="px-6 py-3 text-slate-300 text-sm font-semibold">Last Payment</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map(t => (
                  <tr key={t._id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                    <td className="px-6 py-4 text-white font-medium">{t.name}<br/><span className="text-slate-400 text-sm">{t.email}</span></td>
                    <td className="px-6 py-4 text-slate-300">{t.property}</td>
                    <td className="px-6 py-4 text-green-400 font-semibold">{t.rent}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        t.rentStatus === "All Clear" ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"
                      }`}>{t.rentStatus}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        t.status === "Active" ? "bg-green-900/30 text-green-300" :
                        t.status === "Pending" ? "bg-yellow-900/30 text-yellow-300" :
                        "bg-red-900/30 text-red-300"
                      }`}>{t.status}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{t.moveIn}</td>
                    <td className="px-6 py-4 text-slate-300">{t.moveOut}</td>
                    <td className="px-6 py-4 text-slate-300">{t.lastPayment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty state if no tenants */}
        {tenants.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p>No tenant records found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
