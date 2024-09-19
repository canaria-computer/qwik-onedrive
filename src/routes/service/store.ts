import type { Signal } from "@builder.io/qwik";
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
