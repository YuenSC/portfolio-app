import {
  Center,
  Grid,
  GridItem,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { FC } from "react";

import Page from "./../components/Page";
import { MyDomain } from "./../util/constant";
import sideProject1 from "../public/sideProject1.gif";

const Works: NextPage = () => {
  return (
    <Page>
      <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={10}>
        <GridItem>
          <ScaleUpBox>
            <ImageLink
              href="https://parallax-demo-waterworld.vercel.app"
              imgSrc={sideProject1}
            />
            <Text textAlign={"center"} fontSize="xl">
              Parallax Demo
            </Text>
          </ScaleUpBox>
        </GridItem>
      </Grid>
    </Page>
  );
};

const ImageLink: FC<{
  href?: string;
  imgSrc?: string | StaticImageData;
}> = ({ href = MyDomain, imgSrc }) => {
  const border = useColorModeValue("none", "1px solid white");

  const bg = useColorModeValue("gray.300", "gray.500");

  return (
    <NextLink href={href} passHref>
      <Link
        textAlign="center"
        fontSize={"xl"}
        userSelect={"none"}
        isExternal={true}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Center
          h="300px"
          bg={bg}
          pos="relative"
          border={border}
          borderRadius={16}
          overflow="hidden"
        >
          {imgSrc ? (
            <Image src={imgSrc} alt="post image" layout="fill" />
          ) : (
            "Coming Soon"
          )}
        </Center>
      </Link>
    </NextLink>
  );
};

const ScaleUpBox: FC = ({ children }) => {
  return (
    <Stack
      _hover={{
        transform: "scale(1.05)",
      }}
      transition="all 0.3s"
    >
      {children}
    </Stack>
  );
};

export default Works;
