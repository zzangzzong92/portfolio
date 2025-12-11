'use client'
import Image from "next/image"
import { Mail, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="container mx-auto px-4 pt-8 pb-4">
      <nav className="flex items-center justify-between bg-white border-4 border-black rounded-xl px-5 py-3 max-w-2xl mx-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
          <Image
            src="/zzang.png"
            alt="Avatar"
            width={24}
            height={24}
            className="w-6 h-6 rounded-full object-cover"
            priority
          />
        </div>

        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          <a href="#home" className="text-[18px] font-bold leading-[20px] hover:opacity-70 transition-opacity">
            Home
          </a>
          <a href="#about" className="text-[18px] font-bold leading-[20px] hover:opacity-70 transition-opacity">
            About
          </a>
          <a href="#portfolio" className="text-[18px] font-bold leading-[20px] hover:opacity-70 transition-opacity">
            Portfolio
          </a>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-[18px] font-bold leading-[20px] hover:opacity-70 transition-opacity">
                Pages
                <ChevronDown className={cn("w-4 h-4 transition-transform", open ? "rotate-180" : "rotate-0")} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              sideOffset={8}
              className="bg-white border-4 border-black rounded-xl p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] min-w-[12rem]"
            >
              <DropdownMenuItem asChild className="rounded-md">
                <a href="#blog" className="block w-full px-3 py-2 text-[16px] font-bold leading-[20px] rounded-md hover:bg-black hover:text-white">
                  Blog
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-md">
                <a href="#contact" className="block w-full px-3 py-2 text-[16px] font-bold leading-[20px] rounded-md hover:bg-black hover:text-white">
                  Personal Map
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <a href="#cart" className="text-[18px] font-bold leading-[20px] hover:opacity-70 transition-opacity">
            Cart(0)
          </a> */}
        </div>

        <Button className="bg-black text-white hover:bg-black/90 rounded-sm px-5 h-12 min-w-[48px] flex-shrink-0">
          <Mail className="w-10 h-10" strokeWidth={2.5} />
        </Button>
      </nav>
    </div>
  )
}
