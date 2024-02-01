"use client"
import React from 'react';

export default function TimeSliderSelector({ onValueChange }) {
  return (
    <input
      type="range"
      id="sleepSlider"
      defaultValue="0"
      min="0"
      max="780" // Assuming a maximum sleep duration of 8 hours
      step="15" // Assuming each step is 30 minutes
      onChange={(e) => onValueChange(Number(e.target.value))}
      className="w-1/2"
    />
  );
};