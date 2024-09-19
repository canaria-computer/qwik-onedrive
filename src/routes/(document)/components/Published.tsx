import { component$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const document = useDocumentHead();
  const published = document.frontmatter.published;

  return (
    <>
      {published && (
        <p>
          <span>Published:</span>
          <time dateTime={published}>{published}</time>
          <meta name="last-modified" content={published} />
        </p>
      )}
    </>
  );
});
