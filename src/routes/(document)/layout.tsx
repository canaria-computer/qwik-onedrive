import { component$, Slot } from "@builder.io/qwik";
import { Link, useContent, type DocumentHead } from "@builder.io/qwik-city";
import SkipLink from "~/components/skipLink";
import Markdown from "~/utils/markdown";
import Published from "./components/Published";
import LastModified from "./components/LastModified";

const appDescription =
  "Generic Digital Photo Frame (GDPF) is a digital photo frame application provide completely free of charge with OneDrive integration, image cache function, and no Ad.";

export const head: DocumentHead = {
  meta: [
    {
      name: "description",
      content: appDescription,
    },
    {
      property: "og:description",
      content: "This is the about page",
    },
  ],
  links: [
    {
      rel: "canonical",
      href: import.meta.env.PUBLIC_SERVICE_URL,
    },
  ],
};

export default component$(() => {
  const content = useContent();

  return (
    <>
      <Markdown>
        <SkipLink href="#END_OF_TOC">Jump to Content</SkipLink>
        <Published />
        <LastModified />
        {content.headings !== undefined && (
          <>
            <h2>Table of Contents</h2>
            <SkipLink href="#END_OF_TOC">Skip TOC</SkipLink>
            <ul>
              {content.headings.map((heading) => (
                <li key={heading.id}>
                  <Link href={`#${heading.id}`}>{heading.text}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
        <hr id="END_OF_TOC" />
        <Slot />
      </Markdown>
    </>
  );
});
