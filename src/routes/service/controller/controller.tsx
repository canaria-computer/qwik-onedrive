import { component$, isDev } from "@builder.io/qwik";
import SwitchIntervalController from "./SwitchIntervalController";
import Autoplay from "./autoplay";
import WakeLock from "./WakeLock";
import DateFormatDisplay from "./DateFormatDisplay";
import DecorationPosition from "./decorationPosition";
import WeatherInfo from "./weather/weatherInfo";

export default component$(() => {
  return (
    <div class="container mx-auto max-w-6xl p-4">
      <details
        class="group overflow-hidden rounded-lg shadow-md ring-2 ring-slate-500"
        open={isDev}
      >
        <summary class="flex cursor-pointer items-center justify-between bg-gray-100 p-3 text-lg font-semibold text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
          <span class="flex items-center">
            <i class="i-ic-settings mr-2 text-2xl" />
            Application Settings
          </span>
          <i class="i-ic-expand-more text-2xl transition-transform group-open:rotate-180" />
        </summary>
        <div class="space-y-6 bg-inherit p-2">
          <SwitchIntervalController />
          <DecorationPosition />
          <Autoplay />
          <WakeLock />
          <DateFormatDisplay />
          <WeatherInfo />
        </div>
      </details>
    </div>
  );
});
