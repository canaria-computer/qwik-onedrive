import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import ImgTablet1 from "~/components/screenshots/T_01.png?jsx"; // Tablet Screen Shot Image1 (with clock decoration)
import ImgTablet2 from "~/components/screenshots/T_02.png?jsx"; // Tablet Screen Shot Image2 (without clock decoration)
import ImgTablet3 from "~/components/screenshots/T_03.png?jsx"; // Tablet Screen Shot Image2 (without clock decoration)
import ImgPhone1 from "~/components/screenshots/S_01.png?jsx"; // SmartPhone Screen Shot Image1 (with clock decoration)
import ImgPhone2 from "~/components/screenshots/S_02.png?jsx"; // SmartPhone Screen Shot Image2 (without clock decoration)

export default component$(() => {
  return (
    <>
      <section class="min-h-fit items-center bg-amber-50 text-black dark:bg-gray-700 dark:text-white">
        <div class="m-0 mx-auto flex max-w-screen-xl flex-col items-center py-16 lg:h-full">
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

          {/* Screenshot Section */}
          <div class="relative mt-16 w-full overflow-hidden">
            <div class="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-6">
              {/* Tablet View */}
              <div class="relative h-[400px] min-w-[533px] flex-shrink-0 snap-center overflow-hidden rounded-lg shadow-lg">
                <div class="h-full w-full">
                  <ImgTablet1
                    alt="Tablet view with clock decoration"
                    class="absolute h-full w-[533px] max-w-full object-contain transition-opacity duration-300 hover:opacity-0"
                  />
                  <ImgTablet2
                    alt="Tablet view without clock"
                    class="absolute inset-0 h-full w-[533px] max-w-full object-contain opacity-0 transition-opacity duration-300 hover:opacity-100"
                  />
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div class="flex items-center justify-between text-white">
                    <span class="text-sm">Tablet View</span>
                    <span class="i-material-symbols-swipe-left text-lg opacity-75 sm:hidden"></span>
                  </div>
                </div>
              </div>

              {/* Mobile View */}
              <div class="relative h-[400px] min-w-[266px] flex-shrink-0 snap-center overflow-hidden rounded-lg shadow-lg">
                <div class="h-full w-full">
                  <ImgPhone1
                    alt="Phone view with clock decoration"
                    class="absolute h-full w-[266px] max-w-full object-contain transition-opacity duration-300 hover:opacity-0"
                  />
                  <ImgPhone2
                    alt="Phone view without clock"
                    class="absolute inset-0 h-full w-[266px] max-w-full object-contain opacity-0 transition-opacity duration-300 hover:opacity-100"
                  />
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span class="text-sm text-white">Mobile View</span>
                </div>
              </div>

              {/* Settings View */}
              <div class="relative h-[400px] min-w-[533px] flex-shrink-0 snap-center overflow-hidden rounded-lg shadow-lg">
                <div class="h-full w-full">
                  <ImgTablet3
                    alt="Settings interface"
                    class="h-full w-[533px] max-w-full object-contain"
                  />
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span class="text-sm text-white">Customizable Settings</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div class="mt-16 grid gap-8 text-center sm:grid-cols-3">
            <div class="p-4">
              <span class="i-material-symbols-cloud-done text-3xl text-amber-500"></span>
              <h3 class="text-lg font-semibold">OneDrive Integration</h3>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Seamlessly connect with your OneDrive photos
              </p>
            </div>
            <div class="p-4">
              <span class="i-material-symbols-slideshow text-3xl text-amber-500"></span>
              <h3 class="text-lg font-semibold">Auto Slideshow</h3>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Customizable transition times and effects
              </p>
            </div>
            <div class="p-4">
              <span class="i-material-symbols-visibility text-3xl text-amber-500"></span>
              <h3 class="text-lg font-semibold">Always On Display</h3>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Keep your memories visible with screen-on mode
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});
