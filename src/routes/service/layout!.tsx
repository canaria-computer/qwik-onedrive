import { component$, Slot } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import type { CacheControl } from "@builder.io/qwik-city/middleware/request-handler";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  const cacheControlConfig: CacheControl = {
    private: true,
    staleWhileRevalidate: 60 * 60 * 24 * 7 * 3,
    maxAge: 60 * 60,
  };
  cacheControl(cacheControlConfig);
  cacheControl(cacheControlConfig, "CDN-Cache-Control");
};

export default component$(() => {
  return (
    <div class="min-h-screen dark:bg-slate-900 dark:text-white">
      <Slot />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Web Digital Photo Frame",
};
