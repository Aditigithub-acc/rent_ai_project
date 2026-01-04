export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...props
}) {
  const baseStyles = "font-semibold rounded-lg transition duration-300 inline-flex items-center justify-center"

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100",
    success: "bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400",
    ghost: "text-gray-900 hover:bg-gray-100 disabled:text-gray-400",
  }

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button disabled={disabled} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
