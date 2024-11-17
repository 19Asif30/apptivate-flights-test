// "use client";

// import React, { useEffect, useState } from "react";
// import { Marker, InfoWindow, MarkerClusterer } from "@react-google-maps/api";
// import GmapWrapper from "@/components/map/MapWrapper";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { format, parseISO } from "date-fns";
// import { ArrowRight } from "lucide-react";
// import { FlightFilters } from "./flight-filters";
// import { SortFilter } from "./sort-filter";
// import { differenceInMinutes } from "date-fns";

// const calculateDuration = (departureDate, arrivalDate) => {
//   const duration = differenceInMinutes(
//     parseISO(arrivalDate),
//     parseISO(departureDate)
//   );
//   const hours = Math.floor(duration / 60);
//   const minutes = duration % 60;
//   return `${hours}h ${minutes}m`;
// };

// const rowStyle = {
//   paddingBottom: "5px"
// };

// const Gmap = ({ data, loading, originDetails }) => {
//   const [infoData, setInfoData] = useState(null);
//   const [zoomData, setZoomData] = useState({
//     position: {
//       lat: Number(originDetails.coordinates.latitude),
//       lng: Number(originDetails.coordinates.longitude)
//     }
//   });
//   const [placeData, setPlaceData] = useState(null);

//   useEffect(() => {
//     if (infoData) {
//       const filteredData = data.filter(
//         (item) =>
//           item.outbound.arrivalAirport.iataCode ===
//           infoData.outbound.arrivalAirport.iataCode
//       );
//       setPlaceData(filteredData);
//     }
//   }, [infoData]);

//   const handleMarkerClick = (marker) => {
//     setInfoData(marker); // Set the clicked marker as the one with the InfoWindow
//     // setZoomData(marker); // Optional: Adjust zoom based on marker if needed
//   };

//   console.log(placeData)

//   return (
//     <div
//       className={
//         placeData
//           ? "map-wrap last-location-map-wrap grid grid-cols-1 md:grid-cols-2"
//           : "map-wrap last-location-map-wrap"
//       }
//     >
//       <div>
//         {placeData && (
//           <div className="grid grid-cols-2">
//             <div className="flex flex-col space-y-2 col-span-2">
//               <div className="ml-auto">
//                 <SortFilter type="Sort by:" />
//               </div>
//               <h4 className="text-slate-800 text-xl">
//                 Flights from{" "}
//                 <span className="font-bold">
//                   {placeData[0]?.outbound?.departureAirport?.name}
//                 </span>
//                 &nbsp; to &nbsp;
//                 <span className="font-bold">
//                   {placeData[0]?.outbound?.arrivalAirport?.name}
//                 </span>
//               </h4>

//               {/* {placeData.map((fare, index) => {
//                   const outbound = fare.outbound;
//                   const duration = calculateDuration(
//                     outbound.departureDate,
//                     outbound.arrivalDate
//                   );

//                   return (
//                     <Card key={index}>
//                       <CardHeader className="p-0 pt-1 px-5 m-0">
//                         <p className="text-sm text-gray-500">
//                           {format(
//                             parseISO(outbound.departureDate),
//                             "EEEE, MMMM d, yyyy"
//                           )}
//                         </p>
//                       </CardHeader>
//                       <CardContent className="flex items-center justify-between gap-1">
//                         <div>{outbound.flightNumber}</div>
//                         <div className="flex gap-2 items-center">
//                           <div>
//                             <p>
//                               {format(parseISO(outbound.departureDate), "HH:mm")}
//                             </p>
//                             <p className="font-semibold">
//                               {outbound.departureAirport.name}
//                             </p>
//                           </div>
//                           <div>
//                             <p className="w-full">
//                               <ArrowRight className="w-full" />
//                             </p>
//                             <p className="text-sm">{duration}</p>
//                           </div>
//                           <div>
//                             <p>{format(parseISO(outbound.arrivalDate), "HH:mm")}</p>
//                             <p className="font-semibold">
//                               {outbound.arrivalAirport.name}
//                             </p>
//                           </div>
//                         </div>
//                         <div>
//                           <p>
//                             {outbound.price.currencySymbol}
//                             {outbound.price.valueMainUnit}.
//                             {outbound.price.valueFractionalUnit}
//                           </p>
//                           <Button variant="default">Select</Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   );
//                 })} */}
//               {placeData.map((fare, index) => {
//                 const outbound = fare.outbound;
//                 const inbound = fare.inbound; // Access inbound flight details
//                 const outboundDuration = calculateDuration(
//                   outbound.departureDate,
//                   outbound.arrivalDate
//                 );
//                 const inboundDuration = calculateDuration(
//                   inbound.departureDate,
//                   inbound.arrivalDate
//                 );

//                 return (
//                   <Card key={index}>
//                     {/* Outbound Journey */}
//                     <CardHeader className="p-0 pt-1 px-5 m-0">
//                       <p className="text-sm text-gray-500">
//                         {format(
//                           parseISO(outbound.departureDate),
//                           "EEEE, MMMM d, yyyy"
//                         )}
//                       </p>
//                     </CardHeader>
//                     <CardContent className="flex items-center justify-between gap-1">
//                       <div>{outbound.flightNumber}</div>
//                       <div className="flex gap-2 items-center">
//                         <div>
//                           <p>
//                             {format(parseISO(outbound.departureDate), "HH:mm")}
//                           </p>
//                           <p className="font-semibold">
//                             {outbound.departureAirport.name}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="w-full">
//                             <ArrowRight className="w-full" />
//                           </p>
//                           <p className="text-sm">{outboundDuration}</p>
//                         </div>
//                         <div>
//                           <p>
//                             {format(parseISO(outbound.arrivalDate), "HH:mm")}
//                           </p>
//                           <p className="font-semibold">
//                             {outbound.arrivalAirport.name}
//                           </p>
//                         </div>
//                       </div>
//                       <div>
//                         <p>
//                           {outbound.price.currencySymbol}
//                           {outbound.price.valueMainUnit}.
//                           {outbound.price.valueFractionalUnit}
//                         </p>
//                         <Button variant="default">Select</Button>
//                       </div>
//                     </CardContent>

//                     {/* Separator */}
//                     <hr className="my-4 w-6/12 mx-auto" />

//                     {/* Inbound Journey */}
//                     <CardHeader className="p-0 px-5 m-0">
//                       <p className="text-sm text-gray-500">
//                         {format(
//                           parseISO(inbound.departureDate),
//                           "EEEE, MMMM d, yyyy"
//                         )}
//                       </p>
//                     </CardHeader>
//                     <CardContent className="flex items-center justify-between gap-1">
//                       <div>{inbound.flightNumber}</div>
//                       <div className="flex gap-2 items-center">
//                         <div>
//                           <p>
//                             {format(parseISO(inbound.departureDate), "HH:mm")}
//                           </p>
//                           <p className="font-semibold">
//                             {inbound.departureAirport.name}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="w-full">
//                             <ArrowRight className="w-full" />
//                           </p>
//                           <p className="text-sm">{inboundDuration}</p>
//                         </div>
//                         <div>
//                           <p>
//                             {format(parseISO(inbound.arrivalDate), "HH:mm")}
//                           </p>
//                           <p className="font-semibold">
//                             {inbound.arrivalAirport.name}
//                           </p>
//                         </div>
//                       </div>
//                       <div>
//                         <p>
//                           {inbound.price.currencySymbol}
//                           {inbound.price.valueMainUnit}.
//                           {inbound.price.valueFractionalUnit}
//                         </p>
//                         <Button variant="default">Select</Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//       {loading ? (
//         <GmapWrapper loading={true}></GmapWrapper>
//       ) : (
//         <GmapWrapper zoomData={zoomData} loading={loading}>
//           <>
//             {/* <div className="absolute flex justify-end w-full z-50">

//             </div> */}
//             <MarkerClusterer
//               averageCenter={true}
//               // gridSize={40}
//               // options={{
//               //   imagePath: `https://i.imgur.com/T6I8BI3.png`,
//               //   imageSizes: [10]
//               // }}
//               // calculator={(markers, numStyles) => {
//               //   var index = 0;
//               //   var count = markers.length.toString();
//               //   var dv = count;
//               //   while (dv !== 0) {
//               //     dv = parseInt(dv / 10, 10);
//               //     index++;
//               //   }
//               //   index = Math.min(index, numStyles);
//               //   return {
//               //     text: "",
//               //     index: index,
//               //     title: count
//               //   };
//               // }}
//             >
//               {(clusterer) =>
//                 data?.map((marker, index) => (
//                   <Marker
//                     key={`last-location-${index}`}
//                     position={marker?.position}
//                     // clusterer={clusterer}
//                     // icon={{
//                     //   path: window.google.maps.SymbolPath.CIRCLE,
//                     //   fillColor: '#FF3333',
//                     //   fillOpacity: 1,
//                     //   strokeColor: '#0000A',
//                     //   strokeOpacity: 1,
//                     //   strokeWeight: 1,
//                     //   scale: 5
//                     // }}
//                     onClick={() => handleMarkerClick(marker)} // Handle marker click to show InfoWindow
//                   >
//                     <InfoWindow
//                       position={marker?.position}
//                       onCloseClick={() => setInfoData(null)} // Close InfoWindow on close button click
//                       options={{
//                         pixelOffset: new window.google.maps.Size(0, -30), // Moves the InfoWindow up by 30 pixels
//                         // disableAutoPan: true

//                       }}
//                       children={
//                         <div
//                           className="p-1 cursor-pointer hover:border-blue-500 hover:border-2"
//                           onClick={() => handleMarkerClick(marker)}
//                         >
//                           <p className="font-medium text-black">
//                             {marker.outbound.arrivalAirport.name}
//                           </p>
//                           <p className="font-semibold italic text-cyan-500">
//                             {marker.outbound.price.currencySymbol}&nbsp;
//                             {marker.outbound.price.value}
//                           </p>
//                         </div>
//                       }
//                     ></InfoWindow>
//                   </Marker>
//                 ))
//               }
//             </MarkerClusterer>
//             <Marker position={zoomData?.position}>
//               <InfoWindow
//                 position={zoomData?.position}
//                 zIndex={50}
//                 options={{
//                   // pixelOffset: new window.google.maps.Size(0, -30) // Moves the InfoWindow up by 30 pixels
//                 }}
//               >
//                 <div className="">
//                   <p className="font-extrabold text-2xl text-black">
//                     {originDetails.name}
//                   </p>
//                 </div>
//               </InfoWindow>
//             </Marker>
//           </>
//         </GmapWrapper>
//       )}
//     </div>
//   );
// };

// export default Gmap;

'use client';

import React, { useEffect, useState } from "react";
import {
  Marker,
  InfoWindow,
  MarkerClusterer,
  Polyline
} from "@react-google-maps/api";
import GmapWrapper from "@/components/map/MapWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import shadcn select components
import { Input } from "@/components/ui/input"; // Import shadcn input for search
import { format, parseISO } from "date-fns";
import { ArrowRight, Plane } from "lucide-react";
import { SortFilter } from "./sort-filter";
import { differenceInMinutes } from "date-fns";

const calculateDuration = (departureDate, arrivalDate) => {
  const duration = differenceInMinutes(
    parseISO(arrivalDate),
    parseISO(departureDate)
  );
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
};

function getFlightIconSVG(price) {
  const maxPrice = 250;
  const minPrice = 0;
  const normalizedPrice = Math.max(minPrice, Math.min(price, maxPrice));

  // Calculate the ratio of price (0 to 1 scale)
  const ratio = normalizedPrice / maxPrice;

  // Define the color transition points: light blue -> blue -> red
  const lightBlue = { r: 173, g: 216, b: 230 }; // Light Blue (Low price)
  const blue = { r: 0, g: 0, b: 255 };         // Blue (Mid price)
  const red = { r: 255, g: 0, b: 0 };          // Red (High price)

  let color;

  if (ratio < 0.5) {
    // Transition from light blue to blue for the first half of the range
    const transitionRatio = ratio * 2; // Scale to 0-1
    const r = Math.floor(lightBlue.r + (blue.r - lightBlue.r) * transitionRatio);
    const g = Math.floor(lightBlue.g + (blue.g - lightBlue.g) * transitionRatio);
    const b = Math.floor(lightBlue.b + (blue.b - lightBlue.b) * transitionRatio);
    color = `rgb(${r}, ${g}, ${b})`;
  } else {
    // Transition from blue to red for the second half of the range
    const transitionRatio = (ratio - 0.5) * 2; // Scale to 0-1
    const r = Math.floor(blue.r + (red.r - blue.r) * transitionRatio);
    const g = Math.floor(blue.g + (red.g - blue.g) * transitionRatio);
    const b = Math.floor(blue.b + (red.b - blue.b) * transitionRatio);
    color = `rgb(${r}, ${g}, ${b})`;
  }

  // Return the SVG string with the appropriate fill color
  return `
     data:image/svg+xml;charset=UTF-8,

    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' focusable='false'>
      <path fill='${color}' d='M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z'/>
    </svg>
  `;
}





const Gmap = ({ data, loading, originDetails, googleMapsApiKey }) => {

  const [infoData, setInfoData] = useState(null);
  const [zoomData, setZoomData] = useState({
    position: {
      lat: Number(originDetails.coordinates.latitude),
      lng: Number(originDetails.coordinates.longitude)
    }
  });
  const [placeData, setPlaceData] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);

  // Airport search state
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (infoData) {
      const filteredData = data.filter(
        (item) =>
          item.outbound.arrivalAirport.iataCode ===
          infoData.outbound.arrivalAirport.iataCode
      );
      setPlaceData(filteredData);
    }
  }, [infoData]);

  const handleMarkerClick = (marker) => {
    setInfoData(marker);
  };

  // Function to handle select change
  const handleAirportSelect = (iataCode) => {
    const selectedMarker = data.find(
      (marker) => marker.outbound.arrivalAirport.iataCode === iataCode
    );
    if (selectedMarker) {
      setHoveredMarker(selectedMarker);
      handleMarkerClick(selectedMarker); // Call existing handler
    }
  };

  // Get list of unique airport names and IATA codes for select options
  const airportOptions = data.map((marker) => ({
    name: marker.outbound.arrivalAirport.name,
    iataCode: marker.outbound.arrivalAirport.iataCode
  }));

  const filteredOptions = airportOptions.filter((airport) =>
    airport.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div
      className={
        placeData
          ? "map-wrap last-location-map-wrap grid grid-cols-1 md:grid-cols-2 gap-2"
          : "map-wrap last-location-map-wrap"
      }
    >
      <div>
        {/* Airport Search and Select Box */}
        <div className="mb-4 bg-primary-foreground">
          {/* <Input
            placeholder="Search Airport"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          /> */}
          <Select onValueChange={handleAirportSelect} value={hoveredMarker?.outbound.arrivalAirport.iataCode}>
            <SelectTrigger>
              <SelectValue placeholder="Select Airport" />
            </SelectTrigger>
            <SelectContent>
              {filteredOptions.map((airport, index) => (
                <SelectItem key={index} value={airport.iataCode}>
                  {airport.name} ({airport.iataCode})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {placeData && (
          <div className="grid grid-cols-2">
            {/* Existing code for displaying flight cards */}
            <div className="flex flex-col space-y-2 col-span-2">
              <div className="ml-auto">
                <SortFilter type="Sort by:" />
              </div>
              <h4 className="text-slate-800 text-xl">
                Flights from{" "}
                <span className="font-bold">
                  {placeData[0]?.outbound?.departureAirport?.name}
                </span>
                &nbsp; to &nbsp;
                <span className="font-bold">
                  {placeData[0]?.outbound?.arrivalAirport?.name}
                </span>
              </h4>
              {placeData.map((fare, index) => {
                const outbound = fare.outbound;
                const inbound = fare.inbound; // Access inbound flight details
                const outboundDuration = calculateDuration(
                  outbound.departureDate,
                  outbound.arrivalDate
                );
                const inboundDuration = calculateDuration(
                  inbound.departureDate,
                  inbound.arrivalDate
                );

                return (
                  <Card key={index}>
                    {/* Outbound Journey */}
                    <CardHeader className="p-0 pt-1 px-5 m-0">
                      <p className="text-sm text-gray-500">
                        {format(
                          parseISO(outbound.departureDate),
                          "EEEE, MMMM d, yyyy"
                        )}
                      </p>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between gap-1">
                      <div>{outbound.flightNumber}</div>
                      <div className="flex gap-2 items-center">
                        <div>
                          <p>
                            {format(parseISO(outbound.departureDate), "HH:mm")}
                          </p>
                          <p className="font-semibold">
                            {outbound.departureAirport.name}
                          </p>
                        </div>
                        <div>
                          <p className="w-full">
                            <ArrowRight className="w-full" />
                          </p>
                          <p className="text-sm">{outboundDuration}</p>
                        </div>
                        <div>
                          <p>
                            {format(parseISO(outbound.arrivalDate), "HH:mm")}
                          </p>
                          <p className="font-semibold">
                            {outbound.arrivalAirport.name}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p>
                          {outbound.price.currencySymbol}
                          {outbound.price.valueMainUnit}.
                          {outbound.price.valueFractionalUnit}
                        </p>
                        <Button variant="default">Select</Button>
                      </div>
                    </CardContent>

                    {/* Separator */}
                    <hr className="my-4 w-6/12 mx-auto" />

                    {/* Inbound Journey */}
                    <CardHeader className="p-0 px-5 m-0">
                      <p className="text-sm text-gray-500">
                        {format(
                          parseISO(inbound.departureDate),
                          "EEEE, MMMM d, yyyy"
                        )}
                      </p>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between gap-1">
                      <div>{inbound.flightNumber}</div>
                      <div className="flex gap-2 items-center">
                        <div>
                          <p>
                            {format(parseISO(inbound.departureDate), "HH:mm")}
                          </p>
                          <p className="font-semibold">
                            {inbound.departureAirport.name}
                          </p>
                        </div>
                        <div>
                          <p className="w-full">
                            <ArrowRight className="w-full" />
                          </p>
                          <p className="text-sm">{inboundDuration}</p>
                        </div>
                        <div>
                          <p>
                            {format(parseISO(inbound.arrivalDate), "HH:mm")}
                          </p>
                          <p className="font-semibold">
                            {inbound.arrivalAirport.name}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p>
                          {inbound.price.currencySymbol}
                          {inbound.price.valueMainUnit}.
                          {inbound.price.valueFractionalUnit}
                        </p>
                        <Button variant="default">Select</Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {(loading && googleMapsApiKey) ? (
        <GmapWrapper loading={true} googleMapsApiKey={googleMapsApiKey}></GmapWrapper>
      ) : googleMapsApiKey && (
        <GmapWrapper zoomData={zoomData} loading={loading} googleMapsApiKey={googleMapsApiKey}>
          <>
            {data?.map((marker, index) => (
              <Marker
                key={`last-location-${index}`}
                position={marker?.position}
                onMouseOver={() => {setHoveredMarker(marker); handleMarkerClick(marker)}}
                onClick={() => {setHoveredMarker(marker); handleMarkerClick(marker)}}
                icon={{
                  url: getFlightIconSVG(marker?.outbound?.price?.value)
                }}
              />
            ))}

            {hoveredMarker && (
              <InfoWindow
                position={hoveredMarker?.position}
                onCloseClick={() => {setInfoData(null); setHoveredMarker(null);}}
                options={{
                  pixelOffset: new window.google.maps.Size(0, -10)
                }}
              >
                <div className="p-1">
                  <p className="font-extrabold text-black">
                    {hoveredMarker.outbound.arrivalAirport.name}
                    &nbsp;
                    <Plane className="inline" size={18} color='blue' />
                  </p>
                  <p className="font-semibold italic text-cyan-500">
                    {hoveredMarker.outbound.price.currencySymbol}&nbsp;
                    {hoveredMarker.outbound.price.value}
                  </p>
                </div>
              </InfoWindow>
            )}

            <Polyline
              path={
                hoveredMarker ? [hoveredMarker.position, zoomData.position] : []
              }
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 1,
                strokeWeight: 2,
                geodesic: true,
                strokeDasharray: "10, 10"
              }}
              visible={hoveredMarker ? true : false}
            />

            <Marker position={zoomData?.position}>
              {/* <InfoWindow position={zoomData?.position} zIndex={50}>
                <div className="">
                  <p className="font-extrabold text-2xl text-black">
                    {originDetails.name}
                  </p>
                </div>
              </InfoWindow> */}
            </Marker>
          </>
        </GmapWrapper>
      )}
    </div>
  );
};

export default Gmap;


// 'use client';

// //  (c) 2022 Autoven Private Limited. All rights reserved.

// import React, {useState} from "react";
// import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
// import { MarkerClusterer } from "@react-google-maps/api";
// import GmapCircle from './GmapCircle.png';
// const containerStyle = {
//   width: '100%',
//   height: '582px'
// };

// const Map = (props) => {
//   const { isLoaded, loadError } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: `${''}`,
//   })

//   var hisData = [];
//   var pathData = []
//   for(var i=0; i<(props.locData).length; i++) {
//     var obj = {
//       id: i+1,
//       time: (props.locData[i]).TimeStamp,
//       position: {lat:(props.locData[i]).Lat, lng: (props.locData[i]).Lon }
//     }
//     hisData.push(obj)
//     pathData.push(obj.position)
//   }

//   const [isInfo, setInfo] = useState(false)
//   const infoWindowOpen = () => {
//     setInfo(true)
//   }
//   const infoWindowClose = () => {
//     setInfo(false)
//   }

//   const options = {
//     imagePath:`https://insights.altigreen.app/redDotMarker`,
//     imageSizes:[10]
//   }

//   const onLoad = (map) => {
//     const bounds = new window.google.maps.LatLngBounds();
//     hisData.forEach(({position})=> bounds.extend(position))
//     map.fitBounds(bounds);
//   }

//   return (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       onLoad={onLoad}
//       options={{gestureHandling: "greedy" }}
//     >
//       <MarkerClusterer
//         averageCenter={false}
//         gridSize={40}
//         options={options}
//         calculator={(markers, numStyles) => {
//           var index = 0;
//           var count = markers.length.toString();
//           var dv = count;
//           while (dv !== 0) {
//             dv = parseInt(dv / 10, 10);
//             index++;
//           }
//           index = Math.min(index, numStyles);
//           return {
//             text: "",
//             index: index,
//             title: count
//           };
//         }}
//       >
//       {clusterer=>hisData.map(({id, position}) => {

//           return (
//             <>
//               <Marker key={id} position={position} onClick={infoWindowOpen}
//                 icon={{
//                   path: window.google.maps.SymbolPath.CIRCLE,
//                   fillColor: '#FF3333',
//                   fillOpacity: 1,
//                   strokeColor: '#0000A',
//                   strokeOpacity: 1,
//                   strokeWeight: 1,
//                   scale: 5
//                 }}
//                 clusterer={clusterer}
//               ><InfoWindow onCloseClick={infoWindowClose}>
//               <span>London Stanstred</span>
//             </InfoWindow></Marker>
//             </>
//           )
//         }
//       )}
//       </MarkerClusterer>
//     </GoogleMap>
//   )
// }

// export default Map;

// 'use client';

// import React, { useEffect, useState } from "react";
// import {
//   GoogleMap,
//   Marker,
//   InfoWindow,
//   MarkerClusterer,
//   useJsApiLoader
// } from "@react-google-maps/api";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { format, parseISO, differenceInMinutes } from "date-fns";
// import { ArrowRight } from "lucide-react";
// import { SortFilter } from "./sort-filter";

// // Container style for the Google Map
// const containerStyle = {
//   width: "100%",
//   height: "582px"
// };

// // Function to calculate flight duration
// const calculateDuration = (departureDate, arrivalDate) => {
//   const duration = differenceInMinutes(
//     parseISO(arrivalDate),
//     parseISO(departureDate)
//   );
//   const hours = Math.floor(duration / 60);
//   const minutes = duration % 60;
//   return `${hours}h ${minutes}m`;
// };

// const Gmap = ({ data, loading, originDetails }) => {
//   const { isLoaded, loadError } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "" // Replace with your Google API key
//   });

//   const [infoData, setInfoData] = useState(null);
//   const [placeData, setPlaceData] = useState(null);
//   const [zoomData, setZoomData] = useState({
//     position: {
//       lat: Number(originDetails.coordinates.latitude),
//       lng: Number(originDetails.coordinates.longitude)
//     }
//   });

//   var hisData = [];
//   for(var i=0; i<(data).length; i++) {
//     var obj = {
//       id: i+1,
//       ...data[i]
//     }
//     hisData.push(obj)
//   }

//   // Filter place data when a marker is clicked
//   useEffect(() => {
//     if (infoData) {
//       const filteredData = data.filter(
//         (item) =>
//           item.outbound.arrivalAirport.iataCode ===
//           infoData.outbound.arrivalAirport.iataCode
//       );
//       setPlaceData(filteredData);
//     }
//   }, [infoData]);

//   const handleMarkerClick = (marker) => {
//     setInfoData(marker); // Set the clicked marker as the one with the InfoWindow
//   };

//   console.log(data);
//   const onMapLoad = (map) => {
//     const bounds = new window.google.maps.LatLngBounds();
//     hisData.forEach(({ position }) => bounds.extend(position));
//     map.fitBounds(bounds); // Adjust the map bounds based on the marker positions
//   };

//   const mapOptions = {
//     gestureHandling: "greedy"
//   };

//   const options = {
//     imagePath: `https://insights.altigreen.app/redDotMarker`,
//     imageSizes: [10]
//   };

//   return isLoaded ? (
//     <div
//       className={
//         placeData
//           ? "map-wrap last-location-map-wrap grid grid-cols-1 md:grid-cols-2"
//           : "map-wrap last-location-map-wrap"
//       }
//     >
//       <div>
//         {placeData && (
//           <div className="grid grid-cols-2">
//             <div className="flex flex-col space-y-2 col-span-2">
//               <div className="ml-auto">
//                 <SortFilter type="Sort by:" />
//               </div>
//               <h4 className="text-slate-800 text-xl">
//                 Flights from{" "}
//                 <span className="font-bold">
//                   {placeData[0]?.outbound?.departureAirport?.name}
//                 </span>
//                 &nbsp; to &nbsp;
//                 <span className="font-bold">
//                   {placeData[0]?.outbound?.arrivalAirport?.name}
//                 </span>
//               </h4>

//               {placeData.map((fare, index) => {
//                 const outbound = fare.outbound;
//                 const inbound = fare.inbound;
//                 const outboundDuration = calculateDuration(
//                   outbound.departureDate,
//                   outbound.arrivalDate
//                 );
//                 const inboundDuration = calculateDuration(
//                   inbound.departureDate,
//                   inbound.arrivalDate
//                 );

//                 return (
//                   <Card key={index}>
//                     {/* Outbound Journey */}
//                     <CardHeader className="p-0 pt-1 px-5 m-0">
//                       <p className="text-sm text-gray-500">
//                         {format(
//                           parseISO(outbound.departureDate),
//                           "EEEE, MMMM d, yyyy"
//                         )}
//                       </p>
//                     </CardHeader>
//                     <CardContent className="flex items-center justify-between gap-1">
//                       <div>{outbound.flightNumber}</div>
//                       <div className="flex gap-2 items-center">
//                         <div>
//                           <p>
//                             {format(parseISO(outbound.departureDate), "HH:mm")}
//                           </p>
//                           <p className="font-semibold">
//                             {outbound.departureAirport.name}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="w-full">
//                             <ArrowRight className="w-full" />
//                           </p>
//                           <p className="text-sm">{outboundDuration}</p>
//                         </div>
//                         <div>
//                           <p>
//                             {format(parseISO(outbound.arrivalDate), "HH:mm")}
//                           </p>
//                           <p className="font-semibold">
//                             {outbound.arrivalAirport.name}
//                           </p>
//                         </div>
//                       </div>
//                       <div>
//                         <p>
//                           {outbound.price.currencySymbol}
//                           {outbound.price.valueMainUnit}.
//                           {outbound.price.valueFractionalUnit}
//                         </p>
//                         <Button variant="default">Select</Button>
//                       </div>
//                     </CardContent>

//                     {/* Separator */}
//                     <hr className="my-4 w-6/12 mx-auto" />

//                     {/* Inbound Journey */}
//                     <CardHeader className="p-0 px-5 m-0">
//                       <p className="text-sm text-gray-500">
//                         {format(
//                           parseISO(inbound.departureDate),
//                           "EEEE, MMMM d, yyyy"
//                         )}
//                       </p>
//                     </CardHeader>
//                     <CardContent className="flex items-center justify-between gap-1">
//                       <div>{inbound.flightNumber}</div>
//                       <div className="flex gap-2 items-center">
//                         <div>
//                           <p>
//                             {format(parseISO(inbound.departureDate), "HH:mm")}
//                           </p>
//                           <p className="font-semibold">
//                             {inbound.departureAirport.name}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="w-full">
//                             <ArrowRight className="w-full" />
//                           </p>
//                           <p className="text-sm">{inboundDuration}</p>
//                         </div>
//                         <div>
//                           <p>
//                             {format(parseISO(inbound.arrivalDate), "HH:mm")}
//                           </p>
//                           <p className="font-semibold">
//                             {inbound.arrivalAirport.name}
//                           </p>
//                         </div>
//                       </div>
//                       <div>
//                         <p>
//                           {inbound.price.currencySymbol}
//                           {inbound.price.valueMainUnit}.
//                           {inbound.price.valueFractionalUnit}
//                         </p>
//                         <Button variant="default">Select</Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Google Map Section */}
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         onLoad={onMapLoad}
//         options={mapOptions}

//         zoom={10}
//         center={zoomData.position}
//       >
//         <MarkerClusterer
//           averageCenter={false}
//           gridSize={40}
//           options={options}
//           calculator={(markers, numStyles) => {
//             var index = 0;
//             var count = markers.length.toString();
//             var dv = count;
//             while (dv !== 0) {
//               dv = parseInt(dv / 10, 10);
//               index++;
//             }
//             index = Math.min(index, numStyles);
//             return {
//               text: "",
//               index: index,
//               title: count
//             };
//           }}
//         >
//           {(clusterer) =>
//             hisData?.map((marker, index) => (
//               <Marker
//                 key={`last-location-${index}`}
//                 icon={{
//                   path: window.google.maps.SymbolPath.CIRCLE,
//                   fillColor: '#FF3333',
//                   fillOpacity: 1,
//                   strokeColor: '#0000A',
//                   strokeOpacity: 1,
//                   strokeWeight: 1,
//                   scale: 5
//                 }}
//                 position={marker.position}
//                 clusterer={clusterer}
//                 onClick={() => handleMarkerClick(marker)}
//               >
//                 {infoData && (
//                   <InfoWindow
//                     position={marker.position}
//                     onCloseClick={() => setInfoData(null)}
//                     options={{
//                       pixelOffset: new window.google.maps.Size(0, -30)
//                     }}
//                   >
//                     <div className="p-1">
//                       <p className="font-medium text-black">
//                         {marker.outbound.arrivalAirport.name}
//                       </p>
//                       <p className="font-semibold italic text-cyan-500">
//                         {marker.outbound.price.currencySymbol}&nbsp;
//                         {marker.outbound.price.value}
//                       </p>
//                     </div>
//                   </InfoWindow>
//                 )}
//               </Marker>
//             ))
//           }
//         </MarkerClusterer>

//         {/* Zoom Marker for the origin location */}
//         <Marker position={zoomData?.position}>
//           <InfoWindow
//             position={zoomData?.position}
//             zIndex={50}
//             options={{
//               pixelOffset: new window.google.maps.Size(0, -30)
//             }}
//           >
//             <div className="p-0 m-0">
//               <p className="font-extrabold text-2xl text-black">{originDetails.name}</p>
//             </div>
//           </InfoWindow>
//         </Marker>
//       </GoogleMap>
//     </div>
//   ) : (
//     <p>Loading...</p>
//   );
// };

// export default Gmap;
