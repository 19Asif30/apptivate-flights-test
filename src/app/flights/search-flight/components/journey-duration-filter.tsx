'use client';

import * as React from 'react';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';
import { useState } from 'react';

const JourneyDurationFilter = () => {
  const [values, setValues] = useState([0.5, 23.5]);

  return (
    <div className="w-full space-y-5 pt-10 px-4">
      <DualRangeSlider
        label={(value) => <span>{value}hrs</span>}
        value={values}
        onValueChange={setValues}
        min={0.5}
        max={23.5}
        step={0.5}
      />
    </div>
  );
};
export default JourneyDurationFilter;
