// from https://www.youtube.com/watch?v=laPsceJ4tTY&t=703s
// and https://github.com/aholachek/mobile-first-animation/blob/master/src/utilities.js

// There's https://twitter.com/dot_louis/status/1088402000688148480
// but I don't know if rubberbanding is available outside of framer-motion or not and
// I don't know how it works either so I'm putting this in

// code copied as is with types added...

// https://twitter.com/chpwn/status/285540192096497664
// iOS constant = 0.55
export const rubberband = (distance: number, dimension: number, constant = 0.15) => {
  return (distance * dimension * constant) / (dimension + constant * distance);
};

// https://medium.com/@nathangitter/building-fluid-interfaces-ios-swift-9732bb934bf5
export const rubberband2 = (offset: number, constant = 0.7) => Math.pow(offset, constant);

export const rubberBandIfOutOfBounds = (
  min: number,
  max: number,
  delta: number,
  constant: number
) => {
  if (delta < min) {
    return -rubberband(min - delta, max - min, constant) + min;
  }
  if (delta > max) {
    return rubberband(delta - max, max - min, constant) + max;
  }
  return delta;
};
