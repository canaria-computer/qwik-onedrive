import { component$ } from "@builder.io/qwik";
import { Copyright } from "~/components/footer";

export default component$(() => {
  return (
    <footer class="bg-gray-100 dark:bg-gray-900">
      <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="border-t border-gray-100 p-4">
          <p class="mx-auto max-w-md text-center leading-relaxed text-gray-700 dark:text-gray-200"></p>
          <a
            href="/logout/"
            class="my-2 min-w-max rounded border-2 border-sky-400 p-2 px-4 font-bold hocus:rounded-none hocus:bg-gray-200 hocus:outline-none hocus:ring-2 hocus:ring-black hocus:ring-offset-2 dark:bg-black dark:text-white dark:hocus:rounded-none dark:hocus:bg-gray-800 dark:hocus:outline-none dark:hocus:ring-2 dark:hocus:ring-black dark:hocus:ring-offset-2"
          >
            Logout
          </a>
          <Copyright />
        </div>
      </div>
    </footer>
  );
});
