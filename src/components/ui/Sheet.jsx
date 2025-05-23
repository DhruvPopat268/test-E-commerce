"use client"

import { forwardRef, createContext, useContext } from "react"
import { cn } from "../../lib/utils"

const SheetContext = createContext({})

const Sheet = ({ children, open, onOpenChange }) => {
  return <SheetContext.Provider value={{ open, onOpenChange }}>{children}</SheetContext.Provider>
}

const SheetTrigger = forwardRef(({ className, children, asChild = false, ...props }, ref) => {
  const { onOpenChange } = useContext(SheetContext)
  const Comp = asChild ? "span" : "button"

  return (
    <Comp ref={ref} className={className} onClick={() => onOpenChange(true)} {...props}>
      {children}
    </Comp>
  )
})
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = forwardRef(({ className, children, side = "right", ...props }, ref) => {
  const { open, onOpenChange } = useContext(SheetContext)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div
        ref={ref}
        className={cn(
          "fixed z-50 flex h-full flex-col bg-background p-6 shadow-lg transition ease-in-out",
          side === "left" && "left-0 border-r",
          side === "right" && "right-0 border-l",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
})
SheetContent.displayName = "SheetContent"

export { Sheet, SheetTrigger, SheetContent }
