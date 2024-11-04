import { component$, useContext, $, useOnDocument } from "@builder.io/qwik";
import { currentImageIndexCTX, imageLengthCTX } from "../slideShowStore";

export default component$(() => {
  const currentImageIndex = useContext(currentImageIndexCTX);
  const imageLength = useContext(imageLengthCTX);
  const clickHandler = $(() => {
    currentImageIndex.value =
      (currentImageIndex.value + 1 + imageLength.value) % imageLength.value;
  });
  useOnDocument(
    "keypress",
    $((event) => {
      if (event.key === "n") {
        clickHandler();
      }
    }),
  );
  return (
    <>
      <button
        class="m-3 mx-1 rounded-sm bg-gray-800/50 p-2 py-3 shadow-md dark:bg-gray-950/80"
        onClick$={clickHandler}
      >
        <div class="text-center text-2xl font-bold text-white drop-shadow-md [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100">
          <div class="i-ic-skip-next h-10 w-10 text-center font-bold text-white dark:text-gray-100" />
        </div>
        <span class="sr-only">Next Image</span>
      </button>
    </>
  );
});
