import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import type { CacheControl } from "@builder.io/qwik-city/middleware/request-handler";
import Footer from "~/components/footer";
import Header from "~/components/header";
import isValidOnionUrl from "~/utils/validate-onion-url";

export const onGet: RequestHandler = async ({ cacheControl, headers }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  const cacheControlConfig: CacheControl = {
    public: true,
    staleWhileRevalidate: 60 * 60 * 24 * 7 * 3,
    staleIfError: 60 * 60 * 24 * 7 * 4 * 2,
    maxAge: 60 * 60 * 24,
  };
  cacheControl(cacheControlConfig);
  cacheControl(cacheControlConfig, "CDN-Cache-Control");
  const onionLink = import.meta.env.PUBLIC_THE_ONION_URL || "";
  if (onionLink !== undefined && URL.canParse(onionLink)) {
    isValidOnionUrl(onionLink);
    headers.set("onion-location", onionLink);
  }
};

export default component$(() => {
  return (
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  );
});
