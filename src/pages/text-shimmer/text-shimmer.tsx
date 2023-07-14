/*
An implementation of text shimmering effect that is used as a loading indicator by FB Paper: https://brianlovin.com/app-dissection/paper-facebook-ios
Photo: https://unsplash.com/photos/OQsxdghBKrU
*/

import cn from "clsx";

import css from "./text-shimmer.module.css";

export const TextShimmer = () => {
  return (
    <div className={cn("h-screen w-screen", css.body)}>
      <h1 className={css.heading}>Weather</h1>
    </div>
  );
};
