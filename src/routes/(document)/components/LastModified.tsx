import { component$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const document = useDocumentHead();
  const lastModified = document.frontmatter["last-modified"];

  return (
    <>
      {lastModified && (
        <p>
          <span>Last Modified:</span>
          <time dateTime={lastModified}>{lastModified}</time>
          <meta name="last-modified" content={lastModified} />
        </p>
      )}
    </>
  );
});
