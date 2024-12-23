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
  title: "Welcome to GDPF",
  meta: [
    {
      name: "description",
      content:
        "Generic Digital Photo Frame (GDPF) is a digital photo frame application provide completely free of charge with OneDrive integration, image cache function, and no Ad.",
    },
    {
      property: "og:image",
      content: "https://onedrive.gdpf.2pc.nexus/media/logo.png",
    },
  ],
};
// A generic revolution: Your photos, now alive on your frame, with an ad-free, free-to-use app."
