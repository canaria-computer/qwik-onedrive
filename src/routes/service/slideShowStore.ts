import type { NoSerialize, QRL, Signal } from "@builder.io/qwik";
import { createContextId } from "@builder.io/qwik";

export const currentImageIndexCTX = createContextId<Signal<number>>(
  "CurrentImageIndexCTX",
);
export const synchronizeCTX =
  createContextId<Signal<boolean>>("SynchronizeCTX");

export type SwitchInterval = {
  interval: number;
  setInterval: QRL<(this: SwitchInterval, interval: number) => void>;
  getIntervalString: QRL<(this: SwitchInterval) => string>;
};

export const switchIntervalCTX =
  createContextId<SwitchInterval>("switchIntervalCTX");

export const imageLengthCTX = createContextId<Signal<number>>("imageLengthCTX");

export const isRunningCTX = createContextId<Signal<boolean>>("isRunningCTX");

export const animationTransitionTimeCTX =
  createContextId<Signal<number>>("animationTimeCTX");

export const channelCTX =
  createContextId<Signal<NoSerialize<BroadcastChannel> | null>>("channelCTX");

export const isAutoWeatherDateFetchCTX = createContextId<Signal<boolean>>(
  "isAutoWeatherDateFetchCTX",
);
