"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateTimeRangePickerProps {
  onApply?: (startDate: Date, endDate: Date) => void
  className?: string
}

export default function DateTimeRangePicker({ onApply, className }: DateTimeRangePickerProps) {

    const [date, setDate] = React.useState<DateRange | undefined>(undefined)
    const [startTime, setStartTime] = React.useState(() =>
        format(new Date(), "hh:mm:ss a")
    )
    const [endTime, setEndTime] = React.useState(() =>
        format(new Date(), "hh:mm:ss a")
    )

    const [activeQuickSelect, setActiveQuickSelect] = React.useState("Today")
    const [open, setOpen] = React.useState(false)

    const quickSelectOptions = [
        "Today",
        "Yesterday",
        "This week",
        "Last week",
        "This month",
        "Last month",
        "This year",
        "Last year",
        "All time",
    ]

    const handleQuickSelect = (option: string) => {
        setActiveQuickSelect(option)
        const today = new Date()
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - today.getDay() + 1)

        switch (option) {
            case "Today":
                setDate({ from: today, to: today })
                break
            case "Yesterday":
                const yesterday = new Date(today)
                yesterday.setDate(today.getDate() - 1)
                setDate({ from: yesterday, to: yesterday })
                break
            case "This week":
                const endOfWeek = new Date(startOfWeek)
                endOfWeek.setDate(startOfWeek.getDate() + 6)
                setDate({ from: startOfWeek, to: endOfWeek })
                break
            case "Last week":
                const lastWeekStart = new Date(startOfWeek)
                lastWeekStart.setDate(startOfWeek.getDate() - 7)
                const lastWeekEnd = new Date(lastWeekStart)
                lastWeekEnd.setDate(lastWeekStart.getDate() + 6)
                setDate({ from: lastWeekStart, to: lastWeekEnd })
                break
            case "This month":
                const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
                const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
                setDate({ from: startOfMonth, to: endOfMonth })
                break
            case "Last month":
                const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1)
                const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)
                setDate({ from: lastMonthStart, to: lastMonthEnd })
                break
            case "This year":
                const startOfYear = new Date(today.getFullYear(), 0, 1)
                const endOfYear = new Date(today.getFullYear(), 11, 31)
                setDate({ from: startOfYear, to: endOfYear })
                break
            case "Last year":
                const lastYearStart = new Date(today.getFullYear() - 1, 0, 1)
                const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31)
                setDate({ from: lastYearStart, to: lastYearEnd })
                break
        }
    }

    const formatDateRange = () => {
        if (!date?.from && !date?.to) return "Date and Time Last Active"

        if (date?.from && !date?.to) {
            return format(date.from, "MMM d, yyyy")
        }
        
        if (date?.from && date?.to) {
            return `${format(date.from, "MMM d, yyyy")} - ${format(date.to, "MMM d, yyyy")}`
        }

        return "Date and Time Last Active"
    }

    const formatDate = (dateValue: Date | undefined) => {
        if (!dateValue) return ""
        return format(dateValue, "MMM d, yyyy")
    }

    const handleApply = () => {
        if (date?.from && date?.to && onApply) {
            const fromDate = new Date(date.from)
            const toDate = new Date(date.to)

            try {
                const [startHour, startMinute] = startTime.split(":").map(Number)
                const [endHour, endMinute] = endTime.split(":").map(Number)

                fromDate.setHours(startHour, startMinute, 0, 0)

                // Set to the end of the minute: 59s 999ms
                toDate.setHours(endHour, endMinute, 59, 999)

                onApply(fromDate, toDate)
            } catch (err) {
                console.error("Invalid time format", err)
            }
        }

        setOpen(false)
    }

    const handleCancel = () => {
        const resetDate = { from: undefined, to: undefined }
        const resetStartTime = "00:00:00"
        const resetEndTime = "23:59:59"

        setDate(resetDate)
        setStartTime(resetStartTime)
        setEndTime(resetEndTime)
        setActiveQuickSelect("")

        setOpen(false)
    }
    
    const handleDateSelect = (selectedDate: DateRange | undefined) => {
        setDate(selectedDate)
        setActiveQuickSelect("") // Clear active quick select when manually selecting dates
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                className={cn(
                    "w-[300px] justify-start text-left font-normal !bg-[#020618]",
                    !date?.from && !date?.to && "text-muted-foreground",
                    className,
                )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDateRange()}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="bg-background rounded-lg shadow-xl">

                    {/* Quick Select Sidebar */}    
                    <div className="flex">
                        <div className="w-35 space-y-1 p-2 py-4 border-r border-slate-500">
                            {quickSelectOptions.map((option) => (
                                <Button
                                key={option}
                                variant={activeQuickSelect === option ? "default" : "ghost"}
                                size="sm"
                                onClick={() => handleQuickSelect(option)}
                                className={cn(
                                    "w-full justify-start h-8 px-3 text-sm font-normal",
                                    activeQuickSelect === option
                                    ? "bg-[#FBBD2C] text-slate-700 hover:bg-yellow-600"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                )}
                                >
                                    {option}
                                </Button>
                            ))}
                        </div>

                        {/* Calendar Section */}
                        <div className="flex-1">
                            <div className="pt-4 border-b border-slate-500">
                                <Calendar
                                    key={`${date?.from?.toISOString()}-${date?.to?.toISOString()}`}
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={handleDateSelect}
                                    numberOfMonths={2}
                                    classNames={{
                                        day_selected:
                                        "bg-yellow-500 text-black hover:bg-yellow-600 hover:text-black focus:bg-yellow-500 focus:text-black",
                                        day_range_middle: "bg-yellow-500/20 text-foreground hover:bg-yellow-500/30",
                                        day_range_start: "bg-yellow-500 text-black hover:bg-yellow-600",
                                        day_range_end: "bg-yellow-500 text-black hover:bg-yellow-600",
                                    }}
                                />
                            </div>
                                    
                            {/* Date and Time Inputs */}
                            <div className="my-2 px-4 py-2">
                                <div className="flex items-center gap-4 ">
                                    <div className="flex items-center gap-2">
                                        <Input value={formatDate(date?.from)} readOnly className="w-32" />
                                        <Input
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            className="w-20"
                                            placeholder="00:00:00"
                                            type="time"
                                        />
                                    </div>

                                    <span className="text-muted-foreground">–</span>

                                    <div className="flex items-center gap-2">
                                        <Input value={formatDate(date?.to)} readOnly className="w-32" />
                                        <Input
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            className="w-24"
                                            placeholder="00:00:00"
                                            type="time"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 p-4">
                                <Button variant="outline" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button onClick={handleApply} className="bg-yellow-500 text-black hover:bg-yellow-600">
                                    Apply
                                </Button>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}