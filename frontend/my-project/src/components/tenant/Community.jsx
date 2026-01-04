"use client"
import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"

// Default posts
const DEFAULT_POSTS = [
  {
    _id: "1",
    authorName: "Priya Sharma",
    content:
      "Just moved to this amazing apartment! The neighborhood is peaceful and rent-friendly. Highly recommended! 🏡",
    likeCount: 24,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    replies: 3,
  },
  {
    _id: "2",
    authorName: "Rajesh Kumar",
    content:
      "Anyone looking for roommates in Mumbai? I have a 2BHK with one room available. Located near metro station.",
    likeCount: 18,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    replies: 7,
  },
  {
    _id: "3",
    authorName: "Sneha Patel",
    content:
      "Tips for finding the perfect rental: Always check the area during evening, visit multiple times, and verify documents!",
    likeCount: 45,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    replies: 12,
  },
  {
    _id: "4",
    authorName: "Arjun Singh",
    content: "Our apartment building just started a community garden initiative. Great way to meet neighbors! 🌱",
    likeCount: 32,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    replies: 5,
  },
]

export default function Community() {
  const { token } = useAuth()
  const [posts, setPosts] = useState(DEFAULT_POSTS)
  const [newPost, setNewPost] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/community")
      const data = await response.json()
      if (data.posts && data.posts.length > 0) {
        setPosts(data.posts)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async () => {
    if (!newPost.trim()) return
    try {
      const response = await fetch("http://localhost:5000/api/community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newPost, location: "" }),
      })
      if (response.ok) {
        setNewPost("")
        fetchPosts()
      }
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  const handleLikePost = async (postId) => {
    try {
      await fetch(`http://localhost:5000/api/community/${postId}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchPosts()
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-8 text-slate-400">Loading...</div>
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-slate-100 mb-2 animate-fadeIn">Community</h1>
      <p className="text-slate-400 mb-8 animate-fadeIn delay-100">Connect with neighbors, share experiences, and get helpful tips</p>

      {/* Create Post */}
      <div className="bg-slate-800 rounded-lg shadow-md p-6 mb-8 border border-slate-700 hover:shadow-lg transition-all duration-300">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share something with the community..."
          className="w-full px-4 py-3 border border-slate-600 rounded-lg bg-slate-700 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition duration-300 hover:ring-blue-400"
          rows="4"
        ></textarea>
        <button
          onClick={handleCreatePost}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold hover:shadow-lg transform hover:-translate-y-1"
        >
          Post
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 border border-slate-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-white flex items-center justify-center font-semibold text-lg animate-pulse">
                {post.authorName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-slate-100">{post.authorName}</p>
                <p className="text-sm text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <p className="text-slate-300 mb-4 leading-relaxed animate-fadeIn">{post.content}</p>

            <div className="flex gap-6 text-sm">
              <button
                onClick={() => handleLikePost(post._id)}
                className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition font-semibold hover:scale-105 transform"
              >
                👍 {post.likeCount}
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition font-semibold hover:scale-105 transform">
                💬 {post.replies || 0}
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition font-semibold hover:scale-105 transform">
                🔗 Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-slate-400 animate-fadeIn">
          No posts yet. Be the first to share something!
        </div>
      )}
    </div>
  )
}
