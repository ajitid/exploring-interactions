import { Variants, motion } from "framer-motion";
import { useState } from "react";

export const Playground = () => {
  // animate certain properties, not all
  const [variant, setVariant] = useState("bigger");
  const toggle = () => {
    setVariant((v) => (v === "normal" ? "bigger" : "normal"));
  };

  const variants: Variants = {
    normal: {
      x: 0,
      scale: 1,
    },
    bigger: {
      x: 200,
      scale: 3,
    },
  };

  return (
    <div>
      <button onClick={toggle}>Yas btn</button>
      <motion.div
        initial={{ x: 200, scale: 1 }}
        variants={variants}
        animate={variant}
        className="bg-pink-600 w-32 h-32"
      ></motion.div>
    </div>
  );
};
