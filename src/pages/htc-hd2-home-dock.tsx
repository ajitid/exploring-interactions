import { motion, useMotionValue, useTransform, animate, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import cn from "clsx";
import useMeasure from "react-use-measure";
import {
  HomeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  MusicalNoteIcon,
  FireIcon,
  CalculatorIcon,
  DocumentTextIcon,
  MapIcon,
  BuildingLibraryIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  ShoppingBagIcon,
  PuzzlePieceIcon,
  LifebuoyIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import { snap } from "../petha/snap";

const icons = [
  HomeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  MusicalNoteIcon,
  FireIcon,
  CalculatorIcon,
  DocumentTextIcon,
  MapIcon,
  BuildingLibraryIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  ShoppingBagIcon,
  PuzzlePieceIcon,
  LifebuoyIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
];

const SCREEN_WIDTH = 414;
const screenWidthClassname = "w-[414px]";
// scrub width is equal to the width that each item in the strip occupies
// scrub is the box/knob that is over the dock strip and it tells which item is selected
const SCRUB_WIDTH = 76;
const scrubWidthClassname = "w-[76px]";

export const HtcHd2HomeDock = () => {
  const [dockRef, { width: dockWidth }] = useMeasure();

  const [selectedItem, setSelectedItem] = useState(0);
  const SelectedIcon = icons[selectedItem];
  if (!SelectedIcon) {
    throw new Error("`SelectedIcon` is undefined");
  }

  const scrubX = useMotionValue(0);
  useEffect(
    () =>
      scrubX.on("change", (v) => {
        setSelectedItem(getSnappedPoint(dockWidth, v).i);
      }),
    [dockWidth, scrubX]
  );

  const dockX = useTransform(
    useTransform(scrubX, [0, SCREEN_WIDTH - SCRUB_WIDTH], [0, dockWidth - SCREEN_WIDTH]),
    (v) => v * -1
  );

  const moveTo = (i: number) => {
    animate(
      scrubX,
      icons.length <= 1
        ? 0
        : ((Math.min(dockWidth, SCREEN_WIDTH) - SCRUB_WIDTH) / (icons.length - 1)) * i,
      {
        type: "spring",
        duration: 0.3,
        bounce: 0,
      }
    );
  };

  const [dragging, setDragging] = useState<"dragging" | "notDragging">("notDragging");
  const previewVariants: Variants = {
    dragging: {
      backdropFilter: "blur(3px)",
      filter: "blur(0px)",
      display: "grid",
    },
    notDragging: {
      backdropFilter: "blur(0px)",
      filter: "blur(1px)",
      display: "none",
    },
  };

  return (
    <div className="min-h-screen bg-black grid place-items-center">
      <div
        className={cn(
          "bg-pink-100 rounded relative overflow-hidden h-[686px]",
          screenWidthClassname
        )}
      >
        <div className="p-2">Selected app appears here</div>
        <motion.div
          variants={previewVariants}
          animate={dragging}
          // backdropFilter needs opacity to work
          className="bg-stone-100 bg-opacity-50 h-full w-full top-0 absolute pb-12 place-items-center"
        >
          <SelectedIcon className="w-32 text-pink-900" />
        </motion.div>
        {/* this height is the same as icons + padding height in the `map()` done right below */}
        <div className="absolute bottom-0 h-[72px] bg-pink-300 w-full" />
        <motion.div
          className="absolute bottom-0 flex"
          ref={dockRef}
          style={{ x: dockWidth > SCREEN_WIDTH ? dockX : 0 }}
        >
          {icons.map((Icon, idx) => (
            <div
              onPointerDown={() => {
                moveTo(idx);
              }}
              className="py-2 px-[10px]"
              key={idx}
            >
              <Icon className="w-14 inline-block text-pink-900" />
            </div>
          ))}
        </motion.div>
        <motion.div
          className={cn(
            "absolute bottom-0 bg-pink-200 h-20 rounded-t grid place-items-center",
            scrubWidthClassname
          )}
          style={{ x: scrubX }}
          onDragStart={() => setDragging("dragging")}
          onDragEnd={() => setDragging("notDragging")}
          drag="x"
          dragElastic={false}
          dragMomentum={false}
          // instead of `dragTransition`, pairing `onDragEnd` with `animate` can work just as well
          // see https://twitter.com/hybrid_alex/status/1635979313265745920
          dragTransition={{
            timeConstant: 30,
            modifyTarget: (v) => {
              return getSnappedPoint(dockWidth, v).x;
            },
          }}
          dragConstraints={{ left: 0, right: SCREEN_WIDTH - SCRUB_WIDTH }}
        >
          <SelectedIcon className="w-14 text-pink-900" />
        </motion.div>
      </div>
    </div>
  );
};

const getSnappedPoint = (dockWidth: number, offset: number) => {
  if (icons.length <= 1) {
    return { i: 0, x: 0 };
  } else {
    const snappingPoints: number[] = Array(icons.length);
    const segmentLength =
      (Math.min(SCREEN_WIDTH, dockWidth) - SCRUB_WIDTH) / (snappingPoints.length - 1);
    for (let i = 0; i < snappingPoints.length; i++) {
      snappingPoints[i] = i * segmentLength;
    }
    const [x, i] = snap(snappingPoints)(offset);
    return { x, i };
  }
};
