import { component$ } from "@builder.io/qwik";

export default component$(() => (
  <section class="bg-amber-50 text-black dark:bg-gray-700 dark:text-white">
    <div class="grid gap-8 text-center sm:grid-cols-3">
      <div class="p-4">
        <span class="i-material-symbols-cloud-done text-3xl text-amber-500" />
        <h3 class="text-lg font-semibold">OneDrive Integration</h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Seamlessly connect with your OneDrive photos
        </p>
      </div>
      <div class="p-4">
        <span class="i-material-symbols-slideshow text-3xl text-amber-500" />
        <h3 class="text-lg font-semibold">Auto Slideshow</h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Customizable transition times and effects
        </p>
      </div>
      <div class="p-4">
        <span class="i-material-symbols-visibility text-3xl text-amber-500" />
        <h3 class="text-lg font-semibold">Always On Display</h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Keep your memories visible with screen-on mode
        </p>
      </div>
    </div>
  </section>
));
