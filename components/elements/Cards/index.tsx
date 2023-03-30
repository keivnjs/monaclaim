import React from "react";
import { classNames } from "shared/utils/classNames";

interface Props {
  className?: string;
}

export const Card: React.FC<Props> = (props) => {
  const { className, children } = props;

  return (
    <div className={classNames("relative", className)}>
      <img src="/assets/borders/staking-board.png" className="w-full h-full" />
      <div className="absolute inset-8">
        <>{children}</>
      </div>
    </div>
  );
};
