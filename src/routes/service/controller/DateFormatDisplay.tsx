import { component$, useContext, useVisibleTask$, $ } from "@builder.io/qwik";
import { DecorationDateTimeCTX } from "../store";

export default component$(() => {
  const decorationConfig = useContext(DecorationDateTimeCTX);

  // Function to read values from LocalStorage and update state
  const loadFromLocalStorage = $(() => {
    const upFormat = localStorage.getItem("DateTimeFormat-upside") || "";
    const downFormat = localStorage.getItem("DateTimeFormat-underside") || "";
    decorationConfig.updateUpFormatText(upFormat);
    decorationConfig.updateDownFormatText(downFormat);
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

  return (
    <div class="sm:flex sm:space-x-4">
      <div class="mb-4 sm:mb-0 sm:w-1/2">
        <label
          for="DateTimeFormat-upside"
          class="block font-medium text-gray-700 dark:text-gray-200"
        >
          Date Time Format (upside)
        </label>
        <p class="mb-2">
          If there is no input, display the time in the browser settings.
        </p>
        <input
          id="DateTimeFormat-upside"
          class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          type="text"
          name="DateTimeFormat-upside"
          autocomplete="off"
          placeholder="HH:mm"
          spellcheck={false}
          value={decorationConfig.format.up}
          onInput$={(_, el) => {
            const value = el.value;
            decorationConfig.updateUpFormatText(value);
            saveToLocalStorage("DateTimeFormat-upside", value);
          }}
        />
      </div>
      <div class="sm:w-1/2">
        <label
          for="DateTimeFormat-underside"
          class="block font-medium text-gray-700 dark:text-gray-200"
        >
          Date Time Format (underside)
        </label>
        <p class="mb-2">
          If there is no input, display the date in the browser settings.
        </p>
        <input
          id="DateTimeFormat-underside"
          class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          type="text"
          name="DateTimeFormat-underside"
          autocomplete="off"
          placeholder="MM/DD"
          spellcheck={false}
          value={decorationConfig.format.down}
          onInput$={(_, el) => {
            const value = el.value;
            decorationConfig.updateDownFormatText(value);
            saveToLocalStorage("DateTimeFormat-underside", value);
          }}
        />
      </div>
    </div>
  );
});
