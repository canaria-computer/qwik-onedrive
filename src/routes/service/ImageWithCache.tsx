import {
  component$,
  useResource$,
  Resource,
  useContext,
  $,
} from "@builder.io/qwik";
import type { CachedImage } from "./db/config";
import { imageCacheCTX, STORE_NAME } from "./db/config";
import {
  animationTransitionTimeCTX,
  isRunningCTX,
  switchIntervalCTX,
} from "./slideShowStore";
import "./_style.css";
import fetchWithRetry from "~/utils/fetchWithRetry";
import SwipeManager from "./controller/swipeManager";

export const ImageWithCache = component$<{
  id: string;
  url: string;
  hash: string;
  isHidden: boolean;
  timeRemaining: number;
}>(({ id, url, hash, isHidden, timeRemaining }) => {
  const db = useContext(imageCacheCTX);

  const getCachedImage = $(async (id: string): Promise<CachedImage | null> => {
    if (!db.value) return null;
    const tx = db.value.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    return await store.get(id);
  });

  const cacheImage = $(async (id: string, blob: Blob, hash: string) => {
    if (!db.value) return null;
    const tx = db.value.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    await store.put({ id, blob, hash });
  });

  const imageResource = useResource$(async (): Promise<string[]> => {
    const cachedImage = await getCachedImage(id);

    if (cachedImage && cachedImage.hash === hash) {
      return [URL.createObjectURL(cachedImage.blob), url];
    }
    // If the cache does not exist, return the URL as it is
    // Do a request separately and make a cache
    fetchWithRetry(url)
      .then((response) => response.blob())
      .then(async (blob) => {
        await cacheImage(id, blob, hash);
      })
      .catch((error) => {
        console.error(`Error fetching image ${id}:`, error);
      });
    return [url];
  });

  const switchInterval = useContext(switchIntervalCTX);
  const { value: animationTransitionTime } = useContext(
    animationTransitionTimeCTX,
  );
  const isRunning = useContext(isRunningCTX);
  return (
    <Resource
      value={imageResource}
      onResolved={(src) => {
        const [preferred, ...redundancy] = src;
        const isChangeing =
          (switchInterval.interval - animationTransitionTime / 2 >
            timeRemaining &&
            timeRemaining > animationTransitionTime / 2) ||
          !isRunning.value;

        return (
          <SwipeManager>
            <div>
              <div
                style={{ "--animation-time": `${animationTransitionTime}ms` }}
                class={`relative overflow-hidden ${isHidden ? "hidden" : ""} bg-black`}
              >
                <div
                  class={`slide absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat blur-md ${isChangeing ? "is-show opacity-100" : "opacity-0"}`}
                  style={{
                    backgroundImage: src.map((v) => `url('${v}')`).join(", "),
                  }}
                />
                <div class="relative flex w-full items-center justify-center">
                  <picture>
                    <img
                      src={preferred}
                      alt=""
                      width={200}
                      height={200}
                      class={`slide h-dvh w-auto max-w-full object-scale-down ${isChangeing ? "is-show" : ""}`}
                    />
                    {redundancy.map((v) => (
                      <source
                        src={v}
                        key={v}
                        class={`slide h-dvh w-auto max-w-full object-scale-down ${isChangeing ? "is-show" : ""}`}
                      />
                    ))}
                  </picture>
                </div>
              </div>
            </div>
          </SwipeManager>
        );
      }}
    />
  );
});
