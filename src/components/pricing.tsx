import { component$ } from "@builder.io/qwik";

export default component$(() => {
  const price = {
    Starter: {
      price: 0,
      duration: "Lifetime",
      usages: "Try use",
    },
    Basic: { price: 0, duration: "Lifetime", usages: "Personal use" },
    Pro: {
      price: 0,
      duration: "Lifetime",
      usages: "Advanced features for enthusiasts",
    },
  };
  const included = [
    "OneDrive sync",
    "Multiple device support",
    "Unlimited photo used",
    "Tor access",
    "commercial use",
    "non-commercial use",
  ];
  const notInclueded = ["Customer support"];
  return (
    <section class="flex min-h-screen items-center justify-center dark:bg-slate-900 dark:text-white">
      <div class="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-4 md:gap-8">
          <div>
            <h2 class="my-2 text-4xl">Price setting</h2>
            <p>
              Just kidding! 😄 All features are free! However, if you’re really
              satisfied and have some extra funds, we would greatly appreciate
              any donations! 🙏✨
            </p>
          </div>
          <>
            {Object.entries(price).map(
              ([plan, { price, duration, usages }], i) => {
                return (
                  <div
                    class="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm dark:bg-slate-800"
                    key={i}
                  >
                    <div class="p-6 sm:px-8">
                      <h3 class="flex items-center text-lg font-medium text-gray-900 dark:text-gray-50">
                        <span class="i-ic-baseline-attach-money" />
                        {plan}
                      </h3>

                      <p class="mt-2 text-gray-700 dark:text-gray-300">
                        {usages}
                      </p>

                      <p class="mt-2 sm:mt-4">
                        <strong class="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-50">
                          {price}$
                        </strong>

                        <span class="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                          {duration}
                        </span>
                      </p>
                    </div>

                    <div class="p-6 sm:px-8">
                      <p class="text-lg font-medium text-gray-900 sm:text-xl dark:text-gray-50">
                        What's included:
                      </p>

                      <ul class="mt-2 space-y-2 sm:mt-4">
                        {included.map((v, i) => {
                          return (
                            <li class="flex items-center gap-1" key={v + i}>
                              <span class="i-ic-sharp-check text-green-400" />
                              <span class="text-gray-700 dark:text-gray-300">
                                {v}
                              </span>
                            </li>
                          );
                        })}
                        {notInclueded.map((v, i) => {
                          return (
                            <li class="flex items-center gap-1" key={v + i}>
                              <span class="i-ic-sharp-close text-orange-400" />
                              <span class="text-gray-700 dark:text-gray-300">
                                {v}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              },
            )}
          </>
        </div>
      </div>
    </section>
  );
});
