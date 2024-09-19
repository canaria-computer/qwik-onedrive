import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <div class="flex h-[50dvh] items-center justify-center p-2">
        <div class="i-svg-spinners-pulse-multiple h-20 w-20" />
        <span class="sr-only">Loading the image.</span>
      </div>
    </>
  );
});
