import type { NoSerialize } from "@builder.io/qwik";
import {
  $,
  component$,
  noSerialize,
  useContext,
  useOnWindow,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import {
  animationTransitionTimeCTX,
  switchIntervalCTX,
} from "../slideShowStore";
import { useDebouncer } from "~/utils/debouncer";
import { isServer } from "@builder.io/qwik/build";

export default component$(() => {
  const switchInterval = useContext(switchIntervalCTX);
  const animationTransitionTime = useContext(animationTransitionTimeCTX);
  const debounce = useDebouncer(
    $((value: string) => {
      const correction = Math.max(parseInt(value), 5000);
      switchInterval.setInterval(correction);
    }),
    1500,
  );
  // const currentImageIndex = useContext(currentImageIndexCTX);
  // const channel = useContext(channelCTX);
  // const switchImage = $((nextIndex: number, isManual: boolean) => {
  //   currentImageIndex.value = nextIndex;
  //   channel.value?.postMessage({
  //     type: "SWITCH_IMAGE",
  //     index: nextIndex,
  //     manual: isManual,
  //   });
  // });

  useOnWindow(
    "DOMContentLoaded",
    $(() => {
      if (window.localStorage.getItem(switchIntervalCTX.id) === null) {
        window.localStorage.setItem(
          switchIntervalCTX.id,
          switchInterval.interval.toString(),
        );
      } else {
        const read = parseInt(
          window.localStorage.getItem(switchIntervalCTX.id) || "",
        );
        if (Number.isNaN(read)) return;
        switchInterval.setInterval(read);
      }
    }),
  );
  useTask$(async ({ track }) => {
    track(() => switchInterval.interval);
    if (isServer) return;
    window.localStorage.setItem(
      switchIntervalCTX.id,
      await switchInterval.getIntervalString(),
    );
  });
  const switchIntervalSyncCh = useSignal<NoSerialize<BroadcastChannel> | null>(
    null,
  );
  useTask$(async ({ track, cleanup }) => {
    track(() => switchInterval.interval);
    if (isServer) return;
    const newChannel = new BroadcastChannel("switchInterval");
    switchIntervalSyncCh.value = noSerialize(newChannel);
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "SWITCH_INTERVAL") {
        const resiveInterval = parseInt(event.data.value);
        if (!Number.isNaN(resiveInterval)) {
          switchInterval.setInterval(resiveInterval);
        }
      }
    };
    newChannel.addEventListener("message", handleMessage);

    cleanup(() => {
      newChannel.removeEventListener("message", handleMessage);
      newChannel.close();
    });
  });

  const prefersReducedMotion = useSignal(false);
  useOnWindow(
    "DOMContentLoaded",
    $(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      prefersReducedMotion.value = mediaQuery.matches;

      const handleChange = (event: { matches: boolean }) => {
        prefersReducedMotion.value = event.matches;
      };

      mediaQuery.addEventListener("change", handleChange);

      // Cleanup function to remove the event listener when the component is unmounted
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }),
  );

  return (
    <div>
      <label
        for="SwithInterval"
        class="block font-medium text-gray-700 dark:text-gray-200"
      >
        SwithInterval
      </label>
      <input
        id="SwithInterval"
        class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        type="number"
        name="SwithInterval"
        min={5000}
        step={1000}
        value={switchInterval.interval}
        autocomplete="off"
        onInput$={(_, target) => {
          debounce(target.value);
          switchIntervalSyncCh.value?.postMessage({
            type: "SWITCH_INTERVAL",
            value: target.value,
          });
        }}
      />
      {prefersReducedMotion.value && switchInterval.interval < 10000 && (
        <p class="mt-2 text-orange-700 dark:text-orange-300">
          Warning: The switch interval is short and reduced motion is enabled.
          This may affect user experience.
        </p>
      )}

      <label
        for="Animation-transition-time"
        class={`block font-medium text-gray-700 dark:text-gray-200 ${prefersReducedMotion.value ? "opacity-50" : ""}`}
      >
        Animation Transition Time
      </label>
      <input
        id="Animation-transition-time"
        class={`mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm motion-reduce:disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-white ${prefersReducedMotion.value ? "opacity-50" : ""}`}
        type="number"
        name="Animation-transition-time"
        min={-10}
        max={10 * 1000}
        step={10}
        value={animationTransitionTime.value}
        defaultValue="1000"
        autocomplete="off"
        onInput$={(_, target) => {
          const inputVal = parseInt(target.value);
          animationTransitionTime.value = Number.isNaN(inputVal)
            ? 1000
            : inputVal;
        }}
        disabled={prefersReducedMotion.value}
      />
      {prefersReducedMotion.value && (
        <p class="mt-2 text-gray-700 dark:text-gray-300">
          Animation transition time is ignored due to reduced motion settings.
        </p>
      )}
    </div>
  );
});
