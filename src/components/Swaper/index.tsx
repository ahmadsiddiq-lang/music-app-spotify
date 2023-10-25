import { tw } from "@/utility/function/styles"
import React from "react"

const Swaper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={tw('flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-5', className)}>{children}</div>
  )
}

export default Swaper