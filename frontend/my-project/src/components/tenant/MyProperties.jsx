// "use client"

// import { useState, useEffect } from "react"
// import { useAuth } from "../../hooks/useAuth"

// export default function MyProperties() {
//   const { token } = useAuth()
//   const [properties, setProperties] = useState([])

//   useEffect(() => {
//     fetchMyProperties()
//   }, [token])

//   const fetchMyProperties = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/property/owner/my-properties", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       const data = await response.json()
//       setProperties(data.properties || [])
//     } catch (error) {
//       console.error("Error fetching properties:", error)
//     }
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-8">My Properties</h1>

//       <div className="space-y-4">
//         {properties.map((prop) => (
//           <div key={prop._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-900">{prop.address.street}</h3>
//                 <p className="text-gray-600">
//                   {prop.address.city}, {prop.address.state} {prop.address.pinCode}
//                 </p>
//                 <p className="text-lg font-semibold text-blue-600 mt-2">₹{prop.price}/month</p>
//                 <p className="text-sm text-gray-600 mt-2">
//                   Status:{" "}
//                   <span className={prop.status === "vacant" ? "text-green-600" : "text-orange-600"}>{prop.status}</span>
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-gray-600">{prop.bedrooms} BHK</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { useAuth } from "../../hooks/useAuth"

// // Dummy images for properties
// const PROPERTY_IMAGES = [
//   "https://images.unsplash.com/photo-1598928506313-55f1f320f03f?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1600585154217-91a979ce2c47?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1560448204-0d2f93cf5f20?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1572120360610-d971b9c0c7ab?auto=format&fit=crop&w=800&q=80",
// ]

// export default function MyProperties() {
//   const { token } = useAuth()
//   const [properties, setProperties] = useState([])

//   // Dummy data
//   const DEFAULT_PROPERTIES = [
//     {
//       _id: "1",
//       address: { street: "Modern 2BHK Apartment", city: "Koramangala", state: "Bangalore", pinCode: "560034" },
//       price: 25000,
//       bedrooms: 2,
//       status: "vacant",
//       image: PROPERTY_IMAGES[0],
//     },
//     {
//       _id: "2",
//       address: { street: "Cozy 1BHK Flat", city: "HSR Layout", state: "Bangalore", pinCode: "560102" },
//       price: 18000,
//       bedrooms: 1,
//       status: "occupied",
//       image: PROPERTY_IMAGES[1],
//     },
//     {
//       _id: "3",
//       address: { street: "Spacious Studio", city: "Indiranagar", state: "Bangalore", pinCode: "560038" },
//       price: 15000,
//       bedrooms: 0,
//       status: "vacant",
//       image: PROPERTY_IMAGES[2],
//     },
//     {
//       _id: "4",
//       address: { street: "Luxury 3BHK Apartment", city: "Whitefield", state: "Bangalore", pinCode: "560066" },
//       price: 40000,
//       bedrooms: 3,
//       status: "occupied",
//       image: PROPERTY_IMAGES[3],
//     },
//     {
//       _id: "5",
//       address: { street: "Minimalist 1BHK Loft", city: "Jayanagar", state: "Bangalore", pinCode: "560041" },
//       price: 20000,
//       bedrooms: 1,
//       status: "vacant",
//       image: PROPERTY_IMAGES[4],
//     },
//   ]

//   useEffect(() => {
//     fetchMyProperties()
//   }, [token])

//   const fetchMyProperties = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/property/owner/my-properties", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       const data = await response.json()
//       setProperties(
//         (data.properties || DEFAULT_PROPERTIES).map((prop, index) => ({
//           ...prop,
//           image: prop.image || PROPERTY_IMAGES[index % PROPERTY_IMAGES.length],
//         }))
//       )
//     } catch (error) {
//       console.error("Error fetching properties:", error)
//       setProperties(DEFAULT_PROPERTIES)
//     }
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-8">My Properties</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {properties.map((prop) => (
//           <div
//             key={prop._id}
//             className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl duration-300"
//           >
//             <div className="h-52 w-full overflow-hidden">
//               <img
//                 src={prop.image}
//                 alt={prop.address.street}
//                 className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//               />
//             </div>
//             <div className="p-6">
//               <h3 className="text-2xl font-bold text-gray-900">{prop.address.street}</h3>
//               <p className="text-gray-600">
//                 {prop.address.city}, {prop.address.state} {prop.address.pinCode}
//               </p>
//               <p className="text-lg font-semibold text-blue-600 mt-2">₹{prop.price}/month</p>
//               <p className="text-sm text-gray-600 mt-2">
//                 Status:{" "}
//                 <span className={prop.status === "vacant" ? "text-green-600" : "text-orange-600"}>{prop.status}</span>
//               </p>
//               <p className="text-sm text-gray-600 mt-1">{prop.bedrooms} BHK</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import { useAuth } from "../../hooks/useAuth"

// // Dummy properties data with images
// const DEFAULT_PROPERTIES = [
//   {
//     _id: "1",
//     address: { street: "Modern 2BHK Apartment", city: "Koramangala", state: "Bangalore", pinCode: "560034" },
//     price: 25000,
//     bedrooms: 2,
//     status: "vacant",
//     image: "https://picsum.photos/800/520?random=1",
//   },
//   {
//     _id: "2",
//     address: { street: "Cozy 1BHK Flat", city: "HSR Layout", state: "Bangalore", pinCode: "560102" },
//     price: 18000,
//     bedrooms: 1,
//     status: "occupied",
//     image: "https://picsum.photos/800/520?random=2",
//   },
//   {
//     _id: "3",
//     address: { street: "Spacious Studio", city: "Indiranagar", state: "Bangalore", pinCode: "560038" },
//     price: 15000,
//     bedrooms: 0,
//     status: "vacant",
//     image: "https://picsum.photos/800/520?random=3",
//   },
//   {
//     _id: "4",
//     address: { street: "Luxury 3BHK Villa", city: "Whitefield", state: "Bangalore", pinCode: "560066" },
//     price: 45000,
//     bedrooms: 3,
//     status: "vacant",
//     image: "https://picsum.photos/800/520?random=4",
//   },
//   {
//     _id: "5",
//     address: { street: "Cozy 2BHK Apartment", city: "MG Road", state: "Bangalore", pinCode: "560001" },
//     price: 30000,
//     bedrooms: 2,
//     status: "occupied",
//     image: "https://picsum.photos/800/520?random=5",
//   },
// ]

// export default function MyProperties() {
//   const { token } = useAuth()
//   const [properties, setProperties] = useState([])

//   useEffect(() => {
//     fetchMyProperties()
//   }, [token])

//   const fetchMyProperties = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/property/owner/my-properties", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       const data = await response.json()
//       setProperties(data.properties || DEFAULT_PROPERTIES)
//     } catch (error) {
//       console.error("Error fetching properties:", error)
//       setProperties(DEFAULT_PROPERTIES)
//     }
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-white mb-8">My Properties</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {properties.map((prop) => (
//           <div
//             key={prop._id}
//             className="bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105"
//           >
//             {/* Property Image */}
//             <div className="h-52 w-full overflow-hidden">
//               <img
//                 src={prop.image}
//                 alt={prop.address.street}
//                 className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
//               />
//             </div>

//             {/* Property Details */}
//             <div className="p-6">
//               <h3 className="text-2xl font-bold text-white">{prop.address.street}</h3>
//               <p className="text-slate-300 mt-1">
//                 {prop.address.city}, {prop.address.state} {prop.address.pinCode}
//               </p>
//               <p className="text-lg font-semibold text-green-400 mt-2">₹{prop.price.toLocaleString()}/month</p>
//               <p className="text-sm text-slate-400 mt-1">
//                 Status:{" "}
//                 <span className={prop.status === "vacant" ? "text-green-400 font-semibold" : "text-orange-400 font-semibold"}>
//                   {prop.status.toUpperCase()}
//                 </span>
//               </p>
//               <p className="text-sm text-slate-400 mt-1">{prop.bedrooms} BHK</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {properties.length === 0 && (
//         <div className="text-center py-12 text-slate-400">
//           <p className="text-lg mb-4">No properties yet</p>
//         </div>
//       )}
//     </div>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import { useAuth } from "../../hooks/useAuth"

// // Dummy properties with working placeholder images
// const DEFAULT_PROPERTIES = [
//   {
//     _id: "1",
//     address: { street: "Modern 2BHK Apartment", city: "Koramangala", state: "Bangalore", pinCode: "560034" },
//     price: 25000,
//     bedrooms: 2,
//     status: "vacant",
//     image: "https://unsplash.it/400/250?image=1050",
//   },
//   {
//     _id: "2",
//     address: { street: "Cozy 1BHK Flat", city: "HSR Layout", state: "Bangalore", pinCode: "560102" },
//     price: 18000,
//     bedrooms: 1,
//     status: "occupied",
//     image: "https://unsplash.it/400/250?image=1060",
//   },
//   {
//     _id: "3",
//     address: { street: "Spacious Studio", city: "Indiranagar", state: "Bangalore", pinCode: "560038" },
//     price: 15000,
//     bedrooms: 0,
//     status: "vacant",
//     image: "https://unsplash.it/400/250?image=1070",
//   },
// ]

// export default function MyProperties() {
//   const { token } = useAuth()
//   const [properties, setProperties] = useState([])

//   useEffect(() => {
//     fetchMyProperties()
//   }, [token])

//   const fetchMyProperties = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/property/owner/my-properties", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       const data = await response.json()
//       setProperties(data.properties || DEFAULT_PROPERTIES)
//     } catch (error) {
//       console.error("Error fetching properties:", error)
//       setProperties(DEFAULT_PROPERTIES)
//     }
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-white mb-8">My Properties</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {properties.map((prop) => (
//           <div
//             key={prop._id}
//             className="bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105"
//           >
//             {/* Property Image */}
//             <div className="h-52 w-full bg-gray-700 overflow-hidden flex items-center justify-center">
//               <img
//                 src={prop.image}
//                 alt={prop.address.street}
//                 className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
//                 loading="lazy"
//               />
//             </div>

//             {/* Property Details */}
//             <div className="p-6">
//               <h3 className="text-2xl font-bold text-white">{prop.address.street}</h3>
//               <p className="text-slate-300 mt-1">
//                 {prop.address.city}, {prop.address.state} {prop.address.pinCode}
//               </p>
//               <p className="text-lg font-semibold text-green-400 mt-2">₹{prop.price.toLocaleString()}/month</p>
//               <p className="text-sm text-slate-400 mt-1">
//                 Status:{" "}
//                 <span className={prop.status === "vacant" ? "text-green-400 font-semibold" : "text-orange-400 font-semibold"}>
//                   {prop.status.toUpperCase()}
//                 </span>
//               </p>
//               <p className="text-sm text-slate-400 mt-1">{prop.bedrooms} BHK</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {properties.length === 0 && (
//         <div className="text-center py-12 text-slate-400">
//           <p className="text-lg mb-4">No properties yet</p>
//         </div>
//       )}
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"

// Dummy properties with realistic property images
const DEFAULT_PROPERTIES = [
  {
    _id: "1",
    address: { street: "Modern 2BHK Apartment", city: "Koramangala", state: "Bangalore", pinCode: "560034" },
    price: 25000,
    bedrooms: 2,
    status: "vacant",
    image: "https://images.unsplash.com/photo-1560185127-6a9a6b16c1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8M3x8YXBhcnRtZW50fGVufDB8fHx8MTY5NjI0MjY5Ng&ixlib=rb-4.0.3&q=80&w=400", 
  },
  {
    _id: "2",
    address: { street: "Cozy 1BHK Flat", city: "HSR Layout", state: "Bangalore", pinCode: "560102" },
    price: 18000,
    bedrooms: 1,
    status: "occupied",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    _id: "3",
    address: { street: "Spacious Studio", city: "Indiranagar", state: "Bangalore", pinCode: "560038" },
    price: 15000,
    bedrooms: 0,
    status: "vacant",
    image: "https://images.unsplash.com/photo-1598928506314-6a6f5abcc5b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
]

export default function MyProperties() {
  const { token } = useAuth()
  const [properties, setProperties] = useState([])

  useEffect(() => {
    fetchMyProperties()
  }, [token])

  const fetchMyProperties = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/property/owner/my-properties", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setProperties(data.properties || DEFAULT_PROPERTIES)
    } catch (error) {
      console.error("Error fetching properties:", error)
      setProperties(DEFAULT_PROPERTIES)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">My Properties</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((prop) => (
          <div
            key={prop._id}
            className="bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105"
          >
            {/* Property Image */}
            <div className="h-52 w-full bg-gray-700 overflow-hidden flex items-center justify-center">
              <img
                src={prop.image}
                alt={prop.address.street}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Property Details */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white">{prop.address.street}</h3>
              <p className="text-slate-300 mt-1">
                {prop.address.city}, {prop.address.state} {prop.address.pinCode}
              </p>
              <p className="text-lg font-semibold text-green-400 mt-2">₹{prop.price.toLocaleString()}/month</p>
              <p className="text-sm text-slate-400 mt-1">
                Status:{" "}
                <span className={prop.status === "vacant" ? "text-green-400 font-semibold" : "text-orange-400 font-semibold"}>
                  {prop.status.toUpperCase()}
                </span>
              </p>
              <p className="text-sm text-slate-400 mt-1">{prop.bedrooms} BHK</p>
            </div>
          </div>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <p className="text-lg mb-4">No properties yet</p>
        </div>
      )}
    </div>
  )
}
