import clsx from "clsx";

export const tw = (...classNames: (string | boolean | undefined)[]) => {
  return clsx(...classNames);
};