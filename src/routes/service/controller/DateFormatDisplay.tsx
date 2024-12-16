import { component$, useContext, useVisibleTask$, $ } from "@builder.io/qwik";
import { DecorationDateTimeCTX } from "../store";

export default component$(() => {
  const decorationConfig = useContext(DecorationDateTimeCTX);

  // Function to read values from LocalStorage and update state
  const loadFromLocalStorage = $(() => {
    const upFormat = localStorage.getItem("DateTimeFormat-upside") || "";
    const downFormat = localStorage.getItem("DateTimeFormat-underside") || "";
    const isEnable = localStorage.getItem("DateTimeDecorator-enable");
    decorationConfig.updateUpFormatText(upFormat);
    decorationConfig.updateDownFormatText(downFormat);
    decorationConfig.updateEnable(isEnable === "true");
  });

  // Function to store values in LocalStorage
  const saveToLocalStorage = $((key: string, value: string) => {
    localStorage.setItem(key, value);
  });

  // Run once when the component is mounted
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    loadFromLocalStorage();
  });

  const dateTimeFormatList = [
    "YYYY-MM-DD",
    "MM/DD/YYYY",
    "DD/MM/YYYY",
    "MMMM D, YYYY",
    "D MMM YYYY",
    "MM-DD-YYYY",
    "YYYY/MM/DD",
    "MM/DD",
    "HH:mm",
    "HH:mm:ss",
    "",
  ];

  return (
    <div class="sm:flex sm:flex-col">
      <div class="flex items-center">
        <input
          id="enable-datetime-format"
          type="checkbox"
          class="mr-4 h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
          checked={decorationConfig.isEnable}
          onChange$={(_, el) => {
            const value = el.checked;
            decorationConfig.updateEnable(value);
            saveToLocalStorage("DateTimeDecorator-enable", value.toString());
          }}
        />
        <label
          for="enable-datetime-format"
          class="ml-2 pb-1 font-medium text-gray-900 dark:text-gray-100"
        >
          Enable decoration display
        </label>
      </div>

      <div class="ml-2 sm:flex sm:space-x-4">
        <div class="border-l-2 pl-2 sm:mb-0 sm:w-1/2">
          <label
            for="DateTimeFormat-upside"
            class="block font-medium text-gray-900 dark:text-gray-100"
          >
            Date Time Format (upside)
          </label>
          <p class="mb-2 text-gray-700 dark:text-gray-300">
            If there is no input, display the time in the browser settings.
          </p>
          <input
            id="DateTimeFormat-upside"
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500  focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white  dark:disabled:bg-gray-800 dark:disabled:text-gray-400"
            type="text"
            name="DateTimeFormat-upside"
            // @ts-ignore
            list="DateTimeFormat-upside-datalist"
            autocomplete="off"
            placeholder="HH:mm"
            spellcheck={false}
            value={decorationConfig.format.up}
            onInput$={(_, el) => {
              const value = el.value;
              decorationConfig.updateUpFormatText(value);
              saveToLocalStorage("DateTimeFormat-upside", value);
            }}
            disabled={!decorationConfig.isEnable}
          />
          <datalist id="DateTimeFormat-upside-datalist">
            {dateTimeFormatList.map((f, i) => (
              <option key={i} value={f} />
            ))}
          </datalist>
        </div>
        <div class="border-l-2 pl-2 sm:w-1/2 sm:border-0">
          <label
            for="DateTimeFormat-underside"
            class="block font-medium text-gray-900 dark:text-gray-100"
          >
            Date Time Format (underside)
          </label>
          <p class="mb-2 text-gray-700 dark:text-gray-300">
            If there is no input, display the date in the browser settings.
          </p>
          <input
            id="DateTimeFormat-underside"
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500  focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white  dark:disabled:bg-gray-800 dark:disabled:text-gray-400"
            type="text"
            name="DateTimeFormat-underside"
            autocomplete="off"
            placeholder="MM/DD"
            // @ts-ignore
            list="DateTimeFormat-upside-datalist"
            spellcheck={false}
            value={decorationConfig.format.down}
            onInput$={(_, el) => {
              const value = el.value;
              decorationConfig.updateDownFormatText(value);
              saveToLocalStorage("DateTimeFormat-underside", value);
            }}
            disabled={!decorationConfig.isEnable}
          />
        </div>
      </div>
    </div>
  );
});
