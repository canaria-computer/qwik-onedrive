import type { NoSerialize } from "@builder.io/qwik";
import {
  $,
  component$,
  useContextProvider,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import AccessTokenHandler from "./accessTokenHandler";
import type { AccessToken, DecorationDateTime } from "./store";
import {
  AccessTokenCTX,
  DecorationDateTimeCTX,
  DecorationPositionCTX,
  SlectedFolderIdsCTX,
} from "./store";
import { OneDriveResource } from "./oneDriveRootResouceHandler";
import { SelectFoldersDisplay } from "./selectFoldersDisplay";
import { LoadImageDisplay } from "./LoadImageDisplay";
import type { ImageCacheStore } from "./db/config";
import { imageCacheCTX } from "./db/config";
import type { SwitchInterval } from "./slideShowStore";
import {
  animationTransitionTimeCTX,
  channelCTX,
  currentImageIndexCTX,
  imageLengthCTX,
  isRunningCTX,
  switchIntervalCTX,
  synchronizeCTX,
} from "./slideShowStore";
import Footer from "./footer";

export default component$(() => {
  const store = useStore<AccessToken>({ accessToken: "" });
  useContextProvider(AccessTokenCTX, store);
  const selectFolders = useSignal([]);
  useContextProvider(SlectedFolderIdsCTX, selectFolders);
  const imageCacheStore = useStore<ImageCacheStore>({
    value: null,
  });
  useContextProvider(imageCacheCTX, imageCacheStore);
  // --- slide show control
  const currentImageIndex = useSignal(0);
  useContextProvider(currentImageIndexCTX, currentImageIndex);
  const synchronize = useSignal(false);
  useContextProvider(synchronizeCTX, synchronize);
  const switchInterval = useStore<SwitchInterval>({
    interval: 5000,
    getIntervalString: $(function (this: SwitchInterval) {
      return this.interval.toString();
    }),
    setInterval: $(function (this: SwitchInterval, interval: number) {
      this.interval = interval;
    }),
  });
  useContextProvider(switchIntervalCTX, switchInterval);
  const imageLength = useSignal(0);
  useContextProvider(imageLengthCTX, imageLength);
  const isRunning = useSignal(false);
  useContextProvider(isRunningCTX, isRunning);
  const animationTransitionTime = useSignal(1000);
  useContextProvider(animationTransitionTimeCTX, animationTransitionTime);
  const channel = useSignal<NoSerialize<BroadcastChannel> | null>(null);
  useContextProvider(channelCTX, channel);
  const decoration = useStore<DecorationDateTime>({
    format: { down: "", up: "" },
    updateUpFormatText: $(function (this: DecorationDateTime, text: string) {
      this.format.up = text;
    }),
    updateDownFormatText: $(function (this: DecorationDateTime, text: string) {
      this.format.down = text;
    }),
  });
  useContextProvider(DecorationDateTimeCTX, decoration);
  const decorationPosition = useSignal("bottomRight");
  useContextProvider(DecorationPositionCTX, decorationPosition);

  return (
    <>
      <AccessTokenHandler>
        <LoadImageDisplay />
        <div class="container m-auto max-w-6xl p-10">
          <SelectFoldersDisplay />
          {store.accessToken !== "" && <OneDriveResource />}
        </div>
        <Footer />
      </AccessTokenHandler>
    </>
  );
});
