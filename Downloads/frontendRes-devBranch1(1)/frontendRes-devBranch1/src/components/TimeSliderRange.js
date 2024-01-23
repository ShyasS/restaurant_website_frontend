/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
// TimeRangeSlider.js

import React, { useState } from 'react';
import Slider from 'react-slider';

const TimeRangeSlider = ({ onTimeRangeChange }) => {
  const [timeRange, setTimeRange] = useState(0);

  const handleSliderChange = (value) => {
    setTimeRange(value);
    onTimeRangeChange(value);
  };

  return (
    <div>
      <p>Time Range: {timeRange} months</p>
      <Slider
        min={0}
        max={24}
        step={1}
        value={timeRange}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default TimeRangeSlider;

// <label>
// <h5 className="my-2"> Select Time Range:</h5>
// <select
//   value={timeRange}
//   className="form-control my-3"
//   onChange={(e) => handleTimeRangeChange(e.target.value)}
// >
//   {/* <option value="today">Today</option> */}
//   <option value="thisWeek">This Week</option>
//   <option value="thisMonth">This Month</option>
//   <option value="lastSixMonths">Last 6 Months</option>
//   <option value="lastYear">Last 1 Year</option>
//   <option value="lastTwoYears">Last 2 Years</option>
//   <option value="lastThreeYears">Last 3 Years</option>
// </select>
// </label>
