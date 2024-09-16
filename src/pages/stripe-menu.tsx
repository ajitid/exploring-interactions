// inspo:
// https://web.archive.org/web/20190411031427/https://stripe.com/

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";

export const StripeMenu = () => {
  const [hoveringOn, setHoveringOn] = useState(-1);

  return (
    // what if a banner if added here, does it still work?
    <div className="flex justify-center pt-4">
      {/* LayoutGroup is not reqd, only added for namespacing */}
      <LayoutGroup id="header-menu">
        <nav className="flex">
          <motion.div
            className="relative pr-6"
            onHoverStart={() => setHoveringOn(0)}
            onHoverEnd={() => setHoveringOn(-1)}
          >
            <div>Products</div>
            <AnimatePresence>
              {hoveringOn === 0 && (
                <motion.div
                  initial={{ opacity: 0, rotateX: "12deg" }}
                  animate={{ opacity: 1, rotateX: "0deg" }}
                  exit={{ opacity: 0, rotateX: "12deg" }}
                  layoutId="submenu"
                  className="p-2 bg-slate-200"
                >
                  <motion.div
                  // initial={{ x: -30, opacity: 0 }}
                  // animate={{ x: 0, opacity: 1 }}
                  // exit={{ x: 30, opacity: 0 }}
                  // transition={{ duration: 0.7 }}
                  >
                    blah
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div
            className="relative pr-6"
            onHoverStart={() => setHoveringOn(1)}
            onHoverEnd={() => setHoveringOn(-1)}
          >
            <div>Developers</div>
            <AnimatePresence>
              {hoveringOn === 1 && (
                <motion.div layoutId="submenu" className=" p-2 bg-slate-200">
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 30, opacity: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <div>meh</div>
                    <div>meh</div>
                    <div>meh</div>
                    <div>meh</div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div
            className="relative"
            onHoverStart={() => setHoveringOn(2)}
            onHoverEnd={() => setHoveringOn(-1)}
          >
            <div>Company</div>
            {hoveringOn === 2 && (
              <motion.div layoutId="submenu" className="absolute mx-auto">
                blah
              </motion.div>
            )}
          </motion.div>
        </nav>
      </LayoutGroup>
    </div>
  );
};
