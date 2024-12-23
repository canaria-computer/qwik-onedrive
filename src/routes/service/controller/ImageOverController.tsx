import { component$, Slot, useContext } from "@builder.io/qwik";
import PausePlayButton from "./PausePlayButton";
import Fullscreen from "./Fullscreen";
import PreviousImage from "./previousImage";
import NextImage from "./nextImage";
import Decoration from "./decoration";
import { DecorationPositionCTX, positionSet } from "../store";

const ImageOverController = component$(
  ({ imagesNotSelected }: { imagesNotSelected: boolean }) => {
    const position = useContext(DecorationPositionCTX);
    return (
      <>
        <>
          <div class="static">
            <div>
              <Slot />
            </div>
            {!imagesNotSelected && (
              <div
                class={`absolute mx-1 flex flex-row justify-end ${positionSet[position.value]}`}
              >
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
