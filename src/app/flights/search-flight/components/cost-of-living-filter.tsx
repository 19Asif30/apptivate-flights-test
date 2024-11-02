'use client';

import * as React from 'react';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';
import { useState } from 'react';

const CostOfLivingFilter = () => {
  const [values, setValues] = useState([0, 50]);

  return (
    <div className="w-full space-y-5 pt-10 px-4">
      <DualRangeSlider
        label={(value) => <span>${value}</span>}
        value={values}
        onValueChange={setValues}
        min={0}
        max={100}
        step={1}
      />
    </div>
  );
};
export default CostOfLivingFilter;
