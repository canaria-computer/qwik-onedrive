import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Banner from "~/components/banner";
import Card from "~/components/card";
import Features from "~/components/features";
import Pricing from "~/components/pricing";

export default component$(() => {
  return (
    <>
      <Banner />
      <Features />
      <Card />
      <Pricing />
    </>
  );
});

export const head: DocumentHead = {
  title:
    "Web Digital Photo Frame - Free OneDrive-Connected Digital Photo Frame App | Cross-Platform",
  meta: [
    {
      name: "description",
      content:
        "Web Digital Photo Frame is a free, web-based digital photo frame app that seamlessly connects with OneDrive. Access and display your cherished memories from any device, anytime, anywhere",
    },
    {
      property: "og:image",
      content: "https://onedrive.gdpf.2pc.nexus/media/logo.png",
    },
  ],
};
// A generic revolution: Your photos, now alive on your frame, with an ad-free, free-to-use app."
