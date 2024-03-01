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
      <Text fontSize="4xl" fontWeight="bold" mb={4}>
        Side Project
      </Text>
      <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={10}>
        <GridItem>
          <ScaleUpBox>
            <ImageLink
              href="https://resume-creator-calvin-yuen.vercel.app/"
              imgSrc={"/resume-creator.png"}
            />
            <Text textAlign={"center"} fontSize="xl">
              Resume Creator (Next.js)
            </Text>
            <Text textAlign={"center"} fontSize="sm" mt={0} color="gray.500">
              Last Update: 2024 MAR
            </Text>
          </ScaleUpBox>
        </GridItem>
      </Grid>
      <Text fontSize="4xl" fontWeight="bold" my={8}>
        Basic HTML CSS Demo
      </Text>
      <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={10}>
        <GridItem>
          <ScaleUpBox>
            <ImageLink
              href="https://line-clone-five.vercel.app/"
              imgSrc={"/sideProject2.png"}
            />
            <Text textAlign={"center"} fontSize="xl">
              Line Product Page Clone (Partial)
            </Text>
            <Text textAlign={"center"} fontSize="sm" mt={0} color="gray.500">
              Last Update: 2022
            </Text>
          </ScaleUpBox>
        </GridItem>

        <GridItem>
          <ScaleUpBox>
            <ImageLink
              href="https://parallax-demo-waterworld.vercel.app"
              imgSrc={sideProject1}
            />
            <Text textAlign={"center"} fontSize="xl">
              Parallax Demo
            </Text>
            <Text textAlign={"center"} fontSize="sm" mt={0} color="gray.500">
              Last Update: 2021
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
        borderRadius={16}
        overflow="hidden"
      >
        <Center h="300px" bg={bg} pos="relative">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt="post image"
              layout="fill"
              objectFit="cover"
            />
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
      spacing={0}
      transition="all 0.3s"
    >
      {children}
    </Stack>
  );
};

export default Works;
