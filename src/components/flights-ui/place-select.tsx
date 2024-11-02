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
import { Globe } from "lucide-react";
import { places } from "@/lib/places-list";

export function PlaceSelect({
  type,
  value,
  setValue,
  options,
  loading
}: {
  type: string;
  value: any;
  setValue: any;
  options: any;
  loading: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const frameworks =
    type === "From"
      ? (options || []).map((item) => ({
          label: item?.name,
          value: item?.code
        }))
      : [
          { label: "Everywhere", value: "Everywhere" },
          ...(options || []).map((item) => ({
            label: item?.arrivalAirport?.name,
            value: item?.arrivalAirport?.code
          }))
        ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={loading}
          aria-expanded={open}
          className="block h-16 w-full"
        >
          <>
            {loading ? (
              <p className="text-secondary-foreground">
                loading...
              </p>
            ) : (
              <>
                {" "}
                <p className="text-left">{type}</p>
                <div className="flex justify-between">
                  {" "}
                  <span className="text-slate-500">
                    {" "}
                    {value ? (
                      <span className="text-black">
                        {
                          frameworks.find(
                            (framework) => framework.value === value
                          )?.label
                        }
                      </span>
                    ) : (
                      "Select City..."
                    )}
                  </span>
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </div>
              </>
            )}
          </>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search City..." className="h-9" />
          <CommandList>
            <CommandEmpty>No City found.</CommandEmpty>
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
                  {framework.label === "Everywhere" ? (
                    type === "From" ? (
                      <></>
                    ) : (
                      <span>
                        <Globe className="inline" />
                        &nbsp;Everywhere
                      </span>
                    )
                  ) : (
                    framework.label + `(${framework.value})`
                  )}
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
