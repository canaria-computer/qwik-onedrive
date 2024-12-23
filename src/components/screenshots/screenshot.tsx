import { component$ } from "@builder.io/qwik";
import ImgTablet1 from "~/components/screenshots/T_01.png?jsx"; // Tablet Screen Shot Image1 (with clock decoration)
import ImgTablet2 from "~/components/screenshots/T_02.png?jsx"; // Tablet Screen Shot Image2 (without clock decoration)
import ImgTablet3 from "~/components/screenshots/T_03.png?jsx"; // Tablet Screen Shot Image2 (without clock decoration)
import ImgPhone1 from "~/components/screenshots/S_01.png?jsx"; // SmartPhone Screen Shot Image1 (with clock decoration)
import ImgPhone2 from "~/components/screenshots/S_02.png?jsx"; // SmartPhone Screen Shot Image2 (without clock decoration)

export default component$(() => {
  return (
    <div class="relative mt-16 w-full overflow-hidden px-4">
      <div class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 sm:gap-8">
        {/* Tablet View */}
        <div class="relative h-[400px] w-full min-w-[280px] flex-shrink-0 snap-center overflow-hidden rounded-lg shadow-lg sm:min-w-[533px]">
          <div class="h-full w-full">
            <ImgTablet1
              alt="Tablet view with clock decoration"
              class="absolute h-full w-full object-contain transition-opacity duration-300 hover:opacity-0"
            />
            <ImgTablet2
              alt="Tablet view without clock"
              class="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 hover:opacity-100"
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
        <div class="relative h-[400px] w-full min-w-[280px] flex-shrink-0 snap-center overflow-hidden rounded-lg shadow-lg sm:min-w-[266px]">
          <div class="h-full w-full">
            <ImgPhone1
              alt="Phone view with clock decoration"
              class="absolute h-full w-full object-contain transition-opacity duration-300 hover:opacity-0"
            />
            <ImgPhone2
              alt="Phone view without clock"
              class="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 hover:opacity-100"
            />
          </div>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <span class="text-sm text-white">Mobile View</span>
          </div>
        </div>

        {/* Settings View */}
        <div class="relative h-[400px] w-full min-w-[280px] flex-shrink-0 snap-center overflow-hidden rounded-lg shadow-lg sm:min-w-[533px]">
          <div class="h-full w-full">
            <ImgTablet3
              alt="Settings interface"
              class="h-full w-full object-contain"
            />
          </div>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <span class="text-sm text-white">Customizable Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
});
