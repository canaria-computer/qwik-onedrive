import { component$ } from "@builder.io/qwik";
// import { Link } from "@builder.io/qwik-city";
// import Image from "~/media/logo.png?jsx";

export default component$(() => {
  const table = [
    ["Feature", "Our App", "Other Apps"],
    ["OneDrive Sync", "Yes", "No"],
    ["Ad-free", "Yes", "No"],
    ["Free", "Yes", "No"],
    ["Web Platform", "Yes", "No"],
    ["Privacy-focused", "Yes", "Maybe"],
  ];
  const standsOutPoint = {
    "OneDrive Sync":
      "We offer this feature for free, while other apps charge or don't provide it at all.",
    "Ad-free": "No advertisements to disrupt your user experience.",
    "Completely Free":
      "All features are available at no cost. No additional charges ever.",
    "Web Platform":
      "Accessible on virtually all devices, not just iOS or Android.",
    "Privacy-focused":
      "Serverless architecture ensures high security. Minimal collection and storage of personal information.",
  };
  return (
    <>
      <section class="dark:bg-slate-900 dark:text-gray-200">
        <div class="container mx-auto px-4 py-8">
          <h2 class="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-gray-200">
            Digital Photo Frame Application Comparison
          </h2>

          <div class="overflow-x-auto">
            <table class="w-full border-collapse rounded-lg bg-white shadow-lg dark:bg-gray-800">
              <thead>
                <tr class="bg-yellow-500 text-black dark:bg-yellow-600">
                  {table[0].map((header) => (
                    <th class="p-3" scope="col" key={header}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.slice(1).map((row, index) => (
                  <tr
                    class={`border-b dark:border-gray-700 ${index % 2 === 0 ? "bg-gray-100 dark:bg-gray-700" : ""} hover:bg-gray-200 dark:hover:bg-yellow-900`}
                    key={row[0]}
                  >
                    <th scope="row" class="p-3">
                      {row[0]}
                    </th>
                    <td class="p-3 text-center">
                      <span class="i-ic-sharp-check text-green-400" />
                      <span class="sr-only">{row[1]}</span>
                    </td>
                    <td class="p-3 text-center">
                      <span class="i-ic-sharp-close text-orange-400" />
                      <span class="sr-only">{row[2]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div class="mt-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 class="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Why Our App Stands Out
            </h3>
            <ul class="list-disc space-y-2 pl-5 text-gray-800 dark:text-gray-200">
              {Object.entries(standsOutPoint).map(([key, value], index) => (
                <li key={index}>
                  <strong>{key}</strong>:{value}
                </li>
              ))}
            </ul>
          </div>

          <div class="mt-6 rounded border-l-4 border-yellow-500 bg-yellow-100 p-4 dark:border-yellow-700 dark:bg-yellow-900">
            <p class="text-yellow-700 dark:text-yellow-200">
              <strong>Note:</strong> As we are currently in development, support
              is limited. However, we are continuously working on improvements.
            </p>
          </div>
        </div>
      </section>
    </>
  );
});
