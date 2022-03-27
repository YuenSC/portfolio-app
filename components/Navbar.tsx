import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Center,
  Container,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { GiBarbedSun, GiHollowCat, GiMoon, GiSpikesFull } from "react-icons/gi";

import { MotionBox, MotionHStack } from "./Motion";

const rotateVariants = {
  initial: {
    rotate: -35,
  },
  hover: {
    rotate: 0,
  },
};

const Navbar: FC<{ onToggleFullScreen: () => void }> = ({
  onToggleFullScreen,
}) => {
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();
  const navLinkBgColor = useColorModeValue("green.200", "green.500");

  const paths = [
    { path: "/works", label: "Works" },
    { path: "/posts", label: "Posts" },
    {
      path: "https://github.com/YuenSC/portfolio-app",
      label: "Source",
      isExternal: true,
    },
  ];

  return (
    <Container
      maxW="container.lg"
      pos="fixed"
      top={0}
      left={"50%"}
      transform="translateX(-50%)"
      zIndex={"overlay"}
    >
      <HStack
        py={4}
        px={4}
        justifyContent="space-between"
        backdropFilter={"blur(5px)"}
        w="100%"
      >
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
          spacing={6}
          display={{ base: "none", lg: "flex" }}
        >
          {paths.map(({ path, label, isExternal }) => {
            const isCurrentPath = router.pathname === path;
            return (
              <NextLink key={path} href={path} passHref>
                <Link
                  px={4}
                  textAlign="center"
                  fontSize={"xl"}
                  userSelect={"none"}
                  _active={{ bgColor: navLinkBgColor, color: "black" }}
                  isExternal={isExternal}
                  {...(isCurrentPath && {
                    bgColor: navLinkBgColor,
                    color: "black",
                  })}
                >
                  <Center h={"14"}>{label}</Center>
                </Link>
              </NextLink>
            );
          })}
        </HStack>

        {/* Dark mode switch */}
        <HStack>
          {/* Full Screen Toggle */}
          <IconButton
            size="lg"
            aria-label="Toggle Full Screen"
            onClick={onToggleFullScreen}
            icon={<Icon as={GiSpikesFull} w={8} h={8} />}
          />
          <IconButton
            size="lg"
            aria-label="Search database"
            onClick={toggleColorMode}
            icon={
              colorMode === "light" ? (
                <Icon as={GiMoon} w={8} h={8} />
              ) : (
                <Icon as={GiBarbedSun} w={8} h={8} />
              )
            }
          />

          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              size="lg"
              icon={<HamburgerIcon w={8} h={8} />}
              display={{ base: "block", lg: "none" }}
            >
              Actions
            </MenuButton>
            <MenuList>
              {paths.map(({ path, label, isExternal }) => {
                return (
                  <MenuItem key={path}>
                    <NextLink href={path} passHref>
                      <Link w="100%" h="100%" isExternal={isExternal}>
                        {label}
                      </Link>
                    </NextLink>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          {/* Mobile Nav Menu */}
        </HStack>
      </HStack>
    </Container>
  );
};

export default Navbar;
