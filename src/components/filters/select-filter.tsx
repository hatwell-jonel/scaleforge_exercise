"use client"

import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "../ui/label"
import { useFilterStore } from "@/stores/filterStore"

type AllowedFilterKey =
  | "filterNameList"
  | "filterEmailList"
  | "filterMobileNumberList"
  | "filterDomainList";

interface DropdownProps {
    list: string[]
    filterKey: AllowedFilterKey;
    placeholder?: string;
    onSelectionChange?: (selectedUsernames: string[]) => void
}

export default function SelectFilter({
  list,
  filterKey,
  placeholder = "Search",
  onSelectionChange
}: DropdownProps) {
  const { setFilters } = useFilterStore();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedRef = useRef<string[]>([]);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  const filteredData = list.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFilters({ [filterKey]: selectedRef.current });
        setSelected([]);

        console.log("selected", selectedRef.current);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setFilters, filterKey]);

  const handleToggle = (value: string) => {
    const newSelection = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    setSelected(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleFilterSearch = () => {
    setFilters({ [filterKey]: selectedRef.current });
    setSelected([]);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="!bg-[#020618] text-white placeholder-gray-400 pr-10 w-[200px] h-9"
        />
        <Search
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer"
          onClick={() => {
            setIsOpen(false);
            handleFilterSearch();
          }}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full !bg-[#020618] border-2 rounded-sm max-h-64 overflow-y-auto custom-scrollbar">
          {filteredData.length > 0 ? (
            filteredData.map((data: string) => (
              <div
                key={data}
                className="flex items-center space-x-3 px-2 hover:bg-gray-800 cursor-pointer"
                onClick={() => handleToggle(data)}
              >
                <Checkbox
                  id={data}
                  checked={selected.includes(data)}
                  onCheckedChange={() => handleToggle(data)}
                  className="border-gray-600 data-[state=checked]:bg-blue-500 border"
                />
                <Label htmlFor={data} className="py-2 text-[#FBBD2C] text-sm cursor-pointer flex-1">
                  {data}
                </Label>
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-400 text-center">No data found</div>
          )}
        </div>
      )}
    </div>
  );
}

