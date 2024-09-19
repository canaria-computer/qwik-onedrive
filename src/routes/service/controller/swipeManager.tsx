import {
  $,
  component$,
  Slot,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import TinyGesture from "tinygesture";
import { currentImageIndexCTX, imageLengthCTX } from "../slideShowStore";

export default component$(() => {
  const currentImageIndex = useContext(currentImageIndexCTX);
  const imageLength = useContext(imageLengthCTX);
  const swipeleftHandler = $(() => {
    currentImageIndex.value =
      (currentImageIndex.value - 1 + imageLength.value) % imageLength.value;
  });
  const swiperightHandler = $(() => {
    currentImageIndex.value =
      (currentImageIndex.value + 1 + imageLength.value) % imageLength.value;
  });
  // ---
  const elementRef = useSignal<Element>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    if (elementRef.value) {
      // @ts-expect-error
      const gesture = new TinyGesture(elementRef.value);

      gesture.on("swiperight", () => {
        swipeleftHandler();
      });

      gesture.on("swipeleft", () => {
        swiperightHandler();
      });

      cleanup(() => {
        // Clean up the gesture listener if needed
        gesture.destroy();
      });
    }
  });

  return (
    <div ref={elementRef}>
      <Slot />
    </div>
  );
});
