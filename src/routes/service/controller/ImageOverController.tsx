import { component$, Slot } from "@builder.io/qwik";
import PausePlayButton from "./PausePlayButton";
import Fullscreen from "./Fullscreen";
import PreviousImage from "./previousImage";
import NextImage from "./nextImage";
import Decoration from "./decoration";

const ImageOverController = component$(
  ({ imagesNotSelected }: { imagesNotSelected: boolean }) => {
    return (
      <>
        <>
          <div class="static">
            <div>
              <Slot />
            </div>
            {!imagesNotSelected && (
              <div class="justify-endbg-red-500 absolute bottom-0 right-0 m-5 flex flex-row">
                <Decoration />
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
