// A neat text transition effect, useful in a case when there are sequential
// steps involved in completing a process. Inspired from a BlackBerry OS 10
// animation: https://youtu.be/IFbChASQH34?t=200
// This effect can also be sometimes seen in Snapchat's map state/country text that appears at the top

import { useEffect, useState } from "react";
import cn from "clsx";
import useMeasure from "react-use-measure";
import { Transition, motion } from "framer-motion";

import css from "./bb10-text-transition.module.css";

const texts = [
  {
    title: "Connecting",
    info: "Network Found",
  },
  {
    title: "Waiting for data connection",
    info: "BGD ROBI AXIATA",
  },
  {
    title: "Waiting for data connection",
    info: "airtel",
  },
  {
    title: "Syncing device",
    info: "Contacts",
  },
  {
    title: "Syncing device",
    info: "Homescreen setup",
  },
];

const springConfig: Transition = {
  duration: 0.15,
  bounce: 0,
};

export const BB10TextTransition = () => {
  const [textIndex, setTextIndex] = useState(0);

  const [titleRef, { width: titleWidth }] = useMeasure();
  const [infoRef, { width: infoWidth }] = useMeasure();

  useEffect(() => {
    const id = setInterval(() => {
      setTextIndex((v) => (v + 1) % texts.length);
    }, 3000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className={cn("pt-32 flex flex-col items-center min-h-screen", css.bg)}>
      <div className="mb-4">
        Inspiration:{" "}
        <a target="_blank" href="https://youtu.be/IFbChASQH34?t=200" className="text-blue-700">
          Blackberry OS 10 text transition
        </a>
      </div>
      <div className="flex items-center flex-col w-96 p-3 h-32 rounded-md shadow-md bg-white">
        <span className={css.loader}></span>
        <motion.div
          animate={{ width: titleWidth === 0 ? undefined : titleWidth }}
          transition={springConfig}
          className="overflow-hidden mt-6"
        >
          <div className="inline-block whitespace-nowrap" ref={titleRef}>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            {texts[textIndex]!.title}
          </div>
        </motion.div>
        <motion.div
          animate={{ width: infoWidth === 0 ? undefined : infoWidth }}
          className="overflow-hidden"
          transition={springConfig}
        >
          <div className="inline-block whitespace-nowrap" ref={infoRef}>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            {texts[textIndex]!.info}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
