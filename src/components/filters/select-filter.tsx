"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
interface MultiSelectFilterProps {
  label: string
  list: string[]
  selectedValues: string[] // controlled selected values
  onChange: (selected: string[]) => void
  className?: string
}

export default function SelectFilter({ label, list, selectedValues, onChange, className }: MultiSelectFilterProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const filteredList = list.filter((item) =>
    item.toLowerCase().includes(searchValue.toLowerCase())
  )

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value))
    } else {
      onChange([...selectedValues, value])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[140px] justify-between !bg-[#020618] text-slate-500 cursor-pointer", className)}
        >
          {label}
          <ChevronDown className="ml-2 size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0 !bg-[#020618]">
        <div className="p-2">
          <div className="relative">
            <Input
              placeholder={`Search ${label}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="!bg-[#020618] border-gray-300 text-gray-300 placeholder:text-gray-500"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
        <div className="max-h-60 overflow-auto custom-scrollbar">
          {filteredList.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className={cn("flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-gray-800")}
              onClick={() => toggleValue(item)}
            >
              <Checkbox
                checked={selectedValues.includes(item)}
                onCheckedChange={() => toggleValue(item)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <span className="text-sm text-yellow-400">{item}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
