export type WeatherCode = keyof typeof iconMap;

export const iconMap = {
  0: (isDay: boolean) => isDay ? "clear-day-fill" : "clear-night-fill",
  1: (isDay: boolean) => isDay ? "partly-cloudy-day-fill" : "partly-cloudy-night-fill",
  2: (isDay: boolean) => isDay ? "partly-cloudy-day-fill" : "partly-cloudy-night-fill",
  3: "overcast-fill",
  45: "fog-fill",
  48: "fog-fill",
  51: (isDay: boolean) => isDay ? "partly-cloudy-day-drizzle" : "partly-cloudy-night-drizzle",
  53: (isDay: boolean) => isDay ? "partly-cloudy-day-drizzle" : "partly-cloudy-night-drizzle",
  55: (isDay: boolean) => isDay ? "partly-cloudy-day-drizzle" : "partly-cloudy-night-drizzle",
  56: "sleet-fill",
  57: "sleet-fill",
  61: "rain",
  63: "raindrops-fill",
  65: "rain-fill",
  71: "snowflake-fill",
  73: "snowflake-fill",
  75: "extreme-snow-fill",
  80: "umbrella-fill",
  81: "umbrella-fill",
  82: "umbrella-fill",
  85: "snowflake-fill",
  86: "snowflake-fill",
  95: (isDay: boolean) => isDay ? "thunderstorms-day-fill" : "thunderstorms-night-fill",
  96: "thunderstorms-extreme-fill",
  99: "thunderstorms-extreme-fill"
} as const;

/**
 * Returns the class name of the meteocons icon based on the WMO weather code and isDay flag
 * @param code WMO
 * @param isDay Boolean value indicating whether it is during the day
 * @returns Meteocons icon class name
 */
export function getWeatherIcon(code: number, isDay: boolean): string {
  const iconName = iconMap[code as WeatherCode] ?? "not-available";
  return `i-meteocons-${typeof iconName === "function" ? iconName(isDay) : iconName}`;
}