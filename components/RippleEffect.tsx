"use client";

import { cn } from "@/lib/utils";
import { Variants, motion } from "framer-motion";
import {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";

type MotionState = {
  x: number;
  y: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
};

const InitialState = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  centerX: 0,
  centerY: 0,
} satisfies MotionState;

const getRelativeCoordinates = (
  event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  referenceElement: HTMLDivElement | null,
) => {
  if (!referenceElement) {
    return InitialState;
  }

  const position = {
    x: event.pageX,
    y: event.pageY,
  };

  const offset = {
    left: referenceElement.offsetLeft,
    top: referenceElement.offsetTop,
    width: referenceElement.clientWidth,
    height: referenceElement.clientHeight,
  };

  let reference = referenceElement.offsetParent as HTMLDivElement | null;

  while (reference) {
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent as HTMLDivElement | null;
  }

  return {
    x: position.x - offset.left,
    y: position.y - offset.top,
    width: offset.width,
    height: offset.height,
    centerX: (position.x - offset.left - offset.width / 2) / (offset.width / 2),
    centerY:
      (position.y - offset.top - offset.height / 2) / (offset.height / 2),
  };
};

const ball: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 0.3,
    scale: 20,
  },
};

const RippleEffect = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState<MotionState>(InitialState);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      setMousePosition(getRelativeCoordinates(e, boxRef.current));
    },
    [],
  );

  return (
    <motion.div
      ref={boxRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      initial="hidden"
      whileTap="visible"
    >
      <motion.div
        className="pointer-events-none absolute h-10 w-10 rounded-full bg-gray-700"
        animate={{
          x: mousePosition["x"] - 20,
          y: mousePosition["y"] - 20,
          transition: {
            duration: 0.1,
          },
        }}
        variants={ball}
      />
      {children}
    </motion.div>
  );
};

export default memo(RippleEffect);
