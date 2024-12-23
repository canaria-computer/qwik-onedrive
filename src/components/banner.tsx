import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Screenshot from "./screenshots/screenshot";

export default component$(() => {
  return (
    <>
      <section class="min-h-fit items-center bg-amber-50 text-black dark:bg-gray-700 dark:text-white">
        <div class="m-0 mx-auto flex max-w-screen-xl flex-col items-center lg:h-full">
          {/* Hero Section */}
          <div class="mx-auto max-w-3xl text-center">
            <h1 class="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl dark:from-green-300 dark:via-blue-500 dark:to-fuchsia-300">
              <span class="block">Your frame, available.</span>
              <span class="mt-2 block sm:mt-4">Ad-free, charge-free app.</span>
            </h1>
            <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              OneDrive integration meets the digital photo frame - a match made
              for your memories
            </p>
            <div class="mt-8 flex justify-center">
              <ul class="flex flex-col gap-4 sm:flex-row">
                <li>
                  <a
                    href={"/service/"}
                    class="block rounded bg-yellow-400 px-8 py-3 text-sm font-semibold text-black shadow-sm ring-1 ring-yellow-950/10 transition duration-150 ease-in-out hover:rounded-none hover:bg-yellow-500 focus:rounded-none focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2"
                  >
                    Start & Connect OneDrive
                  </a>
                </li>
                <li>
                  <Link
                    class="block rounded bg-sky-400 px-8 py-3 text-sm font-semibold text-black shadow-sm ring-1 ring-sky-950/10 transition duration-150 ease-in-out hover:rounded-none hover:bg-sky-500 focus:rounded-none focus:outline-none focus:ring-2 focus:ring-sky-700 focus:ring-offset-2"
                    href="/about"
                  >
                    Learn About Our App
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Screenshot />
        </div>
      </section>
    </>
  );
});
