import {
  Box,
  HStack,
  keyframes,
  TextProps,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useCallback, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const darkAnimationKeyframes = keyframes`
  0% { color : black}
  50% { color : #7acbf0 }
  100% { color : black}
`;

const lightAnimationKeyframes = keyframes`
  0% { color : white}
  50% { color : #196486 }
  100% { color : white}
`;

type AnimatedTitleProps = TextProps & {
  title: string;
};

const AnimatedTitle = ({ title, ...props }: AnimatedTitleProps) => {
  const [key, setKey] = useState(new Date().toISOString());
  const isSetKeyRef = useRef(false);
  const { ref } = useInView({
    onChange: () => {
      setKey(new Date().toISOString());
    },
  });

  const animation = useColorModeValue(
    `${darkAnimationKeyframes} 1s ease-in-out 1`,
    `${lightAnimationKeyframes} 1s ease-in-out 1`
  );

  const shuffledArray = Array.from(
    { length: title.length },
    (_, i) => i + 1
  ).sort(() => Math.random() - 0.5);

  const handleMouseEnter = useCallback(() => {
    if (isSetKeyRef.current) return;
    setKey(new Date().toISOString());
    isSetKeyRef.current = true;
  }, []);

  return (
    <HStack ref={ref} spacing={0} onMouseEnter={handleMouseEnter}>
      {title.split("").map((char, index) => {
        return (
          <Box
            key={char + index + key}
            minW="3"
            animation={animation}
            onAnimationEnd={() => {
              isSetKeyRef.current = false;
            }}
            style={{
              animationDelay: shuffledArray[index] * 0.1 + "s",
            }}
            {...props}
          >
            {char}
          </Box>
        );
      })}
    </HStack>
  );
};

export default AnimatedTitle;
