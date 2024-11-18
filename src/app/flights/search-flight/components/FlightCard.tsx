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
import { useRouter } from "next/navigation"; // If using Next.js for routing

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

  useEffect(() => {
    const getKey = async () => {
      const key = await getApiKey();

      console.log(key);

      setgoogleMapsApiKey(key);
    };

    getKey();
  }, []);
  const modifiedData = [];

  const [state, setState] = useFlights();
  const destinations = state?.destinations;
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
          }
        });
      }
    });
  }

  const [flt, setFlt] = useState<any>(null); // Assuming this is the flight data

  const { replace } = useRouter(); // For redirecting in Next.js

  const handleSelectClick = () => {
    // Retrieve the necessary values from localStorage
    const fromValue = localStorage.getItem("fromValue"); // Origin airport code
    const toValue = localStorage.getItem("toValue"); // Destination airport code
    const storedDate = localStorage.getItem("date");
    const storedPassengersCount = localStorage.getItem("passengersCount");

    const parsedDate = storedDate ? JSON.parse(storedDate) : {};
    const parsedPassengersCount = storedPassengersCount
      ? JSON.parse(storedPassengersCount)
      : {};

    // Format dates for Ryanair (using departure and return dates from localStorage)
    const dateOut = parsedDate?.from
      ? format(new Date(parsedDate.from), "yyyy-MM-dd")
      : "";
    const dateIn = parsedDate?.to
      ? format(new Date(parsedDate.to), "yyyy-MM-dd")
      : "";

    // Defaulting to values from localStorage or fallback if not present
    const adults = parsedPassengersCount?.adults || 1;
    const children = parsedPassengersCount?.children || 0;

    // Construct the Ryanair URL
    const ryanairUrl = `https://www.ryanair.com/gb/en/fare-finder?originIata=${fromValue}&dateOut=${dateOut}&dateIn=${dateIn}&isExactDate=true&outboundFromHour=00:00&outboundToHour=23:59&inboundFromHour=00:00&inboundToHour=23:59&priceValueTo=&currency=GBP&destinationIata=${toValue}&isReturn=true&isMacDestination=false&promoCode=&adults=${adults}&teens=0&children=${children}&infants=0&isFlexibleDay=false`;

    // Redirect to the Ryanair fare finder
    window.location.href = ryanairUrl;
  };

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
        <div className="grid grid-cols-4 bg-transparent-50 p-2">
          <div className="flex flex-col px-8 pt-4">
            <FlightFilters />
          </div>

          <div className="flex flex-col space-y-2 col-span-2">
            <div className="ml-auto">
              <SortFilter type="Sort by:" />
            </div>

            <h4 className="text-slate-800 text-2xl font-bold">Departure</h4>
            {data?.trips[0]?.dates.map((dateItem, i) =>
              dateItem?.flights?.length ? (
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
                          <Button
                            variant={"default"}
                            onClick={handleSelectClick}
                          >
                            Select
                          </Button>{" "}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <></>
              )
            )}
            <br />
            <hr />

            <h4 className="text-slate-800 text-2xl font-bold">Return</h4>
            {data?.trips[1]?.dates.map((dateItem, i) =>
              dateItem?.flights?.length ? (
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
                          <Button
                            variant={"default"}
                            onClick={handleSelectClick}
                          >
                            Select
                          </Button>{" "}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FlightCard;
