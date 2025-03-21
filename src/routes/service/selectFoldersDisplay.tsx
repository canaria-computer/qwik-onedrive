import * as s from "superstruct";
import { component$, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { SlectedFolderIdsCTX, SelectedFolders } from "./store";

export const SelectFoldersDisplay = component$(() => {
  const localStorageId = "selectedFolders";
  const selectFolders = useContext(SlectedFolderIdsCTX);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const list = window.localStorage.getItem(localStorageId) || "{}";
    const data = JSON.parse(list);
    if (s.is(data, s.array(SelectedFolders))) {
      selectFolders.value = data;
    }
  });
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => selectFolders.value);
    window.localStorage.setItem(
      localStorageId,
      JSON.stringify(selectFolders.value),
    );
  });
  return (
    <details class="m-1 border">
      <summary class="m-1 p-1">
        Selecting {selectFolders.value.length} folders
      </summary>
      <ul>
        {selectFolders.value.map((v) => (
          <li class="ml-4 p-1 before:content-['_-_']" key={v.id}>
            {v.name}
          </li>
        ))}
      </ul>
    </details>
  );
});
