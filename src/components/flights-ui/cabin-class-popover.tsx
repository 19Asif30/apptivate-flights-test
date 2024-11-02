import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export function CabinClassPopover({ options }: { options: any }) {
  const { flightClass, setFlightClass, passengersCount, setPassengersCount } =
    options;

  const travellers = React.useMemo(
    () =>
      Object.values(passengersCount).reduce(
        (acc: number, cum: number) => acc + cum,
        0
      ),
    [passengersCount]
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="block h-full w-full">
          <p className="text-left">Travellers and Cabin class</p>
          <p className="text-left text-slate-500">
            {travellers} Travellers, {flightClass}
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <Select onValueChange={setFlightClass} value={flightClass}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Economy">Economy</SelectItem>
                <SelectItem value="Premium Economy">Premium Economy</SelectItem>
                <SelectItem value="Business Class">Business Class</SelectItem>
                <SelectItem value="First class">First class</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex justify-between">
            <div>
              <p>Adults</p>
              <p className="text-slate-500">Aged 16+</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Button
                variant={"outline"}
                className="rounded-2xl text-xl"
                disabled={!passengersCount?.adults}
                onClick={() =>
                  setPassengersCount((prev) => ({
                    ...prev,
                    adults: prev.adults - 1
                  }))
                }
              >
                -
              </Button>
              <h4>{passengersCount.adults}</h4>
              <Button
                variant={"outline"}
                className="rounded-2xl text-xl"
                onClick={() =>
                  setPassengersCount((prev) => ({
                    ...prev,
                    adults: prev.adults + 1
                  }))
                }
              >
                +
              </Button>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p>Children</p>
              <p className="text-slate-500">Aged 0-15</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Button
                variant={"outline"}
                className="rounded-2xl text-xl"
                disabled={!passengersCount?.children}
                onClick={() =>
                  setPassengersCount((prev) => ({
                    ...prev,
                    children: prev.children - 1
                  }))
                }
              >
                -
              </Button>
              <h4>{passengersCount.children}</h4>
              <Button
                variant={"outline"}
                className="rounded-2xl text-xl"
                onClick={() =>
                  setPassengersCount((prev) => ({
                    ...prev,
                    children: prev.children + 1
                  }))
                }
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
