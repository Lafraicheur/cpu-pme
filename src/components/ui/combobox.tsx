"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface ComboboxOption {
  value: string
  label: string
  sublabel?: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  className?: string
  triggerClassName?: string
  loading?: boolean
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Sélectionnez...",
  searchPlaceholder = "Rechercher...",
  emptyText = "Aucun résultat trouvé.",
  disabled = false,
  className,
  triggerClassName,
  loading = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  
  // Trier les options par ordre alphabétique
  const sortedOptions = React.useMemo(() => {
    return [...options].sort((a, b) => a.label.localeCompare(b.label, 'fr'))
  }, [options])

  const selectedOption = sortedOptions.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl bg-white text-gray-900 font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50",
            !value && "text-gray-500",
            triggerClassName
          )}
          disabled={disabled || loading}
        >
          <span className="truncate">
            {loading
              ? "Chargement..."
              : selectedOption
              ? selectedOption.label
              : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-full p-0 bg-white border border-gray-200 shadow-lg z-[9999]", className)} align="start">
        <Command className="bg-white">
          <CommandInput placeholder={searchPlaceholder} className="h-9 bg-white" />
          <CommandList className="max-h-[300px] overflow-y-auto bg-white">
            <CommandEmpty className="bg-white">{emptyText}</CommandEmpty>
            <CommandGroup className="bg-white">
              {sortedOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onValueChange(option.value)
                    setOpen(false)
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{option.label}</span>
                    {option.sublabel && (
                      <span className="text-xs text-gray-400">
                        {option.sublabel}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
