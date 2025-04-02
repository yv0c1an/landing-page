import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  color?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", color = "default", children, ...props }, ref) => {
    const colorStyles =  {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "text-white hover:bg-accent hover:text-accent-foreground", // 修改这里，默认文字颜色为白色
      link: "underline-offset-4 hover:underline text-primary",
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
