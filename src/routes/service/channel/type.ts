export type ImageSlideshowSyncChannel = {
  type: "SWITCH_IMAGE" | "UPDATE_INTERVAL";
  index: number;
  manual: boolean;
};
