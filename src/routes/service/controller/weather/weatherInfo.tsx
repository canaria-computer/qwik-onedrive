import {
  $,
  component$,
  useContext,
  useOnDocument,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { isAutoWeatherDateFetchCTX } from "../../slideShowStore";

export default component$(() => {
  const isAutoWheatherDateFethcOK = useContext(isAutoWeatherDateFetchCTX);
  useOnDocument(
    "DOMContentLoaded",
    $(() => {
      const WEATHER_CONTROL = "weather-control";
      const weatherPermissionSaveData =
        window.localStorage.getItem(WEATHER_CONTROL);
      if (weatherPermissionSaveData === null) {
        window.localStorage.setItem(WEATHER_CONTROL, "false");
      }
      isAutoWheatherDateFethcOK.value =
        (weatherPermissionSaveData || "false").toLowerCase() === "true";
    }),
  );
  return (
    <label
      for="IsAutoWheatherDateFethc"
      class="my-2 flex cursor-pointer items-start gap-4"
    >
      <div class="flex items-center">
        <Checkbox />
      </div>

      <div>
        <strong class="font-medium text-gray-900 dark:text-white">
          enable Weather Information
        </strong>
      </div>
    </label>
  );
});

const Checkbox = component$(() => {
  const isAutoWheatherDateFethcOK = useContext(isAutoWeatherDateFetchCTX);
  const autoWeatherDataFetchEnabled = useSignal(false);
  const WEATHER_CONTROL = "weather-control";
  useOnDocument(
    "DOMContentLoaded",
    $(() => {
      autoWeatherDataFetchEnabled.value =
        window.localStorage.getItem(WEATHER_CONTROL) === "true";
    }),
  );
  useTask$(({ track }) => {
    track(() => autoWeatherDataFetchEnabled.value);
    if (isServer) return;
    window.localStorage.setItem(
      WEATHER_CONTROL,
      autoWeatherDataFetchEnabled.value.toString(),
    );
    isAutoWheatherDateFethcOK.value = autoWeatherDataFetchEnabled.value;
  });

  return (
    <input
      type="checkbox"
      id="IsAutoWheatherDateFethc"
      class="mr-4 h-6 w-6 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-900"
      bind:checked={autoWeatherDataFetchEnabled}
    />
  );
});
