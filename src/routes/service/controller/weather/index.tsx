import {
  component$,
  useContext,
  useTask$,
  useSignal,
  useResource$,
  Resource,
  $,
  isDev,
} from "@builder.io/qwik";
import { isAutoWeatherDateFetchCTX } from "../../slideShowStore";
import WeatherDataFetcher from "~/utils/openmeteo/config";
import { getWeatherIcon } from "~/utils/openmeteo/mapping";
import type { WeatherData } from "~/utils/openmeteo/config";
import { getPosition } from "~/utils/openmeteo/gelocation";

const TIMEOUTS = {
  clickThrottle: isDev ? 5 * 1000 : 30 * 1000,
  visibilityCheck: isDev ? 15 * 1000 : 60 * 1000,
  autoRefresh: isDev ? 30 * 1000 : 1000 * 60 * 10,
};

export default component$(() => {
  const refreshSignal = useSignal(0);
  const lastUpdateTime = useSignal(Date.now());
  const cachedData = useSignal<WeatherData | null>(null);
  const isAutoWheatherDateFethcOK = useContext(isAutoWeatherDateFetchCTX);

  const weatherData = useResource$<WeatherData>(async ({ track, cleanup }) => {
    track(() => isAutoWheatherDateFethcOK.value);
    track(() => refreshSignal.value);

    const controller = new AbortController();
    cleanup(() => controller.abort());

    if (!isAutoWheatherDateFethcOK.value)
      throw new Error("Auto weather data fetch is disabled");

    const position = await getPosition();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!position) throw new Error("Geolocation is not available");

    const weather = await WeatherDataFetcher(
      position.coords.latitude,
      position.coords.longitude,
    );

    lastUpdateTime.value = Date.now();
    cachedData.value = weather;

    return weather;
  });

  useTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      refreshSignal.value++;
    }, TIMEOUTS.autoRefresh);
    cleanup(() => clearInterval(interval));
  });

  const handleClick = $(() => {
    const now = Date.now();
    if (now - lastUpdateTime.value < TIMEOUTS.clickThrottle) {
      console.log("Update skipped: too frequent");
      return;
    }

    console.log("click", refreshSignal.value);
    refreshSignal.value++;
  });

  const handleVisibilityChange = $(() => {
    if (document.visibilityState === "visible") {
      const now = Date.now();
      if (now - lastUpdateTime.value > TIMEOUTS.visibilityCheck) {
        refreshSignal.value++;
      }
    }
  });

  const renderWeatherContent = (data: WeatherData) => (
    <>
      <div class="m-3 mx-1 block rounded-sm bg-gray-800/50 p-2 py-3 shadow-md focus:invert dark:bg-gray-950/80">
        <div class="text-center font-bold text-white drop-shadow-md [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100"></div>
        <div class="flex items-center justify-center">
          <div
            class={`${getWeatherIcon(data.current.weatherCode, data.current.isDay)} size-12`}
          />
          <div class="ml-1 text-2xl font-bold text-white [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100">
            {Math.round(data.current.temperature2m * 10) / 10}℃
          </div>
        </div>
      </div>

      <div
        class="m-3 mx-1 block rounded-sm bg-[linear-gradient(to_bottom,theme(colors.gray.800/50%)_calc(100%-var(--humidity)),theme(colors.cyan.500/50%)_calc(100%-var(--humidity)))] p-2 py-3 shadow-md focus:invert dark:bg-[linear-gradient(to_bottom,theme(colors.gray.950/80%)_calc(100%-var(--humidity)),theme(colors.cyan.700/50%)_calc(100%-var(--humidity)))]"
        style={`--humidity: ${data.current.relativeHumidity2m}%;`}
      >
        <div class="text-center font-bold text-white drop-shadow-md [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100"></div>
        <div class="flex items-center justify-center">
          <div class="ml-1 text-2xl font-bold text-white [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100">
            {Math.round(data.current.relativeHumidity2m)}
          </div>
          <div class={`i-meteocons-humidity-fill size-12 scale-[175%]`} />
        </div>
      </div>
    </>
  );

  return (
    <>
      {isAutoWheatherDateFethcOK.value && (
        <Resource
          value={weatherData}
          onRejected={() => (
            <>
              <div class="m-3 mx-1 block w-24 overflow-hidden rounded-sm bg-orange-400/50 shadow-md focus:invert dark:bg-orange-600/80">
                <div class="flex h-full items-center justify-center">
                  <span class="i-ic-baseline-error size-10" />
                  <span class="sr-only">
                    Error: Failed to fetch weather data
                  </span>
                </div>
              </div>
            </>
          )}
          onPending={() => {
            if (!cachedData.value) {
              return (
                <>
                  <div class="m-3 mx-1 block w-24 overflow-hidden rounded-sm bg-gray-800/50 shadow-md focus:invert dark:bg-gray-950/80">
                    <div class="h-1 w-full animate-slidein bg-sky-500" />
                    <div class="flex h-full items-center justify-center">
                      <span class="i-svg-spinners-3-dots-fade size-10" />
                    </div>
                  </div>
                </>
              );
            }

            return (
              <button
                class="flex"
                onClick$={handleClick}
                onVisibilityChange$={handleVisibilityChange}
              >
                {renderWeatherContent(cachedData.value)}
              </button>
            );
          }}
          onResolved={(data) => (
            <button
              class="flex"
              onClick$={handleClick}
              onVisibilityChange$={handleVisibilityChange}
            >
              {renderWeatherContent(data)}
            </button>
          )}
        />
      )}
    </>
  );
});
