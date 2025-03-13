import { component$, useContext, useTask$, useSignal, useResource$, Resource, useOnDocument, $, isDev } from "@builder.io/qwik";
import { isAutoWeatherDateFetchCTX } from "../../slideShowStore";
import WeatherDataFetcher from "~/utils/openmeteo/config";
import { getWeatherIcon } from "~/utils/openmeteo/mapping";
import type { WeatherData } from "~/utils/openmeteo/config";
import { getPosition } from "~/utils/openmeteo/gelocation";

export default component$(() => {
  const refreshSignal = useSignal(0);
  const isAutoWheatherDateFethcOK = useContext(isAutoWeatherDateFetchCTX);
  const weatherData = useResource$<WeatherData>(
    async ({ track, cleanup }) => {
      track(() => isAutoWheatherDateFethcOK.value);
      const controller = new AbortController();
      cleanup(() => controller.abort());

      const position = await getPosition()
      if (!position) throw new Error("Geolocation is not available");
      const weather = await WeatherDataFetcher(
        position.coords.latitude,
        position.coords.longitude,
      );

      return weather;
    }
  )

  useTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      refreshSignal.value++;
    }, isDev ? 30 * 1000 : 1000 * 60 * 10);
    cleanup(() => clearInterval(interval));
  })

  useOnDocument("visibilitychange", $(() => {
    if (document.visibilityState === 'visible') {
      refreshSignal.value++;
    }
  }))


  return (
    <>
      <Resource value={weatherData}
        onRejected={() => (<></>)}
        onPending={() => (<></>)}
        onResolved={(weatherData) => {
          return (
            <>
              <div class="m-3 mx-1 block rounded-sm bg-gray-800/50 p-2 py-3 shadow-md focus:invert dark:bg-gray-950/80">
                <div class="text-center font-bold text-white drop-shadow-md [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100"></div>
                <div class="flex items-center justify-center">
                  <div class={`${getWeatherIcon(weatherData.current.weatherCode, weatherData.current.isDay)} size-12`} />
                  <div class="ml-1 text-2xl font-bold text-white [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100">
                    {Math.round(weatherData.current.temperature2m * 10) / 10}℃
                  </div>
                </div>
              </div>

              <div
                class="m-3 mx-1 block rounded-sm p-2 py-3 shadow-md focus:invert bg-[linear-gradient(to_bottom,theme(colors.gray.800/50)_calc(100%-var(--humidity)),theme(colors.cyan.500/50)_calc(100%-var(--humidity)))] dark:bg-[linear-gradient(to_bottom,theme(colors.gray.950/80)_calc(100%-var(--humidity)),theme(colors.cyan.700/50)_calc(100%-var(--humidity)))]"
                style={`--humidity: ${weatherData.current.relativeHumidity2m}%;`}
              >
                <div class="text-center font-bold text-white drop-shadow-md [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100"></div>
                <div class="flex items-center justify-center">
                  <div class="ml-1 text-2xl font-bold text-white [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100">
                    {Math.round(weatherData.current.relativeHumidity2m)}
                  </div>
                  <div class={`i-meteocons-humidity-fill size-12 scale-[175%]`} />
                </div>
              </div>
            </>
          )
        }} />

    </>
  );
});
