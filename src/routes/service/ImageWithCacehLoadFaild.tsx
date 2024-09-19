import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <div
        role="alert"
        class="mx-2 rounded border-s-4 border-red-500 bg-red-50 p-4 dark:border-red-600 dark:bg-red-900"
      >
        <div class="flex items-center gap-2 text-red-800 dark:text-red-100">
          <span class="i-ic-baseline-warning" />
          <strong class="block font-medium">Data load failed</strong>
        </div>
        <p class="mt-2 text-sm text-red-700 dark:text-red-200">
          Data reading failed.There is a possibility that it will be resolved by
          re-login.
        </p>
      </div>
    </>
  );
});
