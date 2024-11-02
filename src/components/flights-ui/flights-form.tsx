"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDateRangePicker } from "./date-range-picker";
import { CabinClassPopover } from "./cabin-class-popover";
import { PlaceSelect } from "./place-select";
import React, { act, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { format } from "date-fns";
import { useFlights } from "@/app/flights/search-flight/data/use-flights";
import { getActiveAirports, getDestinations } from "@/lib/api";

export default function FlightsForm() {
  const [state, setState] = useFlights();

  const {active_airports, destinations} = state;
  const [loading, setLoading] = useState({activeAirports: false, destinations: false})

  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [fromValue, setFromValue] = React.useState("");
  const [toValue, setToValue] = React.useState("Everywhere");
  const [flightClass, setFlightClass] = React.useState("Economy");
  const [passengersCount, setPassengersCount] = React.useState({
    adults: 2,
    children: 2
  });
  const { replace } = useRouter();

  useEffect(()=>{
    const getAirports = async () => {
      setLoading(prev=>({...prev, activeAirports: true}))
      const data = await getActiveAirports();
      console.log(data)
      setState({ ...state, active_airports: data });
      setLoading(prev=>({...prev, activeAirports: false}))

    };

    getAirports();

  },[])

  useEffect(() => {

    const getDestinationsData = async (fromPlace: string) => {
      setLoading(prev=>({...prev, destinations: true}))

      const data = await getDestinations({ fromPlace });
      setState({ ...state, destinations: data });
      setLoading(prev=>({...prev, destinations: false}))

    };
    if (fromValue) {
      getDestinationsData(fromValue);
    }
  }, [fromValue]);


  const handleNavigation = useCallback(() => {


    if(!fromValue || !toValue || !date?.from || !date?.to){
      alert("Please select all the details");
      return;
    }

    const url = new URL(`${window.location.href}/search-flight/`);
    const fromDate = format(date?.from, "yyyy-MM-dd");
    const toDate = format(date?.to, "yyyy-MM-dd");
    const fromPlace = fromValue;
    const toPlace = toValue;
    const fClass = flightClass;
    const adults = passengersCount.adults;
    const children = passengersCount.children;

    url.searchParams.set("fromDate", fromDate);
    url.searchParams.set("toDate", toDate);
    url.searchParams.set("fromPlace", fromPlace);
    url.searchParams.set("toPlace", toPlace);
    url.searchParams.set("fClass", fClass);
    url.searchParams.set("adults", adults.toString());
    url.searchParams.set("children", children.toString());

    replace(url.toString());
  }, [replace, fromValue, date, toValue, flightClass, passengersCount]);


  return (
    <>
      <div className="hidden flex-col md:flex">
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
                <PlaceSelect type="To" value={toValue} setValue={setToValue} options={destinations} loading={loading.destinations} />
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
                  className=" h-full w-full"
                  onClick={handleNavigation}
                >
                  Search
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
