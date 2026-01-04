
"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"

const DEFAULT_REQUESTS = [
  {
    _id: "1",
    tenant: { firstName: "Priya", lastName: "Patel", phone: "+91 98765 43210", profession: "Software Engineer", email: "priya.patel@google.com", initials: "PP" },
    property: { address: "Modern 2BHK Apartment", location: "Koramangala, Bangalore" },
    moveInDate: "1st Feb 2024",
    message: "Hi, I'm interested in your property. I work as a software engineer at Google.",
    status: "pending",
    timeAgo: "2 hours ago",
    salary: "₹18,00,000",
    experience: "5+ years",
  },
  {
    _id: "2",
    tenant: { firstName: "Amit", lastName: "Kumar", phone: "+91 87654 32109", profession: "Data Analyst", email: "amit.kumar@flipkart.com", initials: "AK" },
    property: { address: "Cozy 1BHK Flat", location: "HSR Layout, Bangalore" },
    moveInDate: "15th Feb 2024",
    message: "Looking for a peaceful place. I'm a working professional and follow all house rules.",
    status: "pending",
    timeAgo: "5 hours ago",
    salary: "₹12,50,000",
    experience: "3+ years",
  },
  {
    _id: "3",
    tenant: { firstName: "Sneha", lastName: "Reddy", phone: "+91 76543 21098", profession: "MBA Student", email: "sneha.reddy@iimb.org", initials: "SR" },
    property: { address: "Spacious Studio", location: "Indiranagar, Bangalore" },
    moveInDate: "10th Feb 2024",
    message: "Perfect place for my studies. I'm a responsible tenant looking for a long-term stay.",
    status: "pending",
    timeAgo: "1 day ago",
    salary: "₹5,50,000",
    experience: "Student",
  },
  {
    _id: "4",
    tenant: { firstName: "Rahul", lastName: "Singh", phone: "+91 65432 10987", profession: "Product Manager", email: "rahul.singh@amazon.in", initials: "RS" },
    property: { address: "Modern 2BHK Apartment", location: "Koramangala, Bangalore" },
    moveInDate: "20th Feb 2024",
    message: "Excellent property! Looking for a well-maintained apartment for my family. Very interested.",
    status: "pending",
    timeAgo: "3 hours ago",
    salary: "₹22,00,000",
    experience: "7+ years",
  },
  {
    _id: "5",
    tenant: { firstName: "Divya", lastName: "Sharma", phone: "+91 54321 09876", profession: "UX Designer", email: "divya.sharma@microsoft.com", initials: "DS" },
    property: { address: "Cozy 1BHK Flat", location: "HSR Layout, Bangalore" },
    moveInDate: "5th Mar 2024",
    message: "Great location and amenities. I need a quiet workspace for remote work. Interested!",
    status: "pending",
    timeAgo: "6 hours ago",
    salary: "₹15,75,000",
    experience: "4+ years",
  },
  {
    _id: "6",
    tenant: { firstName: "Nikhil", lastName: "Pande", phone: "+91 43210 98765", profession: "DevOps Engineer", email: "nikhil.pande@accenture.com", initials: "NP" },
    property: { address: "Spacious Studio", location: "Indiranagar, Bangalore" },
    moveInDate: "12th Mar 2024",
    message: "Looking for a furnished apartment with reliable internet. This seems perfect for me.",
    status: "pending",
    timeAgo: "8 hours ago",
    salary: "₹14,00,000",
    experience: "6+ years",
  },
  {
    _id: "7",
    tenant: { firstName: "Kavya", lastName: "Desai", phone: "+91 32109 87654", profession: "Graphic Designer", email: "kavya.desai@adobe.com", initials: "KD" },
    property: { address: "Modern 2BHK Apartment", location: "Koramangala, Bangalore" },
    moveInDate: "25th Feb 2024",
    message: "I'm a creative professional seeking a vibrant neighborhood. Your property ticks all the boxes!",
    status: "accepted",
    timeAgo: "12 hours ago",
    salary: "₹13,50,000",
    experience: "5+ years",
  },
  {
    _id: "8",
    tenant: { firstName: "Vikram", lastName: "Nair", phone: "+91 21098 76543", profession: "Mechanical Engineer", email: "vikram.nair@toyota.com", initials: "VN" },
    property: { address: "Cozy 1BHK Flat", location: "HSR Layout, Bangalore" },
    moveInDate: "28th Feb 2024",
    message: "Relocating to Bangalore for work. Your flat is exactly what I'm looking for. Very keen!",
    status: "pending",
    timeAgo: "4 hours ago",
    salary: "₹16,25,000",
    experience: "8+ years",
  },
  {
    _id: "9",
    tenant: { firstName: "Anjali", lastName: "Gupta", phone: "+91 10987 65432", profession: "Business Analyst", email: "anjali.gupta@infosys.com", initials: "AG" },
    property: { address: "Spacious Studio", location: "Indiranagar, Bangalore" },
    moveInDate: "3rd Mar 2024",
    message: "Senior professional looking for a furnished studio with modern amenities. Interested!",
    status: "rejected",
    timeAgo: "2 days ago",
    salary: "₹17,00,000",
    experience: "9+ years",
  },
]

export default function TenantRequests() {
  const { token } = useAuth()
  const [requests, setRequests] = useState(DEFAULT_REQUESTS)
  const [activeTab, setActiveTab] = useState("all")
  const [actionLoading, setActionLoading] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:5000/api/request/owner/requests", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.ok) throw new Error("Failed to fetch requests")
        const data = await response.json()
        setRequests(data.requests && data.requests.length ? data.requests : DEFAULT_REQUESTS)
      } catch (error) {
        console.error("Error fetching requests:", error)
        setRequests(DEFAULT_REQUESTS)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [token])

  const handleResponse = async (requestId, status) => {
    setActionLoading({ ...actionLoading, [requestId]: true })
    try {
      await fetch(`http://localhost:5000/api/request/${requestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      })
      setRequests(requests.map(r => (r._id === requestId ? { ...r, status } : r)))
    } catch (error) {
      console.error("Error responding to request:", error)
    } finally {
      setActionLoading({ ...actionLoading, [requestId]: false })
    }
  }

  const handleChat = tenantName => alert(`Opening chat with ${tenantName}...`)
  const handleCall = tenantPhone => alert(`Initiating call to ${tenantPhone}...`)

  const filteredRequests = activeTab === "all" ? requests : requests.filter(r => r.status === activeTab)
  const pendingCount = requests.filter(r => r.status === "pending").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Tenant Requests</h1>
            <p className="text-slate-400">Manage and respond to tenant applications</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-blue-400">{pendingCount}</div>
            <div className="text-slate-400 text-sm">Pending</div>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          {["all", "pending", "accepted", "rejected"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-white text-center py-10">Loading requests...</p>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-slate-400 text-lg">No {activeTab !== "all" ? activeTab : ""} requests</p>
            <p className="text-slate-500 text-sm mt-2">Start listing properties to receive tenant applications</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRequests.map(request => (
              <div
                key={request._id}
                className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-slate-700 rounded-2xl p-8 hover:border-slate-600 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-6 flex-1">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
                      {request.tenant.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {request.tenant.firstName} {request.tenant.lastName}
                          </h3>
                          <p className="text-slate-400 text-sm font-medium">{request.tenant.profession}</p>
                        </div>
                        <span className="text-slate-400 text-sm whitespace-nowrap">{request.timeAgo}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-slate-300">
                          <span className="text-lg">📧</span>
                          <span className="text-sm">{request.tenant.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <span className="text-lg">📞</span>
                          <span className="text-sm">{request.tenant.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <span className="text-lg">💼</span>
                          <span className="text-sm">{request.tenant.experience}</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-400">
                          <span className="text-lg">💰</span>
                          <span className="text-sm font-semibold">{request.salary}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4 py-4 border-t border-b border-slate-700">
                        <div className="flex items-center gap-3">
                          <span className="text-blue-400 text-xl">🏠</span>
                          <div>
                            <p className="text-white font-semibold">{request.property.address}</p>
                            <p className="text-slate-400 text-sm">{request.property.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-green-400 text-xl">📅</span>
                          <p className="text-slate-300 text-sm">
                            Move-in: <span className="text-white font-semibold">{request.moveInDate}</span>
                          </p>
                        </div>
                      </div>

                      <p className="text-slate-300 italic mb-6 p-3 bg-slate-900/50 border-l-4 border-blue-500 rounded">
                        "{request.message}"
                      </p>

                      <div className="flex items-center gap-3 flex-wrap">
                        {request.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleResponse(request._id, "accepted")}
                              disabled={actionLoading[request._id]}
                              className="px-7 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg disabled:opacity-50"
                            >
                              <span>✓</span> Accept
                            </button>
                            <button
                              onClick={() => handleResponse(request._id, "rejected")}
                              disabled={actionLoading[request._id]}
                              className="px-7 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg disabled:opacity-50"
                            >
                              <span>✕</span> Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleChat(`${request.tenant.firstName} ${request.tenant.lastName}`)}
                          className="px-7 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                          <span>💬</span> Chat
                        </button>
                        <button
                          onClick={() => handleCall(request.tenant.phone)}
                          className="px-7 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                          <span>☎️</span> Call
                        </button>
                      </div>

                      {request.status !== "pending" && (
                        <div className="mt-4">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2 ${
                              request.status === "accepted"
                                ? "bg-green-900/30 border border-green-700/50 text-green-300"
                                : "bg-red-900/30 border border-red-700/50 text-red-300"
                            }`}
                          >
                            {request.status === "accepted" ? "✓ Accepted" : "✕ Rejected"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
