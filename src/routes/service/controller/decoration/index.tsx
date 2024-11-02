import {
  component$,
  noSerialize,
  useContext,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeek from "dayjs/plugin/isoWeek";
import weekYear from "dayjs/plugin/weekYear";
import timezone from "dayjs/plugin/timezone";
import { DecorationDateTimeCTX } from "../../store";

export default component$(() => {
  const time = useSignal(noSerialize(new Date()));
  const decorationConfig = useContext(DecorationDateTimeCTX);

  useTask$(async () => {
    // Extend dayjs with required plugins
    dayjs.extend(advancedFormat);
    dayjs.extend(weekOfYear);
    dayjs.extend(isoWeek);
    dayjs.extend(weekYear);
    dayjs.extend(timezone);

    const interval = setInterval(() => {
      time.value = noSerialize(new Date());
    }, 1000);

    return () => clearInterval(interval);
  });

  const formatTime = () => {
    if (decorationConfig.format.up === "") {
      return new Intl.DateTimeFormat(window.navigator.language, {
        timeStyle: "short",
      }).format(time.value);
    } else {
      return dayjs(time.value).format(decorationConfig.format.up);
    }
  };

  const formatDate = () => {
    if (decorationConfig.format.down === "") {
      return new Intl.DateTimeFormat(window.navigator.language, {
        dateStyle: "medium",
      }).format(time.value);
    } else {
      return dayjs(time.value).format(decorationConfig.format.down);
    }
  };

  return (
    <div class="m-3 mx-1 rounded-sm bg-gray-800/50 p-2 px-7 font-mono tracking-tighter shadow-md dark:bg-gray-950/80">
      <div class="text-center text-2xl font-bold text-white drop-shadow-md [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100">
        {formatTime()}
      </div>
      <div class="text-center text-sm font-bold text-white [text-shadow:_0_0_10px_#FFFFFFDD] dark:text-gray-100">
        {formatDate()}
      </div>
    </div>
  );
});
