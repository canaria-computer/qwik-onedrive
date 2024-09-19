import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <div class="min-h-screen dark:bg-slate-900 dark:text-white">
        <div class="max-w-screen  p-10 md:prose-lg lg:prose-xl">
          <div class="prose mx-auto dark:prose-invert">
            <Slot />
          </div>
        </div>
      </div>
    </>
  );
});
