import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <div class="grid h-12 place-content-center bg-white px-4 dark:bg-gray-500">
        <div class="flex items-center justify-center">
          <h1 class="uppercase tracking-widest text-gray-500 dark:text-white">
            <span class="i-ic-baseline-folder-off mx-3 h-5 w-5 " />
            The image is not selected.
          </h1>
        </div>
      </div>
    </>
  );
});
