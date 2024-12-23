import {
  $,
  component$,
  useOnDocument,
  useOnWindow,
  useSignal,
} from "@builder.io/qwik";
import fscreen from "fscreen";

export default component$(() => {
  const isFullScreen = useSignal(false);
  useOnWindow(
    "fullscreenchange",
    $(() => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (fscreen.fullscreenElement !== null) {
        isFullScreen.value = true;
      } else {
        isFullScreen.value = false;
      }
    }),
  );

  const toggleFullScreen = $(() => {
    if (isFullScreen.value) {
      fscreen.exitFullscreen();
    } else {
      fscreen.requestFullscreen(document.body);
    }
  });

  useOnDocument(
    "keydown",
    $((event) => {
      if (event.key.toLowerCase() === "f" && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        toggleFullScreen();
      }
    }),
  );

  return fscreen.fullscreenElement !== undefined ? (
    <div class="group relative inline-block">
      <button
        class="m-3 mx-1 rounded-sm bg-gray-800/50 p-2 py-3 shadow-md focus:invert dark:bg-gray-950/80"
        onClick$={toggleFullScreen}
      >
        <div class="text-center text-2xl font-bold text-white drop-shadow-md [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100">
          {isFullScreen.value ? (
            <div class="i-ic-baseline-fullscreen-exit h-10 w-10 text-center font-bold text-white dark:text-gray-100" />
          ) : (
            <div class="i-ic-baseline-fullscreen h-10 w-10 text-center font-bold text-white dark:text-gray-100" />
          )}
        </div>
        <span class="sr-only">
          {isFullScreen.value ? "Exit Fullscreen" : "Enter Fullscreen"}
        </span>
      </button>
      <div
        class="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 md:group-focus-within:block md:group-hover:block"
        role="tooltip"
      >
        <div class="whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white">
          <span>shortcut key:</span>
          <kbd class="rounded px-2 py-1.5 text-sm">F</kbd>
        </div>
        <div class="absolute left-1/2 top-full -mt-1.5 h-3 w-3 -translate-x-1/2 rotate-45 bg-gray-800"></div>
      </div>
    </div>
  ) : (
    <></>
  );
});
