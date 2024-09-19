import { PublicClientApplication } from "@azure/msal-browser";
import type { NoSerialize } from "@builder.io/qwik";
import {
  $,
  component$,
  noSerialize,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { deleteDB } from "idb";
import msalConfig from "~/utils/msal";
import { DB_NAME } from "../service/db/config";

export default component$(() => {
  const loc = useLocation();
  const msalInstance = useSignal<NoSerialize<PublicClientApplication> | null>(
    null,
  );
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    msalInstance.value = noSerialize(new PublicClientApplication(msalConfig));
  });

  const handleLogOut = $(async () => {
    if (!msalInstance.value) return;
    await msalInstance.value.initialize();
    const account = msalInstance.value.getActiveAccount();
    await msalInstance.value.logoutRedirect({
      postLogoutRedirectUri: loc.url.origin.toString(),
      account: account,
    });
  });

  const removeAppStorage = $(async () => {
    localStorage.clear();
    sessionStorage.clear();
    await deleteDB(DB_NAME);
  });

  return (
    <main class="dark:bg-slate-900 dark:text-gray-200">
      <div class="container mx-auto max-w-3xl px-4 py-8">
        <h2 class="mb-8 text-3xl font-bold">Account Settings</h2>
        <div class="space-y-8">
          <div class="mt-8 rounded-lg border-2 bg-white p-6 dark:bg-gray-800">
            <h3 class="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Complete Logout
            </h3>
            <div class="m-1 p-1">
              <p>This will completely erase the app's memory.</p>
              <ul class="list-inside list-disc space-y-1">
                <li>Benefit: Maximum protection of privacy and security.</li>
                <li>
                  Drawback: The app will start fresh from a new environment
                  during the next login, which may delay the start.
                </li>
              </ul>
              <div class="my-3 rounded border-l-4 border-yellow-500 bg-yellow-100 p-2 dark:border-yellow-700 dark:bg-yellow-900">
                <p class="text-yellow-700 dark:text-yellow-200">
                  <strong>Recommendation:</strong>
                  Recommended after using on shared computers or in public
                  places.
                </p>
              </div>
            </div>

            <button
              onClick$={() => {
                removeAppStorage();
                handleLogOut();
              }}
              class="rounded border-2 border-orange-600 px-4 py-2 font-bold hocus:rounded-none hocus:bg-gray-200 hocus:outline-none hocus:ring-2 hocus:ring-black hocus:ring-offset-2 dark:bg-black dark:text-white dark:hocus:rounded-none dark:hocus:bg-gray-800 dark:hocus:outline-none dark:hocus:ring-2 dark:hocus:ring-black dark:hocus:ring-offset-2"
            >
              Execute Complete Logout
            </button>
          </div>

          <div class="mt-8 rounded-lg border-2 bg-white p-6 dark:bg-gray-800">
            <h3 class="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Normal Logout
            </h3>
            <div class="m-1 p-1">
              <p>This will only end access to the app.</p>
              <ul class="list-inside list-disc space-y-1">
                <li>
                  Benefit: You can start using the app smoothly during the next
                  login.
                </li>
                <li>
                  Note: Some app information will remain on the device. It is
                  suitable for use on personal devices that are not shared with
                  others.
                </li>
              </ul>
            </div>
            <div class="my-3 rounded border-l-4 border-emerald-500 bg-emerald-100 p-2 dark:border-emerald-700 dark:bg-emerald-900">
              <p class="text-emerald-700 dark:text-emerald-200">
                <strong>Security Warning:</strong>
                If others use this browser, there is a possibility that they may
                access your data.
              </p>
            </div>
            <button
              onClick$={handleLogOut}
              class="my-2 rounded border-2 border-sky-400 p-2 px-4 font-bold hocus:rounded-none hocus:bg-gray-200 hocus:outline-none hocus:ring-2 hocus:ring-black hocus:ring-offset-2 dark:bg-black dark:text-white dark:hocus:rounded-none dark:hocus:bg-gray-800 dark:hocus:outline-none dark:hocus:ring-2 dark:hocus:ring-black dark:hocus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
});
