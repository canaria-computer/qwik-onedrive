import type { DocumentHead } from "@builder.io/qwik-city";
import { head as h } from "../layout";

export const head: DocumentHead = {
  ...h,
  links: [
    {
      rel: "preconnect",
      href: "https://buymeacoffee.com",
    },
  ],
};
