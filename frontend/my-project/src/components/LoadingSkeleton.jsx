export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-full max-w-2xl">
        <div className="h-12 bg-gray-300 rounded-lg"></div>
        <div className="h-64 bg-gray-300 rounded-lg"></div>
        <div className="h-12 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  )
}
