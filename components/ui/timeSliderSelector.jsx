"use client"
import React, { useState } from 'react';

export default function TimeSliderSelector({ onValueChange }) {
  const [sleepDuration, setSleepDuration] = useState(0);

  const formatSleepDuration = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <input
      type="range"
      id="sleepSlider"
      min="0"
      max="780" // Assuming a maximum sleep duration of 8 hours
      step="15" // Assuming each step is 30 minutes
      onChange={(e) => onValueChange(formatSleepDuration(Number(e.target.value)))}
      className="w-1/2"
    />
  );
};