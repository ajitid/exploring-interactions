// custom stagger that animates all children within x seconds
// src: https://twitter.com/jods16/status/1526882199160688640 (archived as well on archive.org/web as it has docs)
// demo: https://i.imgur.com/75hDGbM.mp4
// alternatively, one can write a stagger fn that decrementally reduces the stagger duration for each successive child in the list

export const expStagger = (start: number, max: number) => {
  const rate = 1 - start / max;
  return (n: number) => (start * (1 - rate ** (n + 1))) / (1 - rate);
};
