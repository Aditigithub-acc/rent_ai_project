export default function Card({ children, className = "", hover = true, ...props }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md ${hover ? "hover:shadow-lg transition-shadow" : ""} p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
