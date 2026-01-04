// "use client"

// import { useState } from "react"
// import PropertyCard from "../PropertyCard"

// export default function SearchProperty() {
//   const [properties, setProperties] = useState([])
//   const [filters, setFilters] = useState({
//     city: "",
//     minPrice: "",
//     maxPrice: "",
//     propertyType: "",
//     bedrooms: "",
//   })

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value })
//   }

//   const handleSearch = async () => {
//     try {
//       const query = new URLSearchParams()
//       Object.entries(filters).forEach(([key, value]) => {
//         if (value) query.append(key, value)
//       })

//       const response = await fetch(`http://localhost:5000/api/property?${query}`)
//       const data = await response.json()
//       setProperties(data.properties || [])
//     } catch (error) {
//       console.error("Error fetching properties:", error)
//     }
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-white mb-8">Search Properties</h1>

//       <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-md p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <input
//             type="text"
//             name="city"
//             placeholder="City or Location"
//             value={filters.city}
//             onChange={handleFilterChange}
//             className="px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
//           />

//           <input
//             type="number"
//             name="minPrice"
//             placeholder="Min Price"
//             value={filters.minPrice}
//             onChange={handleFilterChange}
//             className="px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
//           />

//           <input
//             type="number"
//             name="maxPrice"
//             placeholder="Max Price"
//             value={filters.maxPrice}
//             onChange={handleFilterChange}
//             className="px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
//           />

//           <select
//             name="propertyType"
//             value={filters.propertyType}
//             onChange={handleFilterChange}
//             className="px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select Type</option>
//             <option value="flat">Flat</option>
//             <option value="house">House</option>
//             <option value="room">Room</option>
//           </select>

//           <select
//             name="bedrooms"
//             value={filters.bedrooms}
//             onChange={handleFilterChange}
//             className="px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Bedrooms</option>
//             <option value="1">1 BHK</option>
//             <option value="2">2 BHK</option>
//             <option value="3">3 BHK</option>
//             <option value="4">4+ BHK</option>
//           </select>

//           <button
//             onClick={handleSearch}
//             className="col-span-full md:col-span-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {properties.map((property) => (
//           <PropertyCard key={property._id} property={property} />
//         ))}
//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import PropertyCard from "../PropertyCard"

export default function SearchProperty() {
  const [properties, setProperties] = useState([])
  const [filters, setFilters] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "",
    bedrooms: "",
  })

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSearch = async () => {
    try {
      const query = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) query.append(key, value)
      })

      const response = await fetch(`http://localhost:5000/api/property?${query}`)
      const data = await response.json()
      setProperties(data.properties || [])
    } catch (error) {
      console.error("Error fetching properties:", error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-slate-100 mb-4">Search Properties</h1>
      <p className="text-slate-400 mb-6">Filter and discover your ideal rental home</p>

      {/* Filters Panel */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-md p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City or Location"
            value={filters.city}
            onChange={handleFilterChange}
            className="px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleFilterChange}
            className="px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Select Type</option>
            <option value="flat">Flat</option>
            <option value="house">House</option>
            <option value="room">Room</option>
          </select>

          <select
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
            className="px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Bedrooms</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4+ BHK</option>
          </select>

          <button
            onClick={handleSearch}
            className="col-span-full md:col-span-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 font-semibold shadow-md hover:shadow-lg"
          >
            Search
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      {properties.length === 0 ? (
        <p className="text-center text-slate-400 py-12">No properties found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
