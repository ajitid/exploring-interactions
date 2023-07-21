// segmented control that can accept any combo of bg/fg and bg-accent/fg-accent color
// from: https://twitter.com/samselikoff/status/1649428055390035970?s=20
// and https://twitter.com/raunofreiberg/status/1649440795357851648?s=20

// mine one doesn't work properly in Firefox (Chrome and Safari are fine)
// - initial alignment for the right side is wrong
// - clips off the corner radius at right side
// - (all browsers:) because it fixes left and right clip bounds based on text size of each SegmentedControlButton, zooming in and out breaks the UI
// However, segemented control in "Built for global customers" under
// https://stripe.com/en-in/payments/checkout#:~:text=Built%20for%20global%20customers
// does work properly in Firefox. Investigate this.

// https://m3.material.io/components/segmented-buttons/overview
// https://developer.apple.com/design/human-interface-guidelines/segmented-controls

// Related: note that we didn't require a refmap (mulitple refs) in this file, but if we did, we could track them using this way:
// https://github.com/pmndrs/react-spring/blob/main/demo/src/sandboxes/notification-hub/src/App.tsx#L31

import {
  cloneElement,
  useState,
  Children,
  ReactElement,
  useRef,
  forwardRef,
  useEffect,
  ReactNode,
} from "react";
import cn from "clsx";
import { animate, motion } from "framer-motion";
import { useMotionValue } from "framer-motion";
import { useMotionTemplate } from "framer-motion";

const buttons = ["World", "N. Y.", "Business", "Arts", "Science"];

export const SegmentedControlDemo = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white flex flex-center flex-col pb-16">
      <SegmentedControl>
        {buttons.map((title, idx) => (
          <SegmentedControlButton
            key={idx}
            selected={selected === idx}
            onClick={() => setSelected(idx)}
          >
            {title}
          </SegmentedControlButton>
        ))}
      </SegmentedControl>
    </div>
  );
};

interface SegmentedControlProps {
  children: ReactElement<SegmentedControlButtonProps>[];
}

const SegmentedControl = (props: SegmentedControlProps) => {
  // find the selected button so we can attach ref to it
  const selectedRef = useRef<HTMLLIElement>(null);
  const selectedIndex = Children.toArray(props.children).findIndex((child) => {
    const typedChild = child as unknown as ReactElement<SegmentedControlButtonProps>;
    return typedChild.props.selected;
  });

  const leftMV = useMotionValue(0);
  const rightMV = useMotionValue(0);
  const clipPath = useMotionTemplate`inset(0px ${rightMV}px 0px ${leftMV}px round 9999px)`;
  useEffect(() => {
    const selected = selectedRef.current;
    const parent = selected?.offsetParent ?? null;
    if (selected === null || parent === null) return;

    const left = selected.offsetLeft;
    const right = parent.clientWidth - selected.offsetLeft - selected.offsetWidth;
    animate(leftMV, left);
    animate(rightMV, right);
  }, [selectedIndex, leftMV, rightMV]);

  const blueStrip = Children.toArray(props.children).map((child, idx) => {
    const typedChild = child as unknown as ReactElement<SegmentedControlButtonProps>;

    return cloneElement(typedChild, {
      className: "bg-[unset] hover:bg-[unset]",
      ...(selectedIndex === idx && {
        ref: selectedRef,
      }),
    });
  });

  return (
    <div className="relative">
      <ol className="max-w-4xl grid grid-flow-col gap-x-1">{props.children}</ol>
      <motion.ol
        style={{ clipPath }}
        className="max-w-4xl grid grid-flow-col gap-x-1 bg-blue-400 text-black absolute inset-0"
      >
        {blueStrip}
      </motion.ol>
    </div>
  );
};

interface SegmentedControlButtonProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => unknown;
  className?: string;
}
const SegmentedControlButton = forwardRef<HTMLLIElement, SegmentedControlButtonProps>(
  (props, ref) => {
    return (
      // these better be html `button`
      <li
        ref={ref}
        onClick={props.onClick}
        className={cn(
          "cursor-pointer font-semibold px-5 py-1 rounded-full min-w-[8ch] flex flex-center",
          "hover:bg-zinc-900",
          props.selected && "bg-zinc-900",
          props.className
        )}
      >
        {props.children}
      </li>
    );
  }
);
