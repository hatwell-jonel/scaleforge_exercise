"use client"

import * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateFilterProps {
  value?: { from?: Date; to?: Date }
  onChange: (range: { from: Date; to: Date } | null) => void
}

export function DateFilter({ value, onChange }: DateFilterProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value?.from)

  React.useEffect(() => {
    setSelectedDate(value?.from)
  }, [value])

  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      setSelectedDate(undefined)
      onChange(null)
      return
    }

    const start = new Date(date.setHours(0, 0, 0, 0))
    const end = new Date(date.setHours(23, 59, 59, 999))

    setSelectedDate(start)
    onChange({ from: start, to: end })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[170px] justify-between text-left font-normal !bg-[#020618] text-slate-500 cursor-pointer",
            !selectedDate && "text-muted-foreground"
          )}
        >
          {selectedDate ? format(selectedDate, "yyyy MMM dd") : <span>Date Registered</span>}
          <ChevronDownIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
