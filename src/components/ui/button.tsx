import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  color?: 'default' | 'ghost' | 'outline'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", color = "default", children, ...props }, ref) => {
    const colorStyles = {
      default: "bg-primary-blue text-white hover:bg-blue-700",
      ghost: "hover:bg-gray-100",
      outline: "border border-primary-blue text-primary-blue hover:bg-blue-50"
    }

    return (
      <button
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${colorStyles[color]} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
