import { component$ } from "@builder.io/qwik";
import {
  Link,
  type DocumentHead,
  type RequestHandler,
} from "@builder.io/qwik-city";
import isValidOnionUrl from "~/utils/validate-onion-url";

export const onGet: RequestHandler = async ({ status, headers, error }) => {
  const onionLink = import.meta.env.PUBLIC_THE_ONION_URL;
  if (onionLink === "") {
    status(503);
    headers.set(
      "Retry-After",
      (~~((new Date().setHours(24, 0, 0, 0) - Date.now()) / 1000)).toString(10),
    );
  } else if (onionLink === undefined || !isValidOnionUrl(onionLink)) {
    throw error(404, "Resource Not Found");
  }
};

export default component$(() => {
  const onionLink = import.meta.env.PUBLIC_THE_ONION_URL || "";

  return (
    <div class="min-h-screen dark:bg-slate-900 dark:text-white">
      <div class="container mx-auto max-w-5xl space-y-8 px-4 py-8 lg:py-12">
        {onionLink !== "" ? <OnionLink /> : <UnderConstruction />}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Onion link",
};

const OnionLink = component$(() => {
  const onionUrl = import.meta.env.PUBLIC_THE_ONION_URL || "";

  return (
    <div>
      <h2 class="mb-4 text-4xl font-bold">
        Access all Web Digital Photo Frame with the Tor network
      </h2>

      <p class="mb-4">
        Web Digital Photo Frame has an official onion website for Tor users.
      </p>

      <Link
        href={onionUrl}
        class="mb-4 block break-all text-center text-2xl text-blue-700 underline dark:text-sky-400"
      >
        {onionUrl}
      </Link>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <div class="m-4 h-fit rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <div class="mb-6 flex flex-col items-center">
            <div class="mb-2 rounded-lg border-2 border-gray-300 bg-white p-1 shadow-md dark:border-gray-700">
              <img
                class="h-full object-scale-down"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${onionUrl}&ecc=H&margin=2`}
                alt="QRcode"
                width={200}
                height={200}
              />
            </div>
            <p class="text-center text-sm text-gray-600 dark:text-gray-400">
              Scan the QR code to access our onion site directly.
            </p>
          </div>

          <p class="mb-4">
            If you want to access onion links, you need to use a dedicated
            application like{" "}
            <Link
              href="https://www.torproject.org/download/"
              class="text-blue-700 underline dark:text-sky-400"
            >
              Tor Browser
            </Link>{" "}
            or Tor over VPN.
          </p>
        </div>
        <div class="m-4 h-fit rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 class="mb-2 text-xl font-semibold">
            Tor (The Onion Router) and Our Service
          </h3>
          <p class="mb-4">
            Tor (short for "The Onion Router") is a system that enables highly
            anonymous communication. Many services block access from Tor due to
            its potential for misuse. However, our service takes a more tolerant
            approach.
          </p>

          <p class="mb-4">
            While we allow access via Tor, we strictly prohibit any illegal
            activities or Denial of Service (DDoS) attacks.
          </p>

          <h3 class="mb-2 text-xl font-semibold">Ways to Use Tor:</h3>
          <ul class="mb-4 list-disc pl-6">
            <li>
              <Link
                href="https://www.torproject.org/download/"
                class="text-blue-700 underline dark:text-sky-400"
              >
                Official Tor Browser
              </Link>
            </li>
            <li>
              <Link
                href="https://brave.com/blog/tor-bridges/"
                class="text-blue-700 underline dark:text-sky-400"
              >
                Brave Private Mode with Tor
              </Link>{" "}
              (desktop only)
            </li>
            <li>
              Tor over VPN:
              <ul class="list-circle mt-2 pl-6">
                <li>
                  <Link
                    href="https://nordvpn.com/features/onion-over-vpn/"
                    class="text-blue-700 underline dark:text-sky-400"
                  >
                    NordVPN
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://protonvpn.com/support/tor-vpn/"
                    class="text-blue-700 underline dark:text-sky-400"
                  >
                    ProtonVPN
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <h3 class="mb-2 text-xl font-semibold">
            Limitations of Onion Services:
          </h3>
          <ul class="mb-4 list-disc pl-6">
            <li>
              Caching Strategy Disruption: Our application retains data in the
              browser to speed up subsequent views. However, Tor Browser may
              delete this data as it can be used for tracking.
            </li>
            <li>
              Microsoft Integration: Our app uses Microsoft accounts for
              OneDrive access, which may limit anonymity.
            </li>
            <li>
              Slower Image Loading: Traffic routed through Tor can experience
              significant delays, potentially causing frustration with image
              loading times.
            </li>
            <li>
              Performance Impact: The multi-layered encryption in Tor can slow
              down your browsing experience.
            </li>
          </ul>

          <p class="mb-4">
            Despite these limitations, Tor remains a powerful tool for
            privacy-conscious users. When using our service via Tor, please be
            patient with potential performance issues and understand that some
            features may be affected.
          </p>
          <div class="mt-6 rounded border-l-4 border-yellow-500 bg-yellow-100 p-4 dark:border-yellow-700 dark:bg-yellow-900">
            <p class="text-yellow-700 dark:text-yellow-200">
              <strong>Remember:</strong> While we support privacy, we maintain a
              zero-tolerance policy for any illegal activities conducted through
              our service, regardless of the access method.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

const UnderConstruction = component$(() => {
  return (
    <div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-white dark:bg-gray-800">
      <div class="text-center">
        <h1 class="mb-4 text-4xl font-bold text-gray-800 dark:text-white">
          🚧 Page is preparing 🚧
        </h1>
        <p class="mb-8 text-xl text-gray-700 dark:text-gray-200">
          very sorry.This page is currently being prepared.
        </p>
        <div class="i-svg-spinners-bars-fade size-24" />
        <p class="mt-8 text-gray-700 dark:text-gray-200">
          Please wait for a while.We are preparing great content!
        </p>
      </div>
    </div>
  );
});
