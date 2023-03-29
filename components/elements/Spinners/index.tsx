import React from "react";
import { classNames } from "shared/utils/classNames";

interface Props {
  className?: string;
}

export const Spinner = (props: Props) => {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={classNames("animate-spin", className)}
      fill="none"
      viewBox="0 0 66 66"
    >
      <circle
        cx="33"
        cy="33"
        fill="none"
        r="28"
        stroke="currentColor"
        strokeWidth="10"
        className="opacity-30"
      ></circle>
      <circle
        cx="33"
        cy="33"
        fill="none"
        r="28"
        stroke="currentColor"
        strokeDasharray="40, 134"
        strokeDashoffset="325"
        strokeLinecap="round"
        strokeWidth="10"
        className="opacity-70"
      ></circle>
    </svg>
  );
};
