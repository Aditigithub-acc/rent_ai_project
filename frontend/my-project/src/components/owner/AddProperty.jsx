// "use client"

// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { useAuth } from "../../hooks/useAuth"

// export default function AddProperty() {
//   const { token } = useAuth()
//   const navigate = useNavigate()
//   const [step, setStep] = useState(1)
//   const [formData, setFormData] = useState({
//     address: { street: "", city: "", state: "", pinCode: "" },
//     price: "",
//     propertyType: "flat",
//     bedrooms: 1,
//     bathrooms: 1,
//     description: "",
//     images: [],
//     rules: { petsAllowed: false, gendersAllowed: [], smokingAllowed: false, drinkingAllowed: false },
//     facilities: { parking: false, water: false, electricity: false, inverter: false },
//   })

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       address: { ...formData.address, [name]: value },
//     })
//   }

//   const handleRulesChange = (field) => {
//     setFormData({
//       ...formData,
//       rules: { ...formData.rules, [field]: !formData.rules[field] },
//     })
//   }

//   const handleFacilitiesChange = (field) => {
//     setFormData({
//       ...formData,
//       facilities: { ...formData.facilities, [field]: !formData.facilities[field] },
//     })
//   }

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/property", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       })

//       if (response.ok) {
//         navigate("/owner/my-properties")
//       }
//     } catch (error) {
//       console.error("Error creating property:", error)
//     }
//   }

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-white mb-8">Add New Property</h1>

//       <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-md p-8">
//         <div className="mb-8 flex justify-between">
//           {[1, 2, 3, 4].map((s) => (
//             <div key={s} className={`flex-1 h-2 mx-1 rounded ${s <= step ? "bg-green-600" : "bg-slate-600"}`}></div>
//           ))}
//         </div>

//         {step === 1 && (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold text-white mb-6">Step 1: Owner Details</h2>
//             <input
//               type="text"
//               name="street"
//               placeholder="Street Address"
//               value={formData.address.street}
//               onChange={handleAddressChange}
//               className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 placeholder-slate-400"
//             />
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={formData.address.city}
//               onChange={handleAddressChange}
//               className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 placeholder-slate-400"
//             />
//             <input
//               type="text"
//               name="state"
//               placeholder="State"
//               value={formData.address.state}
//               onChange={handleAddressChange}
//               className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 placeholder-slate-400"
//             />
//             <input
//               type="tel"
//               placeholder="Phone"
//               className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 placeholder-slate-400"
//             />
//           </div>
//         )}

//         {step === 2 && (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold text-white mb-6">Step 2: ID Proof Upload</h2>
//             <input type="file" className="w-full bg-slate-700 text-slate-300 rounded-lg p-2" />
//             <p className="text-sm text-slate-400">Upload Aadhar or PAN for verification</p>
//           </div>
//         )}

//         {step === 3 && (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold text-white mb-6">Step 3: Property Details</h2>
//             <input
//               type="number"
//               name="price"
//               placeholder="Monthly Price"
//               value={formData.price}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 placeholder-slate-400"
//             />

//             <select
//               name="propertyType"
//               value={formData.propertyType}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500"
//             >
//               <option value="flat">Flat</option>
//               <option value="house">House</option>
//               <option value="room">Room</option>
//             </select>

//             <input
//               type="number"
//               name="bedrooms"
//               placeholder="Bedrooms"
//               value={formData.bedrooms}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 placeholder-slate-400"
//             />

//             <textarea
//               name="description"
//               placeholder="Description"
//               value={formData.description}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 resize-none placeholder-slate-400"
//               rows="4"
//             ></textarea>

//             <div className="space-y-2">
//               <h3 className="font-semibold text-white">Rules</h3>
//               <label className="flex items-center gap-2 text-slate-300">
//                 <input
//                   type="checkbox"
//                   checked={formData.rules.petsAllowed}
//                   onChange={() => handleRulesChange("petsAllowed")}
//                 />
//                 <span>Pets Allowed</span>
//               </label>
//               <label className="flex items-center gap-2 text-slate-300">
//                 <input
//                   type="checkbox"
//                   checked={formData.rules.smokingAllowed}
//                   onChange={() => handleRulesChange("smokingAllowed")}
//                 />
//                 <span>Smoking Allowed</span>
//               </label>
//             </div>

//             <div className="space-y-2">
//               <h3 className="font-semibold text-white">Facilities</h3>
//               <label className="flex items-center gap-2 text-slate-300">
//                 <input
//                   type="checkbox"
//                   checked={formData.facilities.parking}
//                   onChange={() => handleFacilitiesChange("parking")}
//                 />
//                 <span>Parking</span>
//               </label>
//               <label className="flex items-center gap-2 text-slate-300">
//                 <input
//                   type="checkbox"
//                   checked={formData.facilities.water}
//                   onChange={() => handleFacilitiesChange("water")}
//                 />
//                 <span>Water Supply</span>
//               </label>
//             </div>
//           </div>
//         )}

//         {step === 4 && (
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold text-white mb-6">Step 4: Upload Images</h2>
//             <input type="file" multiple className="w-full bg-slate-700 text-slate-300 rounded-lg p-2" />
//             <p className="text-sm text-slate-400">Upload up to 5 property images</p>
//           </div>
//         )}

//         <div className="flex justify-between mt-8">
//           <button
//             onClick={() => setStep(Math.max(1, step - 1))}
//             disabled={step === 1}
//             className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition disabled:opacity-50 font-semibold"
//           >
//             Previous
//           </button>

//           {step < 4 ? (
//             <button
//               onClick={() => setStep(step + 1)}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
//             >
//               Next
//             </button>
//           ) : (
//             <button
//               onClick={handleSubmit}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
//             >
//               Submit Property
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function AddProperty() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    address: { street: "", city: "", state: "", pinCode: "" },
    price: "",
    propertyType: "flat",
    bedrooms: 1,
    bathrooms: 1,
    description: "",
    images: [],
    rules: { petsAllowed: false, gendersAllowed: [], smokingAllowed: false, drinkingAllowed: false },
    facilities: { parking: false, water: false, electricity: false, inverter: false },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      address: { ...formData.address, [name]: value },
    })
  }

  const handleRulesChange = (field) => {
    setFormData({
      ...formData,
      rules: { ...formData.rules, [field]: !formData.rules[field] },
    })
  }

  const handleFacilitiesChange = (field) => {
    setFormData({
      ...formData,
      facilities: { ...formData.facilities, [field]: !formData.facilities[field] },
    })
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        navigate("/owner/my-properties")
      }
    } catch (error) {
      console.error("Error creating property:", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Add New Property</h1>

      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-md p-8">
        <div className="mb-8 flex justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`flex-1 h-2 mx-1 rounded ${s <= step ? "bg-green-600" : "bg-slate-600"}`}></div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Step 1: Owner Details</h2>
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={formData.address.street}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 placeholder-slate-400"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 placeholder-slate-400"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 placeholder-slate-400"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 placeholder-slate-400"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Step 2: ID Proof Upload</h2>
            <input type="file" className="w-full bg-slate-700 text-slate-300 rounded-lg p-2" />
            <p className="text-sm text-slate-400">Upload Aadhar or PAN for verification</p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Step 3: Property Details</h2>
            <input
              type="number"
              name="price"
              placeholder="Monthly Price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 placeholder-slate-400"
            />

            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="flat">Flat</option>
              <option value="house">House</option>
              <option value="room">Room</option>
            </select>

            <input
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 placeholder-slate-400"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 resize-none placeholder-slate-400"
              rows="4"
            ></textarea>

            <div className="space-y-2">
              <h3 className="font-semibold text-white">Rules</h3>
              <label className="flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.rules.petsAllowed}
                  onChange={() => handleRulesChange("petsAllowed")}
                />
                <span>Pets Allowed</span>
              </label>
              <label className="flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.rules.smokingAllowed}
                  onChange={() => handleRulesChange("smokingAllowed")}
                />
                <span>Smoking Allowed</span>
              </label>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-white">Facilities</h3>
              <label className="flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.facilities.parking}
                  onChange={() => handleFacilitiesChange("parking")}
                />
                <span>Parking</span>
              </label>
              <label className="flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.facilities.water}
                  onChange={() => handleFacilitiesChange("water")}
                />
                <span>Water Supply</span>
              </label>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Step 4: Upload Images</h2>
            <input type="file" multiple className="w-full bg-slate-700 text-slate-300 rounded-lg p-2" />
            <p className="text-sm text-slate-400">Upload up to 5 property images</p>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition disabled:opacity-50 font-semibold"
          >
            Previous
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Submit Property
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
