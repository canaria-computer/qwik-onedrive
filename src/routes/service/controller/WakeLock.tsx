import type { NoSerialize } from "@builder.io/qwik";
import {
  $,
  component$,
  noSerialize,
  useOnWindow,
  useSignal,
} from "@builder.io/qwik";

export default component$(() => {
  const isBrowserSupport = useSignal(true);
  const isKeepScreenOn = useSignal(false);
  const isEnable = useSignal(false);
  const wakeLock = useSignal<NoSerialize<WakeLockSentinel> | null>(null);
  const message = useSignal("");

  const wakeLockStart = $(async () => {
    try {
      const req = await navigator.wakeLock.request("screen");
      console.info(req);
      wakeLock.value = noSerialize(req);
      isEnable.value = true;
    } catch (error) {
      // @ts-expect-error
      message.value = `${err.name}, ${err.message}`;
      isEnable.value = false;
    }
  });

  useOnWindow(
    "DOMContentLoaded",
    $(() => {
      isBrowserSupport.value = "wakeLock" in navigator;
    }),
  );
  useOnWindow(
    "visibilitychange",
    $(() => {
      if (isEnable.value && document.visibilityState === "visible") {
        wakeLockStart();
      }
    }),
  );
  return (
    <>
      {isBrowserSupport.value && (
        <div
          class={`${isKeepScreenOn.value ? "bg-green-200 text-gray-900 dark:bg-green-900 dark:text-white" : ""}`}
        >
          <label
            for="keep-screen-on"
            class="flex cursor-pointer items-start gap-4"
          >
            <div class="flex items-center">
              <input
                type="checkbox"
                class={`mr-4 h-6 w-6 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-900`}
                id="keep-screen-on"
                bind:checked={isEnable}
                onChange$={async () => {
                  if (isEnable.value) {
                    wakeLockStart();
                  } else {
                    wakeLock.value?.release().then(() => {
                      wakeLock.value = null;
                      isEnable.value = false;
                    });
                  }
                }}
              />
            </div>

            <div>
              <strong class="font-medium">Keep screen on</strong>
              <p class="mt-1 text-pretty text-sm">
                Current state:{isEnable.value ? "Enable" : "Disable"}
              </p>
              {message.value !== "" && (
                <p
                  class="mt-1 text-pretty
               bg-red-200 p-1 text-sm text-red-700 dark:bg-red-950 dark:text-white"
                >
                  {message.value}
                </p>
              )}
            </div>
          </label>
        </div>
      )}
    </>
  );
});
