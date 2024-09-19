import {
  component$,
  useContext,
  useResource$,
  Resource,
  noSerialize,
  useSignal,
} from "@builder.io/qwik";
import type { DriveItem } from "@microsoft/microsoft-graph-types";
import { Client } from "@microsoft/microsoft-graph-client";
// import { Link } from "@builder.io/qwik-city";
import { AccessTokenCTX, SlectedFolderIdsCTX } from "./store";
import { PublicClientApplication } from "@azure/msal-browser";
import msalConfig from "~/utils/msal";

interface FolderProps {
  item: DriveItem;
  level: number;
}

const Folder = component$<FolderProps>(({ item, level }) => {
  const isOpen = useSignal(false);
  const slectedFolderIds = useContext(SlectedFolderIdsCTX);
  const store = useContext(AccessTokenCTX);
  const client = noSerialize(
    Client.init({
      authProvider: (done) => {
        done(null, store.accessToken);
      },
    }),
  );

  const subResource = useResource$<{ value: DriveItem[] }>(
    async ({ track }) => {
      track(() => isOpen.value);
      if (!isOpen.value) return { value: [] };

      const res = await client
        ?.api(`/me/drive/items/${item.id}/children`)
        .get();
      return res as { value: DriveItem[] };
    },
  );

  return (
    <div class="space-y-2">
      <div style={{ marginLeft: `min(${level * 5}vw,20px)` }}>
        <div>
          <label
            class={`flex cursor-pointer items-center overflow-x-auto break-all ${
              slectedFolderIds.value.filter((v) => v.id === item.id).length > 0
                ? "bg-yellow-300 dark:bg-amber-800"
                : ""
            }`}
          >
            <div>
              <input
                class="mr-4 h-6 w-6 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-900"
                id={item.id + "_folder_selector"}
                name="folder selector"
                type="checkbox"
                onClick$={() => {
                  if (item.id !== undefined && item.name) {
                    if (
                      slectedFolderIds.value.filter((v) => v.id === item.id)
                        .length > 0
                    ) {
                      slectedFolderIds.value = slectedFolderIds.value.filter(
                        (v) => v.id !== item.id,
                      );
                    } else {
                      slectedFolderIds.value = [
                        ...slectedFolderIds.value,
                        { name: item.name, id: item.id },
                      ];
                    }
                  }
                }}
                checked={
                  slectedFolderIds.value.filter((v) => v.id === item.id)
                    .length > 0
                }
              />
            </div>

            <button
              onClick$={() => (isOpen.value = !isOpen.value)}
              class="flex h-16 w-full items-center border-b p-2 font-medium text-gray-900 dark:text-white"
            >
              {isOpen.value ? (
                <span class="i-ic-baseline-arrow-drop-down m-0 h-5 w-5 p-0">
                  <p class="sr-only">open subfolder</p>
                </span>
              ) : (
                <span class="i-ic-baseline-arrow-right m-0 h-5 w-5 p-0">
                  <p class="sr-only">close subfolder</p>
                </span>
              )}
              {item.name}
            </button>
          </label>
        </div>
        <Resource
          value={subResource}
          onResolved={(data) => (
            <div>
              {data.value
                .filter((subItem) => subItem.folder)
                .map((subItem) => (
                  <Folder key={subItem.id} item={subItem} level={level + 1} />
                ))}
            </div>
          )}
          onPending={() => (
            <div class="overflow-hidden">
              <div class="left-0 right-0 top-0 mt-1 h-1 animate-slidein bg-blue-800 shadow-sm dark:bg-sky-400">
                <div class="absolute h-full bg-white" />
              </div>
              <span class="sr-only">Loading...</span>
            </div>
          )}
          onRejected={() => <div>Error loading subfolder</div>}
        />
      </div>
    </div>
  );
});

export const OneDriveResource = component$(() => {
  const store = useContext(AccessTokenCTX);
  const client = noSerialize(
    Client.init({
      authProvider: (done) => {
        done(null, store.accessToken);
      },
    }),
  );

  const rootResource = useResource$<{ value: DriveItem[] }>(async () => {
    const res = await client?.api("/me/drive/root/children").get();
    return res as { value: DriveItem[] };
  });

  return (
    <div class="mb-10">
      <Resource
        value={rootResource}
        onResolved={(data) => (
          <div class="m-0">
            {data.value
              .filter((item) => item.folder)
              .map((item) => (
                <Folder key={item.id} item={item} level={0} />
              ))}
          </div>
        )}
        onPending={() => <div>Loading root folders...</div>}
        onRejected={() => {
          return (
            <div class="my-10 grid place-content-center bg-white px-4 dark:bg-gray-900">
              <strong class="tracking-widest text-gray-500 dark:text-gray-400">
                Authentication timeout. You need to
                <button
                  class="text-blue-500 underline"
                  onClick$={() => {
                    const msalInstance = new PublicClientApplication(
                      msalConfig,
                    );
                    msalInstance.loginRedirect();
                  }}
                >
                  login again.
                </button>
              </strong>
            </div>
          );
        }}
      />
    </div>
  );
});
