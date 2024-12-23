import type { QRL, Signal } from "@builder.io/qwik";
import { createContextId } from "@builder.io/qwik";
import type { Infer } from "superstruct";
import * as s from "superstruct";

export interface AccessToken {
  accessToken: string;
}
export const AccessTokenCTX = createContextId<AccessToken>("accessTokenCTX");

export const SelectedFolders = s.object({
  name: s.nonempty(s.string()),
  id: s.nonempty(s.string()),
});

export type SelectedFolders = Infer<typeof SelectedFolders>;

export const SlectedFolderIdsCTX =
  createContextId<Signal<SelectedFolders[]>>("SlectFolderIdCTX");

export interface DecorationDateTime {
  format: {
    up: string;
    down: string;
  };
  isEnable: boolean;
  updateUpFormatText: QRL<(this: DecorationDateTime, text: string) => void>;
  updateDownFormatText: QRL<(this: DecorationDateTime, text: string) => void>;
  updateEnable: QRL<(this: DecorationDateTime, enable: boolean) => void>;
}

export const DecorationDateTimeCTX =
  createContextId<DecorationDateTime>("DecorationDateTime");

export const positionSet = {
  topLeft: "left-0 top-0",
  topRight: "right-0 top-0",
  bottomLeft: "bottom-0 left-0",
  bottomRight: "bottom-0 right-0",
} as const;

export type PositionKey = keyof typeof positionSet;

export const DecorationPositionCTX = createContextId<Signal<PositionKey>>(
  "DecorationPositionCTX",
);
