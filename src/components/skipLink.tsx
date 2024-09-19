import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(({ href }: { href: string }) => {
  return (
    <div class="inline">
      <Link
        href={href}
        class="sr-only mx-1 flex h-0 w-fit items-center border-2 p-1 focus:h-fit focus:border-2 focus:border-sky-400 focus:outline-none focus-visible:not-sr-only"
      >
        <Slot />
        <span class="i-ic-baseline-arrow-right h-6 w-6" />
      </Link>
    </div>
  );
});
