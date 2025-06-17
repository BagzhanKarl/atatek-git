import * as React from "react"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { cn } from "@/lib/utils"

interface PhoneInputProps extends React.ComponentProps<typeof PhoneInput> {
  className?: string
  error?: boolean
}

export function PhoneInputField({ className, error, ...props }: PhoneInputProps) {
  return (
    <PhoneInput
      country="kz"
      preferredCountries={["kz"]}
      enableSearch
      searchPlaceholder="Елді іздеу..."
      inputClass={cn(
        "w-full h-9 rounded-md border !w-full !bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        error && "border-destructive",
        className
      )}
      buttonClass="border-input bg-transparent"
      dropdownClass="!bg-background !border-input"
      searchClass="!bg-background !border-input !w-full"
      {...props}

    />
  )
} 