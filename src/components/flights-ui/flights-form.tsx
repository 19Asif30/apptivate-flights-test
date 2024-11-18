"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDateRangePicker } from "./date-range-picker";
import { CabinClassPopover } from "./cabin-class-popover";
import { PlaceSelect } from "./place-select";
import React, { useEffect, useState, useCallback } from "react";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { getActiveAirports, getDestinations } from "@/lib/api";
import { useFlights } from "@/app/flights/search-flight/data/use-flights";

// Function to calculate the date range for next week starting from tomorrow
const getNextWeekDateRange = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Tomorrow's date

  // Set the "from" date to tomorrow and the "to" date to 7 days later (next week)
  const nextWeek = new Date(tomorrow);
  nextWeek.setDate(tomorrow.getDate() + 7); // 7 days from tomorrow

  return { from: tomorrow, to: nextWeek };
};

export default function FlightsForm() {
  // Use the custom hook to manage flight-related states
  const [state, setState] = useFlights();

  const { active_airports, destinations } = state;

  const [loading, setLoading] = useState({
    activeAirports: false,
    destinations: false
  });

  const [date, setDate] = useState<DateRange | undefined>(
    getNextWeekDateRange()
  );
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("Everywhere");
  const [flightClass, setFlightClass] = useState("Economy");
  const [passengersCount, setPassengersCount] = useState({
    adults: 2,
    children: 2
  });

  const { replace } = useRouter();

  // Retrieve form state from localStorage on component mount
  useEffect(() => {
    const storedFromValue = localStorage.getItem("fromValue");
    const storedToValue = localStorage.getItem("toValue");
    const storedDate = localStorage.getItem("date");
    const storedFlightClass = localStorage.getItem("flightClass");
    const storedPassengersCount = localStorage.getItem("passengersCount");

    if (storedFromValue) setFromValue(storedFromValue);
    if (storedToValue) setToValue(storedToValue);
    if (storedDate) setDate(JSON.parse(storedDate));
    if (storedFlightClass) setFlightClass(storedFlightClass);
    if (storedPassengersCount)
      setPassengersCount(JSON.parse(storedPassengersCount));
  }, []);

  // Save form state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("fromValue", fromValue);
    localStorage.setItem("toValue", toValue);
    localStorage.setItem("date", JSON.stringify(date));
    localStorage.setItem("flightClass", flightClass);
    localStorage.setItem("passengersCount", JSON.stringify(passengersCount));
  }, [fromValue, toValue, date, flightClass, passengersCount]);

  // Fetch active airports
  useEffect(() => {
    const getAirports = async () => {
      setLoading((prev) => ({ ...prev, activeAirports: true }));
      const data = await getActiveAirports();
      setState((prevState) => ({ ...prevState, active_airports: data }));
      setLoading((prev) => ({ ...prev, activeAirports: false }));
    };
    getAirports();
  }, [setState]);

  // Fetch destinations based on selected "from" location
  useEffect(() => {
    const getDestinationsData = async (fromPlace: string) => {
      setLoading((prev) => ({ ...prev, destinations: true }));
      const data = await getDestinations({ fromPlace });
      setState((prevState) => ({ ...prevState, destinations: data }));
      setLoading((prev) => ({ ...prev, destinations: false }));
    };

    if (fromValue) {
      getDestinationsData(fromValue);
    }
  }, [fromValue, setState]);

  // Handle form navigation when "Search" button is clicked
  const handleNavigation = useCallback(() => {
    if (!fromValue || !toValue || !date?.from || !date?.to) {
      alert("Please select all the details");
      return;
    }

    const url = new URL(`${window.location.href}/search-flight/`);
    const fromDate = format(date?.from, "yyyy-MM-dd");
    const toDate = format(date?.to, "yyyy-MM-dd");

    url.searchParams.set("fromDate", fromDate);
    url.searchParams.set("toDate", toDate);
    url.searchParams.set("fromPlace", fromValue);
    url.searchParams.set("toPlace", toValue);
    url.searchParams.set("fClass", flightClass);
    url.searchParams.set("adults", passengersCount.adults.toString());
    url.searchParams.set("children", passengersCount.children.toString());

    replace(url.toString());
  }, [replace, fromValue, date, toValue, flightClass, passengersCount]);

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardContent className="p-0">
              <PlaceSelect
                type="From"
                value={fromValue}
                setValue={setFromValue}
                options={active_airports}
                loading={loading.activeAirports}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <PlaceSelect
                type="To"
                value={toValue}
                setValue={setToValue}
                options={destinations}
                loading={loading.destinations}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="h-full p-0">
              <CalendarDateRangePicker
                type="Depart and Return"
                date={date}
                setDate={setDate}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="h-full w-full p-0">
              <CabinClassPopover
                options={{
                  flightClass,
                  setFlightClass,
                  passengersCount,
                  setPassengersCount
                }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="h-full w-full p-0">
              <Button
                variant="secondary"
                className="h-full w-full"
                onClick={handleNavigation}
              >
                Search
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
