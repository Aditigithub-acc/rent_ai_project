// "use client"

// import { useState, useEffect } from "react"
// import { useAuth } from "../../hooks/useAuth"

// export default function Profile() {
//   const { user, token } = useAuth()

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     bio: "",
//     location: "",
//     profilePicture: "",
//   })

//   const [previewImage, setPreviewImage] = useState(null)
//   const [uploading, setUploading] = useState(false)
//   const [locating, setLocating] = useState(false)

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         email: user.email || "",
//         phone: user.phone || "",
//         bio: user.bio || "",
//         location: user.location || "",
//         profilePicture: user.profilePicture || "",
//       })
//       setPreviewImage(user.profilePicture || null)
//     }
//   }, [user])

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   /* Upload profile image */
//   const handleImageChange = (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     const reader = new FileReader()
//     reader.onloadend = () => {
//       setPreviewImage(reader.result)
//       setFormData({ ...formData, profilePicture: reader.result })
//     }
//     reader.readAsDataURL(file)
//   }

//   /* Remove profile image */
//   const handleRemoveImage = () => {
//     setPreviewImage(null)
//     setFormData({ ...formData, profilePicture: "" })
//   }

//   /* Use current location */
//   const handleUseCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported")
//       return
//     }

//     setLocating(true)

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords
//         setFormData({
//           ...formData,
//           location: `Lat ${latitude.toFixed(4)}, Lng ${longitude.toFixed(4)}`,
//         })
//         setLocating(false)
//       },
//       () => {
//         alert("Unable to fetch location")
//         setLocating(false)
//       }
//     )
//   }

//   const handleSave = async () => {
//     try {
//       setUploading(true)
//       await fetch("http://localhost:5000/api/user/profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       })
//       alert("Profile updated successfully")
//     } catch (error) {
//       alert("Failed to update profile")
//     } finally {
//       setUploading(false)
//     }
//   }

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-10">
//       <h1 className="text-4xl font-bold text-slate-100 mb-10">My Profile</h1>

//       <div className="bg-slate-800/90 backdrop-blur rounded-2xl shadow-xl p-8 space-y-8 border border-slate-700">
//         {/* Profile Picture */}
//         <div className="flex flex-col items-center gap-4 pb-6 border-b border-slate-700">
//           <div className="relative w-32 h-32 rounded-full bg-slate-700 overflow-hidden shadow-lg group">
//             {previewImage ? (
//               <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-4xl">👤</div>
//             )}

//             {previewImage && (
//               <button
//                 onClick={handleRemoveImage}
//                 className="absolute inset-0 bg-black/60 text-red-400 opacity-0 group-hover:opacity-100 transition flex items-center justify-center font-semibold"
//               >
//                 Remove
//               </button>
//             )}
//           </div>

//           <label className="cursor-pointer">
//             <span className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
//               Upload Picture
//             </span>
//             <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//           </label>

//           <p className="text-sm text-slate-400">JPG / PNG • Max 5MB</p>
//         </div>

//         {/* Inputs */}
//         <div className="grid grid-cols-2 gap-4">
//           {["firstName", "lastName"].map((field) => (
//             <input
//               key={field}
//               name={field}
//               value={formData[field]}
//               onChange={handleChange}
//               placeholder={field === "firstName" ? "First Name" : "Last Name"}
//               className="input-ui"
//             />
//           ))}
//         </div>

//         <input disabled value={formData.email} className="input-ui opacity-60 cursor-not-allowed" />

//         <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="input-ui" />

//         {/* Location */}
//         <div>
//           <label className="text-slate-300 text-sm mb-2 block">Location</label>
//           <div className="flex gap-2">
//             <input
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               placeholder="Enter location"
//               className="input-ui flex-1"
//             />
//             <button
//               onClick={handleUseCurrentLocation}
//               disabled={locating}
//               className="px-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition text-lg"
//             >
//               📍
//             </button>
//           </div>
//         </div>

//         <textarea
//           name="bio"
//           value={formData.bio}
//           onChange={handleChange}
//           rows={4}
//           placeholder="About you..."
//           className="input-ui resize-none"
//         />

//         <button
//           onClick={handleSave}
//           disabled={uploading}
//           className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl font-semibold shadow-lg"
//         >
//           {uploading ? "Saving..." : "Save Changes"}
//         </button>
//       </div>

//       {/* Tailwind helper */}
//       <style>{`
//         .input-ui {
//           width: 100%;
//           padding: 0.6rem 0.9rem;
//           background: #334155;
//           border: 1px solid #475569;
//           border-radius: 0.75rem;
//           color: white;
//           transition: all 0.25s ease;
//         }
//         .input-ui:hover {
//           border-color: #60a5fa;
//         }
//         .input-ui:focus {
//           outline: none;
//           border-color: #3b82f6;
//           box-shadow: 0 0 0 2px rgba(59,130,246,0.4);
//         }
//       `}</style>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"

export default function Profile() {
  const { user, token } = useAuth()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    profilePicture: "",
  })

  const [previewImage, setPreviewImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [fetchingLocation, setFetchingLocation] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        location: user.location || "",
        profilePicture: user.profilePicture || "",
      })
      setPreviewImage(user.profilePicture || null)
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  /* Upload / Change Photo */
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result)
      setFormData({ ...formData, profilePicture: reader.result })
    }
    reader.readAsDataURL(file)
  }

  /* Remove Photo */
  const handleRemoveImage = () => {
    setPreviewImage(null)
    setFormData({ ...formData, profilePicture: "" })
  }

  /* Use Current Location */
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported")
      return
    }

    setFetchingLocation(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        setFormData({
          ...formData,
          location: `Lat ${latitude.toFixed(4)}, Lng ${longitude.toFixed(4)}`,
        })
        setFetchingLocation(false)
      },
      () => {
        alert("Unable to fetch location")
        setFetchingLocation(false)
      }
    )
  }

  const handleSave = async () => {
    try {
      setUploading(true)
      await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      alert("Profile updated successfully")
    } catch (error) {
      console.error(error)
      alert("Failed to update profile")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-slate-100 mb-8">My Profile</h1>

      <div className="bg-slate-800 rounded-xl shadow-xl p-8 space-y-6 border border-slate-700">
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-5 pb-6 border-b border-slate-700">
          <div className="w-32 h-32 rounded-full bg-slate-700 overflow-hidden shadow-lg">
            {previewImage ? (
              <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">👤</div>
            )}
          </div>

          <div className="flex gap-3">
            <label className="cursor-pointer">
              <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Change Photo
              </span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>

            {previewImage && (
              <button
                onClick={handleRemoveImage}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Remove Photo
              </button>
            )}
          </div>

          <p className="text-sm text-slate-400">JPG / PNG • Max 5MB</p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>

        <Input label="Email" value={formData.email} disabled />
        <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />

        <div>
          <label className="block text-sm text-slate-300 mb-2">Bio</label>
          <textarea
            name="bio"
            rows="4"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:ring-2 focus:ring-blue-500 transition resize-none"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm text-slate-300 mb-2">Location</label>
          <div className="relative">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-12 rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              onClick={handleUseCurrentLocation}
              type="button"
              className="absolute right-3 top-2.5 text-blue-400 hover:text-blue-600 transition"
              title="Use current location"
            >
              <MapPin />
            </button>
          </div>
          {fetchingLocation && <p className="text-sm text-slate-400 mt-1">Fetching location...</p>}
        </div>

        <button
          onClick={handleSave}
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg disabled:opacity-50"
        >
          {uploading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  )
}

/* Reusable Input */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm text-slate-300 mb-2">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-2 rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:ring-2 focus:ring-blue-500 transition hover:border-blue-500"
      />
    </div>
  )
}
