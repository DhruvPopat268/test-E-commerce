"use client"

import { forwardRef, createContext, useContext, useState } from "react"
import { cn } from "../../lib/utils"
import { ChevronDown } from "lucide-react"

const SelectContext = createContext({})

const Select = ({ children, value, onValueChange, disabled }) => {
  const [open, setOpen] = useState(false)

  return (
    <SelectContext.Provider value={{ open, setOpen, value, onValueChange, disabled }}>
      {children}
    </SelectContext.Provider>
  )
}

const SelectTrigger = forwardRef(({ className, children, ...props }, ref) => {
  const { open, setOpen, value, disabled } = useContext(SelectContext)

  return (
    <button
      ref={ref}
      onClick={() => !disabled && setOpen(!open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = forwardRef(({ className, placeholder, ...props }, ref) => {
  const { value } = useContext(SelectContext)

  return (
    <span className={cn("flex-1 text-left", className)} ref={ref} {...props}>
      {value || placeholder}
    </span>
  )
})
SelectValue.displayName = "SelectValue"

const SelectContent = forwardRef(({ className, children, ...props }, ref) => {
  const { open, setOpen } = useContext(SelectContext)

  if (!open) return null

  return (
    <div className="relative z-50">
      <div className="fixed inset-0" onClick={() => setOpen(false)} />
      <div
        ref={ref}
        className={cn(
          "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
          className,
        )}
        {...props}
      >
        <div className="p-1">{children}</div>
      </div>
    </div>
  )
})
SelectContent.displayName = "SelectContent"

const SelectItem = forwardRef(({ className, children, value, ...props }, ref) => {
  const { onValueChange, setOpen } = useContext(SelectContext)

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      onClick={() => {
        onValueChange(value)
        setOpen(false)
      }}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {/* You can add a checkmark here for the selected item */}
      </span>
      <span className="text-sm">{children}</span>
    </div>
  )
})
SelectItem.displayName = "SelectItem"

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
