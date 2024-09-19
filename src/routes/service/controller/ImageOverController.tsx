import {
  $,
  component$,
  noSerialize,
  Slot,
  useOnDocument,
  useSignal,
} from "@builder.io/qwik";
import dayjs from "dayjs";
import PausePlayButton from "./PausePlayButton";
import Fullscreen from "./Fullscreen";
import PreviousImage from "./previousImage";
import NextImage from "./nextImage";

const ImageOverController = component$(
  ({ imagesNotSelected }: { imagesNotSelected: boolean }) => {
    // dayjs.extend(advancedFormat);
    // dayjs.extend(weekOfYear);
    // dayjs.extend(IsoWeek);
    // dayjs.extend(WeekYear);
    // dayjs.extend(Timezone);
    const formatUp = "MM-DD";
    const formatDown = "HH:mm:ss";
    const time = useSignal(noSerialize(dayjs()));
    useOnDocument(
      "DOMContentLoaded",
      $(() => {
        setInterval(() => {
          time.value = noSerialize(dayjs());
        }, 1000);
      }),
    );
    return (
      <>
        <>
          <div class="static">
            <div>
              <Slot />
            </div>
            {!imagesNotSelected && (
              <div class="justify-endbg-red-500 absolute bottom-0 right-0 m-5 flex flex-row">
                <div class="m-3 mx-1 rounded-sm bg-gray-800/50 p-2 px-7 shadow-md dark:bg-gray-950/80">
                  <div class="text-center text-2xl font-bold text-white drop-shadow-md [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100">
                    {time.value?.format(formatUp)}
                  </div>
                  <div class="text-center text-sm font-bold text-white [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100">
                    {time.value?.format(formatDown)}
                  </div>
                </div>
                <PreviousImage />
                <PausePlayButton />
                <NextImage />
                <Fullscreen />
              </div>
            )}
          </div>
        </>
      </>
    );
  },
);

export default ImageOverController;
