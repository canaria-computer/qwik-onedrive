import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <header class="dark:bg-slate-900">
      <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex-1 md:flex md:items-center md:gap-12">
            <Link class="block text-teal-800 dark:text-white" href="/">
              <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
                GDPF App 📸🎞️
              </h1>
            </Link>
          </div>

          <>
            <div>
              <a
                class="hocus:rounded-none hocus:bg-gray-50 hocus:outline-none hocus:ring-2 hocus:ring-black hocus:ring-offset-2 dark:hocus:rounded-none dark:hocus:bg-gray-800 dark:hocus:outline-none dark:hocus:ring-2 dark:hocus:ring-black dark:hocus:ring-offset-2 inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-gray-900/10 transition duration-150 ease-in-out dark:bg-black dark:text-white"
                href="/service"
              >
                <span class="i-logos-microsoft-icon m-1 mx-1 h-5 w-5 bg-white p-1" />
                Login
              </a>
            </div>
          </>
        </div>
      </div>
    </header>
  );
});
