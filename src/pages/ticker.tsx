// from https://twitter.com/mattgperry/status/1556649624735195137

import {
  ForwardRefComponent,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  motion,
} from "framer-motion";
import { forwardRef, useLayoutEffect, useState, useRef } from "react";
import useMeasure from "react-use-measure";

export const TickerPage = () => {
  return (
    <div className="mt-[88vh]">
      <Ticker component={Text} />
      <Ticker component={Colors} velocity={80} disableScrollEffect />
    </div>
  );
};

interface TickerProps<T> {
  component: ForwardRefComponent<T, unknown>;
  /**
   * Velocity of the ticker
   *
   * @defaultValue `-80`
   */
  velocity?: number;
  /**
   * Greater the factor, greater the change in speed of ticker while scrolling.
   * If `disableScrollEffect` is `true`, changing this won't affect anything.
   *
   * @defaultValue `5`
   */
  velocityFactorWhileScrolling?: number;
  disableScrollEffect?: boolean;
}

const Ticker = <T extends HTMLElement = HTMLElement>({
  component: Component,
  velocity: baseVelocity = -80,
  velocityFactorWhileScrolling = 5,
  disableScrollEffect = false,
}: TickerProps<T>) => {
  const [winWidth] = useWindowSize();
  const [ref, { width }] = useMeasure();

  // repetitions to fill up the screen + 1 extra to fill up the empty space that appears while animating
  const _minRepetitionsRequired = Math.floor(winWidth / width) + 1;
  const minRepetitionsRequired = Number.isFinite(_minRepetitionsRequired)
    ? _minRepetitionsRequired
    : 0;
  const repetitions = [];
  for (let i = 0; i < minRepetitionsRequired; i++) {
    repetitions.push(<Component key={i} />);
  }

  const baseX = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    [0, 1000],
    [0, velocityFactorWhileScrolling],
    {
      clamp: false,
    }
  );

  const x = useTransform(baseX, (v) => `${wrap(0, -width, v)}px`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (!disableScrollEffect) {
      /**
       * This is what changes the direction of the scroll once we
       * switch scrolling directions.
       */
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden">
      <motion.div initial={false} className="flex" style={{ x }}>
        <Component ref={ref} />
        {repetitions}
      </motion.div>
    </div>
  );
};

const Text = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="px-3 py-2 bg-slate-200 shrink-0">
      [Scroll up/down]
    </div>
  );
});

const Colors = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="shrink-0 flex">
      <div className="p-2 bg-fuchsia-100">|</div>
      <div className="p-2 bg-fuchsia-200">-</div>
      <div className="p-2 bg-fuchsia-300"></div>
    </div>
  );
});

function useWindowSize() {
  const [size, setSize] = useState<[width: number, height: number]>([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
