"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { ArrowRight } from "lucide-react";
import { FlightFilters } from "./flight-filters";
import { SortFilter } from "./sort-filter";
import { differenceInMinutes } from "date-fns";
import { useFlights } from "../data/use-flights";
import Gmap from "./Gmap";
import { useEffect, useState } from "react";
import { getApiKey } from "@/lib/api";

const FlightCard = ({
  flightsData: data,
  toPlace,
  originDetails
}: {
  flightsData: any;
  toPlace: any;
  originDetails: any;
}) => {
  const [googleMapsApiKey, setgoogleMapsApiKey] = useState(null);

  useEffect(()=>{
    const getKey = async ()=>{
      const key = await getApiKey();

      console.log(key)

      setgoogleMapsApiKey(key);
    }

    getKey();
  },[])
  const modifiedData = [];

  const [state, setState] = useFlights();
  const destinations = state?.destinations
  if (toPlace === "Everywhere" && destinations) {
    data.fares.forEach((flt) => {
      const foundPosition = destinations.find(
        (dst) =>
          dst.arrivalAirport.code === flt.outbound.arrivalAirport.iataCode
      );
      if (foundPosition) {
        modifiedData.push({
          ...flt,
          position: {
            lat: Number(foundPosition.arrivalAirport.coordinates.latitude),
            lng: Number(foundPosition.arrivalAirport.coordinates.longitude)
          },
          
        });
      }
    });
  }


  const departureAirport = destinations ? destinations.find(
    (dst) =>
      dst.arrivalAirport.code ===
      data.fares?.[0]?.outbound.departureAirport.iataCode
  ) : null;
  const initialZoom = departureAirport
    ? {
        lat: Number(departureAirport.departureAirport.coordinates.latitude),
        lng: Number(departureAirport.departureAirport.coordinates.longitude)
      }
    : null;

    console.log(googleMapsApiKey)



  return (
    <>
      {toPlace === "Everywhere" ? (
     
        <Gmap
          data={modifiedData}
          loading={false}
          getData={() => console.log("abcd")}
          originDetails={originDetails}
          googleMapsApiKey={googleMapsApiKey}
        />
      ) : (
        <div className="grid grid-cols-4">
          <div className="flex flex-col px-8 pt-4">
            <FlightFilters />
          </div>

          <div className="flex flex-col space-y-2 col-span-2">
            <div className="ml-auto">
              <SortFilter type="Sort by:" />
            </div>

            <h4 className="text-slate-800 text-2xl font-bold">Departure</h4>
            {data?.trips[0]?.dates.map((dateItem, i) => (
              <div key={i}>
                <h5 className="text-md font-semibold">
                  {format(parseISO(dateItem.dateOut), "EEEE, MMMM d, yyyy")}
                </h5>
                {dateItem?.flights.map((flt, j) => (
                  <Card key={j} className="my-2">
                    <CardContent className="flex items-center justify-between gap-1">
                      <div>{flt?.flightNumber}</div>
                      <div className="flex gap-2 items-center">
                        <div>
                          <p>{format(parseISO(flt.time[0]), "HH:mm")}</p>
                          <p className="font-semibold">
                            {data?.trips[0]?.origin}
                          </p>
                        </div>
                        <div>
                          <p className="w-full">
                            <ArrowRight className="w-full" />
                          </p>
                          <p className="text-sm">{flt?.duration} hrs</p>
                        </div>
                        <div>
                          <p>{format(parseISO(flt?.time[1]), "HH:mm")}</p>
                          <p className="font-semibold">
                            {data?.trips[0]?.destination}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p>${flt?.regularFare?.fares[0]?.amount}</p>
                        <Button variant={"default"}>Select</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
            <br />
            <hr />

            <h4 className="text-slate-800 text-2xl font-bold">Return</h4>
            {data?.trips[1]?.dates.map((dateItem, i) => (
              <div key={i}>
                <h5 className="text-md font-semibold">
                  {format(parseISO(dateItem.dateOut), "EEEE, MMMM d, yyyy")}
                </h5>
                {dateItem?.flights.map((flt, j) => (
                  <Card key={j} className="my-2">
                    <CardContent className="flex items-center justify-between gap-1">
                      <div>{flt?.flightNumber}</div>
                      <div className="flex gap-2 items-center">
                        <div>
                          <p>{format(parseISO(flt?.time[0]), "HH:mm")}</p>
                          <p className="font-semibold">
                            {data?.trips[1]?.origin}
                          </p>
                        </div>
                        <div>
                          <p className="w-full">
                            <ArrowRight className="w-full" />
                          </p>
                          <p className="text-sm">{flt?.duration} hrs</p>
                        </div>
                        <div>
                          <p>{format(parseISO(flt?.time[1]), "HH:mm")}</p>
                          <p className="font-semibold">
                            {data?.trips[1]?.destination}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p>${flt?.regularFare?.fares[0]?.amount}</p>
                        <Button variant={"default"}>Select</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FlightCard;
