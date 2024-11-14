"use client";

import React, { useState } from "react";

// Sample moods data
const moods = [
  { label: "Mad", color: "red", subMoods: ["Hostile", "Critical"] },
  { label: "Scared", color: "orange", subMoods: ["Helpless", "Insecure"] },
  { label: "Joyful", color: "yellow", subMoods: ["Cheerful", "Energetic"] },
  { label: "Powerful", color: "green", subMoods: ["Important", "Proud"] },
  { label: "Peaceful", color: "blue", subMoods: ["Loving", "Trusting"] },
  { label: "Sad", color: "pink", subMoods: ["Ashamed", "Lonely"] },
];

const MoodWheel = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodClick = (mood: {
    label: any;
    color?: string;
    subMoods?: string[];
  }) => {
    setSelectedMood(mood.label);
  };

  const segmentAngle = 360 / moods.length;

  // Function to generate a lighter color based on the primary mood color
  const lightenColor = (color: string, percent: number) => {
    const colorMap: Record<string, string> = {
      red: "#ffcccc",
      orange: "#ffcc99",
      yellow: "#ffff99",
      green: "#99ff99",
      blue: "#99ccff",
      pink: "#ffb3d9",
    };
    return colorMap[color] || color;
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black h-max text-white space-y-0">
      <svg width="800" height="800" viewBox="-200 -200 400 400">
        {/* Define gradients for each mood */}
        {moods.map((mood, index) => (
          <defs key={index}>
            <linearGradient
              id={`gradient-${mood.label}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={mood.color} />
              <stop offset="100%" stopColor={lightenColor(mood.color, 50)} />
            </linearGradient>
          </defs>
        ))}

        {moods.map((mood, index) => {
          const startAngle = segmentAngle * index;
          const endAngle = startAngle + segmentAngle;
          const largeArcFlag = segmentAngle > 180 ? 1 : 0;

          const x1 = 100 * Math.cos((Math.PI * startAngle) / 180);
          const y1 = 100 * Math.sin((Math.PI * startAngle) / 180);
          const x2 = 100 * Math.cos((Math.PI * endAngle) / 180);
          const y2 = 100 * Math.sin((Math.PI * endAngle) / 180);

          return (
            <path
              key={index}
              d={`M 0 0 L ${x1} ${y1} A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
              fill={`url(#gradient-${mood.label})`} // Apply gradient here
              onClick={() => handleMoodClick(mood)}
              style={{ cursor: "pointer" }}
            />
          );
        })}
      </svg>

      {/* Display selected mood and sub-moods */}
      {selectedMood && (
        <div className=" text-lg font-bold text-center">
          {selectedMood}
          <div className="mt-2 text-md text-gray-300">
            {moods.find((m) => m.label === selectedMood)?.subMoods?.join(", ")}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodWheel;
