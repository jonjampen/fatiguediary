const energyLevels = [
    "\u{1F634}", // Level 1: Extremely Exhausted
    "\u{1F62B}", // Level 2: Very Exhausted
    "\u{1F629}", // Level 4: Exhausted
    "\u{1F62A}", // Level 3: quite Exhausted
    "\u{1F615}", // Level 5: Somewhat exhausted
    "\u{1F610}", // Level 6: neutral
    "\u{1F60C}", // Level 7: a bit Energized
    "\u{1F642}", // Level 8: somewhat energized
    "\u{1F60A}", // Level 9: Energized
    "\u{1F601}", // Level 10: very Energized
    "\u{1F60E}"  // Level 11: Really Fit and Awake
];

export function calculateEmoji(value) {
    return energyLevels[Math.floor(value)]
}