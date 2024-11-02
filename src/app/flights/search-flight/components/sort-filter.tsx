"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "Best",
    label: "Best"
  },
  {
    value: "Cheapest First",
    label: "Cheapest First"
  },
  {
    value: "Fastest First",
    label: "Fastest First"
  },
  {
    value: "Outbound: Departure Time",
    label: "Outbound: Departure Time"
  },
  {
    value: "Return: Departure Time",
    label: "Return: Departure Time"
  }
];

export function SortFilter({ type }: { type: string }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="block h-16 w-full"
        >
          <p className="text-left">{type}</p>
          <div className="flex justify-between">
            {" "}
            <span className="text-slate-500">
              {" "}
              {value
                ? frameworks.find((framework) => framework.value === value)
                    ?.label
                : "Select sort by..."}
            </span>
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search sort by..." className="h-9" />
          <CommandList>
            <CommandEmpty>No filters found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
