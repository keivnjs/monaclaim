import React, { useEffect, useState } from "react";
import Link from "next/link";
import { classNames } from "shared/utils/classNames";
import VideoBorderIcon from "components/elements/Icons/VideoBorder";
import Button from "components/elements/Buttons";
import { useRouter } from "next/router";

const CountDownTimer: React.FC<{ className?: string }> = (props) => {
  const router = useRouter()
  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date(1651860000000);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {partyTime ? (
        <div className="space-x-4">
          <Button className="!w-60 h-12 mt-4 uppercase font-bold text-lg" variant="primary" onClick={() => router.push('/claim')}>
            Claim Voxel Now!
          </Button>
          <Button className="!w-44 h-12 mt-4 uppercase font-bold text-lg" variant="secondary" onClick={() => router.push('/mint')}>
            Mint
          </Button>
        </div>
      ) : (
        <div className="relative">
          <VideoBorderIcon className="h-40 sm:h-44" />
          <div
            className={classNames(
              "z-50 flex items-center justify-center text-6xl text-center",
              `${props.className}`
            )}
          >
            <div className="p-1 mx-1 text-yellow-100 md:bg-yellow-800 md:border-2 md:border-yellow-700 md:rounded-lg">
              <div className="text-3xl leading-none">{days}</div>
              <div className="text-sm leading-none uppercase">Days</div>
            </div>
            <div className="p-1 mx-1 text-yellow-100 md:bg-yellow-800 md:border-2 md:border-yellow-700 md:rounded-lg">
              <div className="text-3xl leading-none">{hours}</div>
              <div className="text-sm leading-none uppercase">Hours</div>
            </div>
            <div className="p-1 mx-1 text-yellow-100 md:bg-yellow-800 md:border-2 md:border-yellow-700 md:rounded-lg">
              <div className="text-3xl leading-none">{minutes}</div>
              <div className="text-sm leading-none uppercase">Minutes</div>
            </div>
            <div className="p-1 mx-1 text-yellow-100 md:bg-yellow-800 md:border-2 md:border-yellow-700 md:rounded-lg">
              <div className="text-3xl leading-none">{seconds}</div>
              <div className="text-sm leading-none uppercase">Seconds</div>
            </div>
          </div>
          <span className="absolute z-20 top-[5%] text-white inset-1">
            Claim KNIGHTS Voxel Starts In
          </span>
        </div>
      )}
    </>
  );
};

export default CountDownTimer;
