import { component$, useContext } from "@builder.io/qwik";
import type { PositionKey } from "../store";
import { DecorationPositionCTX, positionSet } from "../store";

export default component$(() => {
  const position = useContext(DecorationPositionCTX);
  const positionKeys = Object.keys(positionSet);
  return (
    <fieldset class="grid grid-cols-2 gap-4 py-1">
      <legend>Decoration display position</legend>

      {positionKeys.map((p) => (
        <div key={p}>
          <label
            for={p}
            class="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
          >
            <div>
              <p class="text-gray-900 dark:text-white">{p}</p>
            </div>

            <input
              type="radio"
              name="clockPosition"
              value={p}
              id={p}
              class="size-5 border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900"
              checked={p === position.value}
              onChange$={(_, el) => {
                const val = el.value as PositionKey;
                if (positionKeys.includes(val)) {
                  position.value = val;
                }
              }}
            />
          </label>
        </div>
      ))}
    </fieldset>
  );
});
