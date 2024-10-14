import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <footer class="bg-gray-100 dark:bg-gray-900">
      <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="m-8 border-t border-gray-100 p-4">
          <p class="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-700 dark:text-gray-200">
            We're committed to enhancing your digital photo frame experience. If
            you have any feedback, we'd love to hear it. Enjoy GDPF! 📸🎉
          </p>
          <SiteMap />
          <SocialsLink />
          <Copyright />
        </div>
      </div>
    </footer>
  );
});

export const Copyright = component$(() => {
  const copyRightLdJson = {
    "@context": "http://schema.org",
    "@type": "CreativeWork",
    copyrightHolder: {
      "@type": "Person",
      name: "canaria-computer",
    },
    copyrightYear: "2024",
  };

  return (
    <>
      <div class="mt-8 border-b border-gray-100 pb-8">
        <p class="text-center text-gray-700 dark:text-gray-200">
          © 2024 canaria-computer . All rights reserved.
        </p>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={JSON.stringify(copyRightLdJson)}
        />
      </div>
    </>
  );
});

export const SocialsLink = component$(() => {
  return (
    <>
      <ul class="flex justify-center gap-6 md:gap-8">
        <li>
          <a
            href="#"
            rel="noreferrer"
            target="_blank"
            class="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
          >
            <span class="sr-only">GitHub</span>
            <div class="i-logos-github-icon h-10 w-10 dark:bg-gray-50" />
          </a>
        </li>
      </ul>
    </>
  );
});

export const SiteMap = component$(() => {
  const footerLinks = {
    Legal: {
      "Term of Service": {
        logo: "i-ic-baseline-description",
        href: "/legal/ToS/",
      },
      cookie: { logo: "i-ic-twotone-cookie", href: "/legal/cookie/" },
      Accessibility: { logo: "i-ic-baseline-accessible", href: "/legal/a11y/" },
    },
    Links: {
      FAQ: {
        href: "/frequently-asked-questions/",
        logo: "i-ic-baseline-help-center",
      },
      "License Notice": {
        href: "/legal/license-notice/",
        logo: "i-ic-baseline-insert-drive-file",
      },
      feedback: {
        href: "",
        logo: "i-ic-baseline-feedback",
      },
      Tor: {
        href:
          (import.meta.env.PUBLIC_THE_ONION_URL || "") === "" ? "" : "/Tor/",
        logo: "i-logos-tor-browser",
      },
      Donate: {
        href: "/donate/",
        logo: "i-bx-donate-heart",
      },
    },
  };
  return (
    <div class="m-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:pt-16 dark:border-gray-800">
      {Object.entries(footerLinks).map(([t, o], i) => {
        return (
          <div key={i}>
            <p class="flex items-center font-medium text-gray-900 dark:text-white">
              <span class="i-ic-outline-link mx-2 h-6 w-6" />
              <span class="inline-block align-middle">{t}</span>
            </p>
            <ul class="mt-6 space-y-4 text-sm">
              {Object.entries(o)
                .filter(([, v]) => v.href !== "")
                .map(([k, v], i) => (
                  <li key={i}>
                    <Link
                      class="flex items-center text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                      href={v.href}
                    >
                      <span class={`${v.logo} mx-2 h-5 w-5`} />
                      <span class="inline-block align-middle">{k}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
});
