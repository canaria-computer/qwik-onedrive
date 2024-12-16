import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="m-3 mx-1 block rounded-sm bg-gray-800/50 p-2 py-3 shadow-md focus:invert dark:bg-gray-950/80">
      <div class="text-center font-bold text-white drop-shadow-md [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100"></div>
      <div class="flex items-center justify-center">
        <div class="i-meteocons-hail-fill size-10" />
        <span class="sr-only"></span>
        <div class="ml-1 text-sm font-bold text-white [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100">
          20
        </div>
      </div>
    </div>
  );
});
