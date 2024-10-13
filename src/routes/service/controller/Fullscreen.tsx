import { $, component$, useOnWindow, useSignal } from "@builder.io/qwik";
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
  return fscreen.fullscreenElement !== undefined ? (
    <>
      <button
        class="m-3 mx-1 rounded-sm bg-gray-800/50 p-2 py-3 shadow-md dark:bg-gray-950/80"
        onClick$={() => {
          if (isFullScreen.value) {
            fscreen.exitFullscreen();
          } else {
            fscreen.requestFullscreen(document.body);
          }
        }}
      >
        <div class="text-center text-2xl font-bold text-white drop-shadow-md [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100">
          {isFullScreen.value ? (
            <div class="i-ic-baseline-fullscreen-exit h-10 w-10 text-center font-bold text-white dark:text-gray-100" />
          ) : (
            <div class="i-ic-baseline-fullscreen h-10 w-10 text-center font-bold text-white dark:text-gray-100" />
          )}
        </div>
      </button>
    </>
  ) : (
    <></>
  );
});
