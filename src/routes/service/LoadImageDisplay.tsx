import {
  component$,
  useContext,
  useResource$,
  Resource,
  useVisibleTask$,
  noSerialize,
  $,
  useSignal,
  useOnWindow,
} from "@builder.io/qwik";
import { Client } from "@microsoft/microsoft-graph-client";
import { AccessTokenCTX, SlectedFolderIdsCTX } from "./store";
import type { DriveItem } from "@microsoft/microsoft-graph-types";
import { ImageWithCache } from "./ImageWithCache";
import LoadingImage from "./loadingImage";
import ImageNotSelected from "./ImageNotSelected";
import {
  animationTransitionTimeCTX,
  channelCTX,
  currentImageIndexCTX,
  isRunningCTX,
  switchIntervalCTX,
  synchronizeCTX,
  imageLengthCTX,
} from "./slideShowStore";
import Controller from "./controller/controller";
import type { ImageSlideshowSyncChannel } from "./channel/type";
import type { CachedImage } from "./db/config";
import { DB_NAME, imageCacheCTX, STORE_NAME } from "./db/config";
import type { StoreNames } from "idb";
import { openDB } from "idb";
import ImageOverController from "./controller/ImageOverController";
import Authenticating from "./authenticating";

export const LoadImageDisplay = component$(() => {
  const selectedFolders = useContext(SlectedFolderIdsCTX);
  const store = useContext(AccessTokenCTX);
  const imagesLength = useContext(imageLengthCTX);
  const db = useContext(imageCacheCTX);
  useOnWindow(
    "DOMContentLoaded",
    $(async () => {
      if (!("indexedDB" in window)) {
        console.warn("IndexedDB is not supported in this browser");
        return;
      }
      db.value = noSerialize(
        await openDB<CachedImage>(DB_NAME, 1, {
          upgrade(db) {
            db.createObjectStore(STORE_NAME as StoreNames<CachedImage>, {
              keyPath: "id",
            });
          },
        }),
      );
    }),
  );

  const imageResource = useResource$<
    { id: string; url: string; hash: string }[]
  >(async ({ track }) => {
    track(() => selectedFolders.value);
    track(() => store.accessToken);

    if (!store.accessToken || selectedFolders.value.length === 0) return [];

    const client = Client.init({
      authProvider: (done) => {
        done(null, store.accessToken);
      },
    });

    const getImagesRecursively = async (
      folderId: string,
    ): Promise<{ id: string; url: string; hash: string }[]> => {
      try {
        const response = await client
          .api(`/me/drive/items/${folderId}/children`)
          .get();
        const items: DriveItem[] = response.value;

        let images: { id: string; url: string; hash: string }[] = [];

        for (const item of items) {
          if (
            item.file &&
            item.file.mimeType &&
            item.file.mimeType.startsWith("image/")
          ) {
            images.push({
              id: item.id || "",
              // @ts-ignore
              url: item["@microsoft.graph.downloadUrl"] || item.webUrl || "",
              hash: item.file.hashes?.quickXorHash || item.eTag || "", // Use quickXorHash if available, otherwise fall back to eTag
            });
          } else if (item.folder) {
            images = images.concat(await getImagesRecursively(item.id || ""));
          }
        }

        return images;
      } catch (error) {
        console.error(`Error fetching items for folder ${folderId}:`, error);
        return [];
      }
    };

    let allImages: { id: string; url: string; hash: string }[] = [];
    for (const folder of selectedFolders.value) {
      allImages = allImages.concat(await getImagesRecursively(folder.id));
    }
    imagesLength.value = allImages.length;
    return allImages;
  });

  // slide show contorole ----
  const { value: animationTime } = useContext(animationTransitionTimeCTX);
  const channel = useContext(channelCTX);
  const currentImageIndex = useContext(currentImageIndexCTX);
  const synchronize = useContext(synchronizeCTX);
  const switchInterval = useContext(switchIntervalCTX);
  const isRunning = useContext(isRunningCTX);
  const timeRemaining = useSignal(switchInterval.interval);

  // Initialize BroadcastChannel
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const newChannel = new BroadcastChannel("image-slideshow");
    channel.value = noSerialize(newChannel);
    const handleMessage = (event: MessageEvent<ImageSlideshowSyncChannel>) => {
      if (event.data.type === "SWITCH_IMAGE" && isRunning.value) {
        if (synchronize.value) {
          console.log(imagesLength.value);

          currentImageIndex.value = event.data.index % imagesLength.value;
        } else if (!event.data.manual) {
          currentImageIndex.value =
            (currentImageIndex.value + 1) % imagesLength.value;
        }
        timeRemaining.value = switchInterval.interval;
      }
    };
    newChannel.addEventListener("message", handleMessage);

    cleanup(() => {
      newChannel.removeEventListener("message", handleMessage);
      newChannel.close();
    });
  });
  const switchImage = $((nextIndex: number, isManual: boolean) => {
    currentImageIndex.value = nextIndex;
    channel.value?.postMessage({
      type: "SWITCH_IMAGE",
      index: nextIndex,
      manual: isManual,
    });
  });
  // Timer effect
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const timer = setInterval(() => {
      if (!isRunning.value) return;
      timeRemaining.value -= 100;
      timeRemaining.value =
        ((timeRemaining.value % switchInterval.interval) +
          switchInterval.interval) %
        switchInterval.interval;
      if (timeRemaining.value <= 0 && imagesLength.value !== 0) {
        const nextIndex = (currentImageIndex.value + 1) % imagesLength.value;
        switchImage(nextIndex, false);
      }
      if (Number.isNaN(currentImageIndex.value)) {
        currentImageIndex.value = 0;
      }
    }, 100);
    cleanup(() => clearInterval(timer));
  });
  // Handle next and previous image
  // const handleNextImage = $(() => {
  //   const nextIndex = (currentImageIndex.value + 1) % imagesLength.value;
  //   switchImage(nextIndex, true);
  // });

  // const handlePrevImage = $(() => {
  //   const prevIndex =
  //     (currentImageIndex.value - 1 + imagesLength.value) % imagesLength.value;
  //   switchImage(prevIndex, true);
  // });

  return (
    <div>
      <ImageOverController imagesNotSelected={imagesLength.value === 0}>
        <Resource
          value={imageResource}
          onPending={() => <LoadingImage />}
          onResolved={(images) => (
            <div>
              {store.accessToken === "" && <Authenticating />}
              {images.map((image, index) => (
                <ImageWithCache
                  key={image.id}
                  id={image.id}
                  url={image.url}
                  hash={image.hash}
                  isHidden={currentImageIndex.value !== index}
                  timeRemaining={timeRemaining.value}
                />
              ))}
              {images.length === 0 && <ImageNotSelected />}
            </div>
          )}
          onRejected={() => {
            return <>Error</>;
          }}
        />
      </ImageOverController>
      <Controller />
      {import.meta.env.DEV && (
        <>
          <div>
            Time until next image: {Math.ceil(timeRemaining.value / 1000)}s
          </div>
          <div>animationTime {animationTime} ms</div>
          <div>index {currentImageIndex}</div>
        </>
      )}
    </div>
  );
});
