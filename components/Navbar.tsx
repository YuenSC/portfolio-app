import { Box, Container, HStack, Icon, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
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

const Navbar: FC<{ onToggleFullScreen: () => void }> = () => {
  const router = useRouter();

  const paths = [
    { path: "/works", label: "Works" },
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
      className="hidden-print"
      w="100%"
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
                  flex={1}
                  px={4}
                  textAlign="center"
                  fontSize={"xl"}
                  userSelect={"none"}
                  outline="none"
                  _focus={{ boxShadow: "none" }}
                  _hover={{ textDecoration: "none" }}
                  isExternal={isExternal}
                  position="relative"
                >
                  <Text
                    fontWeight={isCurrentPath ? "bold" : "normal"}
                    textShadow="0 0 0.01px black"
                  >
                    {label}
                  </Text>
                  {isCurrentPath && (
                    <Box
                      w={8}
                      h={8}
                      bgColor={"darkOrange"}
                      position={"absolute"}
                      zIndex={-1}
                      borderRadius={"50%"}
                      top={"50%"}
                      left={"50%"}
                      transform={"translate(-50%, -50%)"}
                    />
                  )}
                </Link>
              </NextLink>
            );
          })}
        </HStack>
      </HStack>
    </Container>
  );
};

export default Navbar;
