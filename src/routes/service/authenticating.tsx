import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <div class="overflow-hidden">
        <div class="animate-slidein left-0 right-0 top-0 mt-1 h-1 bg-blue-800 shadow-sm dark:bg-sky-400">
          <div class="absolute h-full bg-white" />
        </div>
      </div>
      <div class="grid h-12 place-content-center bg-white px-4 dark:bg-gray-500">
        <div class="flex items-center justify-center">
          <div class="uppercase tracking-widest text-gray-500 dark:text-white">
            <span class="i-ic-baseline-person mx-3 h-5 w-5 " />
            Authenticating
          </div>
        </div>
      </div>
    </>
  );
});
