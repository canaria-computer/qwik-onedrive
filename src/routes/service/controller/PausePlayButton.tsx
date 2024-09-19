import { component$, useContext, $, useOnDocument } from "@builder.io/qwik";
import { isRunningCTX } from "../slideShowStore";

const PausePlayButton = component$(() => {
  const isRunning = useContext(isRunningCTX);
  const clickHandler = $(() => {
    isRunning.value = !isRunning.value;
  });
  useOnDocument(
    "keypress",
    $((event) => {
      if (event.key === "k") {
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
          {isRunning.value ? (
            <div class="i-ic-pause h-10 w-10 text-center font-bold text-white dark:text-gray-100" />
          ) : (
            <div class="i-ic-play-arrow h-10 w-10 text-center font-bold text-white dark:text-gray-100" />
          )}
        </div>
      </button>
    </>
  );
});

export default PausePlayButton;
