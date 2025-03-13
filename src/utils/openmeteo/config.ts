import { isDev } from "@builder.io/qwik";
import { fetchWeatherApi } from "openmeteo";

export type WeatherData = {
  current: {
    time: Date;
    temperature2m: number;
    relativeHumidity2m: number;
    isDay: boolean;
    weatherCode: number;
  };
};

const API_URL = "https://api.open-meteo.com/v1/forecast";

export default async function WeatherDataFetcher(
  latitude: number,
  longitude: number,
): Promise<WeatherData> {
  const param = {
    latitude: [latitude],
    longitude: [longitude],
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "is_day",
      "weather_code",
    ],
    timezone: "auto",
    forecast_days: 1,
  };

  const responses = await fetchWeatherApi(API_URL, param);
  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;
  // *Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData: WeatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      relativeHumidity2m: current.variables(1)!.value(),
      isDay: !!current.variables(2)!.value(),
      weatherCode: current.variables(3)!.value(),
    },
  };
  isDev && console.debug("weatherData", weatherData);
  return weatherData;
}

export const tailwindWeatherIconSafeList = {
  pattern: /^i-meteocons-/,
  variants: ["dark"],
};
