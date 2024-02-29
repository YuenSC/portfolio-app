import {
  Box,
  HStack,
  keyframes,
  TextProps,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";

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
  const animation = useColorModeValue(
    `${darkAnimationKeyframes} 1s ease-in-out 1`,
    `${lightAnimationKeyframes} 1s ease-in-out 1`
  );

  return (
    <HStack
      spacing={0}
      onMouseEnter={() => {
        console.log("first");
        setKey(new Date().toISOString());
      }}
    >
      {title.split("").map((char, index) => {
        console.log(char);
        return (
          <Box
            key={char + index + key}
            minW="3"
            animation={animation}
            style={{
              animationDelay:
                ((index + Math.floor(Math.random() * 3)) % 3) * 0.3 + "s",
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