"use client"

import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "../ui/label"
import { useFilterStore } from "@/stores/filterStore"

interface UsernameDropdownProps {
  usernames: string[]
  onSelectionChange?: (selectedUsernames: string[]) => void
}

export default function NameFilter({ usernames, onSelectionChange }: UsernameDropdownProps) {
  const { setFilteredNameList } = useFilterStore();

  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsernames, setSelectedUsernames] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selectedUsernamesRef = useRef<string[]>([])

  useEffect(() => {
    selectedUsernamesRef.current = selectedUsernames
  }, [selectedUsernames])


  const filteredUsernames = usernames.filter((username) =>
    username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setFilteredNameList(selectedUsernamesRef.current)
        setSelectedUsernames([]); // reset checked items
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleUsernameToggle = (username: string) => {
    const newSelection = selectedUsernames.includes(username)
      ? selectedUsernames.filter((item) => item !== username)
      : [...selectedUsernames, username]

    setSelectedUsernames(newSelection)

    if (onSelectionChange) {
      onSelectionChange(newSelection)
    }
  }

  
  const handleFilterSearch = () => {
    setFilteredNameList(selectedUsernamesRef.current)
    setSelectedUsernames([]); // reset checked items
    // console.log("searching...", selectedUsernamesRef.current)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search Username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="!bg-[#020618] text-white placeholder-gray-400 pr-10 w-[200px] h-9"
        />
        <Search 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer"
            onClick={() => {
              setIsOpen(false)
              handleFilterSearch()
            }}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full !bg-[#020618] border-2 rounded-sm max-h-64 overflow-y-auto custom-scrollbar">
          {filteredUsernames.length > 0 ? (
            filteredUsernames.map((username : string) => (
              <div
                key={username}
                className="flex items-center space-x-3 px-2 hover:bg-gray-800 cursor-pointer"
                onClick={() => handleUsernameToggle(username)}
              >
                <Checkbox
                  id={username}
                  checked={selectedUsernames.includes(username)}
                  onCheckedChange={() => handleUsernameToggle(username)}
                  className="border-gray-600 data-[state=checked]:bg-blue-500 border"
                />
                <Label htmlFor={username} className="py-2 text-[#FBBD2C] text-sm cursor-pointer flex-1">
                  {username}
                </Label>
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-400 text-center">No usernames found</div>
          )}
        </div>
      )}
    </div>
  )
}