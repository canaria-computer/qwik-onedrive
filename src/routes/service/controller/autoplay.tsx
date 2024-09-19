import {
  $,
  component$,
  useContext,
  useOnDocument,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { isRunningCTX } from "../slideShowStore";

export default component$(() => {
  const isRunning = useContext(isRunningCTX);
  useOnDocument(
    "DOMContentLoaded",
    $(() => {
      const AUTOPLAY_CONTROL = "autoplay-control";
      const autoplaySaveData = window.localStorage.getItem(AUTOPLAY_CONTROL);
      if (autoplaySaveData === null) {
        window.localStorage.setItem(AUTOPLAY_CONTROL, "false");
      }
      isRunning.value =
        (autoplaySaveData || "false").toLocaleLowerCase() === "true";
    }),
  );
  return (
    <label for="Option1" class="my-2 flex cursor-pointer items-start gap-4">
      <div class="flex items-center">
        <Checkbox />
      </div>

      <div>
        <strong class="font-medium text-gray-900 dark:text-white">
          enable autoplay
        </strong>
      </div>
    </label>
  );
});

const Checkbox = component$(() => {
  const isAutoplayOK = useSignal(false);
  const AUTOPLAY_CONTROL = "autoplay-control";
  useOnDocument(
    "DOMContentLoaded",
    $(() => {
      isAutoplayOK.value =
        window.localStorage.getItem(AUTOPLAY_CONTROL) === "true";
    }),
  );
  useTask$(({ track }) => {
    track(() => isAutoplayOK.value);
    if (isServer) return;
    window.localStorage.setItem(
      AUTOPLAY_CONTROL,
      isAutoplayOK.value.toString(),
    );
  });

  return (
    <input
      type="checkbox"
      id="AcceptConditions"
      class="mr-4 h-6 w-6 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-900"
      bind:checked={isAutoplayOK}
    />
  );
});
