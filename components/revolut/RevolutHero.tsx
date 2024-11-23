"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Revolut from "@/public/Revolut.jpg";
import { memo, useEffect, useState } from "react";
import {
  DynamicAnimationOptions,
  motion,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const springConfig: DynamicAnimationOptions = {
  stiffness: 300,
  damping: 30,
  bounce: 100,
};

// https://www.revolut.com/
const RevolutHero = () => {
  const { setTheme } = useTheme();
  const [scope, animate] = useAnimate();

  const { scrollYProgress } = useScroll({});
  const [isAnimationTriggered, setIsAnimationTriggered] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 0) {
      setIsAnimationTriggered(false);
      animate(
        "#white-container",
        {
          width: "300px",
          height: "70vh",
          borderWidth: "2px",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          borderBottomWidth: "0px",
        },
        springConfig,
      );
      return;
    }
    if (isAnimationTriggered) return;

    document.body.style.overflow = "hidden";
    setIsAnimationTriggered(true);
  });

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  useEffect(() => {
    if (!isAnimationTriggered) return;

    const playbackControls = animate(
      "#white-container",
      {
        width: "100%",
        height: "100%",
        borderRadius: 0,
        borderWidth: "0px",
      },
      springConfig,
    );
    playbackControls.then(() => {
      document.body.style.overflow = "auto";
    });
  }, [animate, isAnimationTriggered]);

  return (
    <div className="h-screen w-full" ref={scope}>
      <style jsx global>{`
        body {
          background-color: white;
        }
      `}</style>

      <div id="image-container" className="relative h-full w-full">
        <Image
          src={Revolut}
          alt="Revolut Background"
          fill
          className="object-fill"
        />
        <div
          id="white-container"
          className={cn(
            "absolute bottom-0 left-1/2 h-[70vh] w-[300px] -translate-x-1/2 overflow-hidden rounded-b-none rounded-t-lg border-b-0 bg-white",
            "border-2 border-gray-400",
            "flex items-center justify-center",
          )}
        >
          <div className="h-[70vh] w-[300px] flex-none bg-red-50"></div>
          <div className="h-[70vh] w-[300px] flex-none bg-green-50"></div>
          <div className="h-[70vh] w-[300px] flex-none bg-blue-50"></div>
        </div>
      </div>

      <div className="h-screen bg-white" />
    </div>
  );
};

export default memo(RevolutHero);
