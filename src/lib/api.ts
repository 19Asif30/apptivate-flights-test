'use server';

export const getFlights = async (data) => {
  const { fromDate, toDate, fromPlace, toPlace, fClass, adults, children } =
    data;
  let res;
  try {
    if (toPlace === "Everywhere") {
      res = await fetch(
        `https://www.ryanair.com/api/farfnd/v4/roundTripFares?departureAirportIataCode=${fromPlace}&outboundDepartureDateFrom=${fromDate}&market=en-gb&adultPaxCount=1&outboundDepartureDateTo=${fromDate}&inboundDepartureDateFrom=${toDate}&inboundDepartureDateTo=${toDate}&outboundDepartureDaysOfWeek=MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY&outboundDepartureTimeFrom=00:00&outboundDepartureTimeTo=23:59&inboundDepartureTimeFrom=00:00&inboundDepartureTimeTo=23:59`,
        {
          headers: {
            accept: "application/json, text/plain, */*"
          },
          cache: "no-store"
        }
      );
    } else {
      res = await fetch(
        `https://www.ryanair.com/api/booking/v4/en-gb/availability?ADT=${Number(
          adults
        )}&TEEN=0&CHD=${Number(
          children
        )}&INF=0&Origin=${fromPlace}&Destination=${toPlace}&promoCode=&IncludeConnectingFlights=false&DateOut=${fromDate}&DateIn=${toDate}&FlexDaysBeforeOut=2&FlexDaysOut=2&FlexDaysBeforeIn=2&FlexDaysIn=2&RoundTrip=true&ToUs=AGREED`,
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language":
              "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,ta;q=0.6",
            client: "desktop",
            "client-version": "3.125.8",
            "sec-ch-ua":
              '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            cookie:
              'mkt=/gb/en/; _cc=AekkO6htEB%2FV4dgjVHaoly1G; _cid_cc=AekkO6htEB%2FV4dgjVHaoly1G; bid_FRwdAp7a9G2cnLnTsgyBNeduseKcPcRy=38fd4fb0-6629-4f90-ba53-8359e63fd84d; STORAGE_PREFERENCES={"STRICTLY_NECESSARY":true,"PERFORMANCE":true,"FUNCTIONAL":true,"TARGETING":true,"SOCIAL_MEDIA":true,"PIXEL":true,"__VERSION":3}; RY_COOKIE_CONSENT=true; sid=38fd4fb0-6629-4f90-ba53-8359e63fd84d; fr-correlation-id=d33c9aef-32be-4b90-87c1-94f57dc682a6; rid=faf379f5-3bdf-4a22-b762-dabe0005be40; _ga=GA1.2.2087093492.1724336091; _gid=GA1.2.407045460.1724830424; _gat_gtag_UA_153938230_2=1; _ga_YBBVD7Z3XL=GS1.1.1724830423.2.1.1724830543.0.0.0; rid.sig=jyna6R42wntYgoTpqvxHMK7H+KyM6xLed+9I3KsvYZaVt7P36AL6zp9dGFPu5uVxaIiFpNXrszr+LfNCdY3IT3oCSYLeNv/ujtjsDqOzkY5JmUFsCdAEz3kpPbhCUwiArp5oaa75tpJtO3kFwYQ8l0DbH67AtcN/PMbniLsiM5qn+2AjrrtoNJicE3ZQwFHVipe4lWPSRfq2OIyUrlFhwEDt20+wCX7l1mCubNXtG6nZrUA07sFUFhn4RUxnjwjJ6d9qjjBasXLvYSqyYN7UaVlnvMqQikgeowLJUM2FKPp7CHUoQyW1L9/vaVjMz9dqLTmx76MgMKDQ9HR6Wklz6BLkHUZoOOEtJ7UdXT2tUnE3SeM7kVFY/M876vH4Z8KTdhTeL49oGtjcm2/KYcSyXyiI5igAzdVXGvbB0c7J4PnwNVr0m3tw4C9aT1yBIUrkrkLCBtTRdBccrHT/3n4D7mXho1US9SoNTpoO5YK/dwtMJG9vCR5UK0XV2qHilPiBwju2o3GpnnampIeA0AUm6gEJu+sVSdGnHVCWX603VNph8iAzA8FSkj6Q+o2Rlw25jWvyTjzfzlmAROAm72sUiZe4vzhS5cRiesg3dyNjjf5peS5gMG+S7RJLlz/vnHrA4caYoEP49AcHxBz8PFz7FMpm/0MHhKkTM1TB8ezjWDAY35rBm8DnZ7jl1zwODVEbaQWabgetRIYXcZYq/F/ZiNoCqnEI4Vnu0f4L9D6m8EPtJg2XMD0wz625nCt5nvqYvflxC9e5zo1uid83Q5fFV6eiRhTCa07VcbZhIKB2UO60BXSoCvqRzpajBNqWDH2O4N2m3pu/RehgxdI+CEgLoKkQCmEDnnZwGoo4ZGRroNo7z6q6+zrXxK7C8eu/OcJ5J/bRoIqnBGg57LXZ9FcUqvglTw3+IXdsfVRCUx1719r0WmAwbWBBVcJYgwIRpGkx5VhB6miFX79EnfudCmOXdqYb+8fFAU1jfnqoBs+8VNM=',
            Referer:
              "https://www.ryanair.com/gb/en/trip/flights/select?adults=1&teens=0&children=0&infants=0&dateOut=2024-08-29&dateIn=2024-09-07&isConnectedFlight=false&discount=0&promoCode=&isReturn=true&originIata=STN&destinationIata=DTM&tpAdults=1&tpTeens=0&tpChildren=0&tpInfants=0&tpStartDate=2024-08-29&tpEndDate=2024-09-07&tpDiscount=0&tpPromoCode=&tpOriginIata=STN&tpDestinationIata=DTM",
            "Referrer-Policy": "same-origin"
          },
          body: null,
          method: "GET",
          cache: "no-store"
        }
      );
    }

    if (!res.ok) {
      throw new Error(await res.json());
    }

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getDestinations = async (data) => {
  const { fromPlace } = data;

  let res = await fetch(
    `https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/${fromPlace}`,
    {
      headers: {
        accept: "application/json, text/plain, */*"
      }
    }
  );

  if (!res.ok) {
    throw new Error(await res.json());
  }

  return res.json();
};

export const getOriginDetails = async (data) => {
  const { fromPlace } = data;

  let res = await fetch(
    `https://www.ryanair.com/api/views/locate/5/airports/en/${fromPlace}`,
    {
      headers: {
        accept: "application/json, text/plain, */*"
      },
      cache: "no-store"
    }
  );

  if (!res.ok) {
    throw new Error(await res.json());
  }

  return res.json();
};

export const getActiveAirports = async () => {
  let res = await fetch(
    `https://www.ryanair.com/api/views/locate/5/airports/en/active`,
    {
      headers: {
        accept: "application/json, text/plain, */*"
      },
      cache: "no-store"
    }
  );

  if (!res.ok) {
    throw new Error(await res.json());
  }

  return res.json();
};

export const getApiKey = async () => {
  const apiKey = process.env.GOOGLE_API_KEY || "";

  return apiKey;

};



