import { component$ } from "@builder.io/qwik";
import SwitchIntervalController from "./SwitchIntervalController";
import Autoplay from "./autoplay";
import WakeLock from "./WakeLock";
import DateFormatDisplay from "./DateFormatDisplay";
import DecorationPosition from "./decorationPosition";

export default component$(() => {
  return (
    <div class="container m-auto max-w-6xl p-10">
      <SwitchIntervalController />
      <DecorationPosition />
      <Autoplay />
      <WakeLock />
      <DateFormatDisplay />
    </div>
  );
});
