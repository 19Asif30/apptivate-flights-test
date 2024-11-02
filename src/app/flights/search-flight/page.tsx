import { getFlights, getOriginDetails } from "@/lib/api";
import FlightCard from "./components/FlightCard";

export default async function Page({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  console.log(searchParams);
  let flightsData, originDetails;
  try {
    flightsData = await getFlights(searchParams);
    originDetails = await getOriginDetails(searchParams);
  } catch (error) {
    flightsData = null;
    originDetails = null;
  }


  console.log(flightsData)

  return (
    <>
      {(flightsData && originDetails) ? (
        <FlightCard flightsData={flightsData} toPlace={searchParams?.toPlace} originDetails={originDetails} />
      ) : (
        <div className="text-center">No flights Found</div>
      )}
    </>
  );
}
