import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import TemperatureFilter from "./temperature-filter"
import CostOfLivingFilter from "./cost-of-living-filter"
import JourneyDurationFilter from "./journey-duration-filter"
  
  export function FlightFilters() {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">Temperature</AccordionTrigger>
          <AccordionContent>
            <TemperatureFilter />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl">Cost of living</AccordionTrigger>
          <AccordionContent>
          <CostOfLivingFilter />

          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-xl">Journey Duration</AccordionTrigger>
          <AccordionContent>
            <JourneyDurationFilter />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  