import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export default function DateTimePicker() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2022, 0, 6),
    to: new Date(2022, 0, 13),
  });
  const [open, setOpen] = useState(false);

  const predefinedRanges = [
    "Today",
    "Yesterday",
    "This week",
    "Last week",
    "This month",
    "Last month",
    "This year",
    "Last year",
    "All time",
  ];

  return (
    <div className="flex min-h-screen bg-[#1a1a1a] text-white">
      {/* Sidebar */}
      <div className="w-48 bg-[#121212] p-4 space-y-2">
        {predefinedRanges.map((label) => (
          <Button
            key={label}
            variant={label === "This week" ? "default" : "ghost"}
            className="w-full justify-start"
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Calendar Area */}
      <div className="flex flex-col items-center justify-center flex-1 p-10">
        <Card className="bg-[#1f1f1f] border border-gray-700 w-full max-w-4xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex space-x-4 bg-[#1f1f1f] border border-gray-700">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={new Date(2022, 0)}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>

              <div className="flex space-x-2">
                <Button variant="ghost" className="border border-gray-600 text-gray-300">Cancel</Button>
                <Button className="bg-yellow-500 text-black hover:bg-yellow-600">Apply</Button>
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-300">
              <div>
                {format(dateRange.from, "MMM d, yyyy")} 00:00:00
              </div>
              <div>
                {format(dateRange.to, "MMM d, yyyy")} 00:00:00
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
