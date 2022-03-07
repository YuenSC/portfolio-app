import { Box, BoxProps, HStack, StackProps, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const MotionBox = motion<BoxProps>(Box);

export const MotionVStack = motion<StackProps>(VStack);

export const MotionHStack = motion<StackProps>(HStack);
