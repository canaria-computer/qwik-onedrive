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
              <div class="absolute bottom-0 right-0 mx-1 flex flex-row justify-end">
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
