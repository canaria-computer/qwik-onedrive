import { component$ } from "@builder.io/qwik";
import SwitchIntervalController from "./SwitchIntervalController";
import Autoplay from "./autoplay";
import WakeLock from "./WakeLock";
import DateFormatDisplay from "./DateFormatDisplay";

export default component$(() => {
  return (
    <div class="container m-auto max-w-6xl p-10">
      <SwitchIntervalController />
      <Autoplay />
      <WakeLock />
      <DateFormatDisplay />
    </div>
  );
});
