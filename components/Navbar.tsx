import { Box, Center, Flex, HStack, Icon, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { GiHollowCat } from "react-icons/gi";

import { MotionBox, MotionHStack } from "./Motion";

const rotateVariants = {
  initial: {
    rotate: -35,
  },
  hover: {
    rotate: 0,
  },
};

const Navbar = () => {
  const router = useRouter();

  const paths = [
    { path: "/works", label: "Works" },
    { path: "/posts", label: "Posts" },
    { path: "https://github.com/YuenSC", label: "Source", isExternal: true },
  ];

  return (
    <Flex py={4} px={4} color="white">
      {/* Icon */}

      <MotionHStack
        cursor={"pointer"}
        initial="initial"
        whileHover="hover"
        align={"center"}
      >
        <MotionBox variants={rotateVariants} pt={2}>
          <Icon as={GiHollowCat} w={6} h={6} />
        </MotionBox>

        <NextLink href={"/"} passHref>
          <Link
            userSelect={"none"}
            fontWeight={"bold"}
            fontSize="2xl"
            letterSpacing={"-1px"}
            _hover={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
          >
            Calvin Yuen
          </Link>
        </NextLink>
      </MotionHStack>

      {/* Nav Item */}

      <HStack
        align={"center"}
        ml={12}
        spacing={6}
        // display={{ base: "none", lg: "block" }}
      >
        {paths.map(({ path, label, isExternal }) => {
          const isCurrentPath = router.pathname === path;
          return (
            <NextLink key={path} href={path} passHref>
              <Link
                as={Center}
                px={4}
                h={"14"}
                textAlign="center"
                fontSize={"xl"}
                _active={{ bgColor: "green.500", color: "black" }}
                isExternal={isExternal}
                {...(isCurrentPath && {
                  bgColor: "green.500",
                  color: "black",
                })}
              >
                {label}
              </Link>
            </NextLink>
          );
        })}
      </HStack>

      {/* Dark mode switch */}

      {/* Mobile Nav Menu */}
    </Flex>
  );
};

export default Navbar;
