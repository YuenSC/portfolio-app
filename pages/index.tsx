import {
  Box,
  Container,
  Grid,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { FC } from "react";

import { MotionBox } from "../components/Motion";
import Page from "../components/Page";

const Home: NextPage = () => {
  const welcomeLineBgColor = useColorModeValue(
    "blackAlpha.200",
    "whiteAlpha.200"
  );

  const avatorBorderColor = useColorModeValue("black", "white");

  return (
    <Page>
      <Stack spacing={16}>
        {/* Full Page Header*/}
        <VStack w="100%">
          {/* ---Three js Background just a Image now   */}
          {/* Need studys */}
          <Box pos="relative" w="100%" h="50vh">
            <Image
              src="/matt-howard-UCDiLtfDRgU-unsplash.webp"
              alt="Picture of the author"
              layout="fill"
              priority={true}
            />
          </Box>
          {/* ---Welcome Line */}

          {/* https://codepen.io/rachsmith/pen/BNKJme */}
          <MotionBox>
            <Text
              fontSize={"2xl"}
              borderWidth="1px"
              borderRadius={"3xl"}
              bgColor={welcomeLineBgColor}
              w="100%"
              textAlign={"center"}
              p={4}
            >
              Welcome! I am a web developer based in Hong Kong
            </Text>
          </MotionBox>

          {/* ---Intro and Avatar  */}
          <HStack w="100%" justifyContent={"space-between"}>
            <Stack>
              <Text fontSize={"6xl"} fontWeight={"bold"}>
                Calvin Yuen
              </Text>

              <Text fontSize={"2xl"}>React, HTML, CSS, JS</Text>
            </Stack>
            <Box
              pos="relative"
              h="150px"
              w="150px"
              borderRadius={"full"}
              overflow="hidden"
              borderWidth={"2px"}
              borderColor={avatorBorderColor}
            >
              <Image
                src="/self-photo.jpg"
                alt="Picture of the author"
                layout="fill"
                priority={true}
              />
            </Box>
          </HStack>
        </VStack>

        {/* Bio */}
        <Stack spacing={8}>
          <IntroSection title="Works">
            <Text>
              After graduating from HKUST , I started my career as a Web
              Developer in Talkbox Limited in Aug 2021. Currently, I am building
              console app for its internal products and project. Therefore, it
              is sad that I cannot show you publicly what is creating in my
              work. I would try to build some side projects in my spare time and
              hope that you can already see those project here.
            </Text>
          </IntroSection>
          <IntroSection title="Bios">
            <Grid templateColumns="100px 1fr" rowGap={4}>
              <BioListItem year="Current">
                Worked as Web Developer in TalkBox Limited
              </BioListItem>
              <BioListItem year="2021">
                HKUST Degree in Electronic Engineering with IT minor (First
                Class Honor)
              </BioListItem>
              <BioListItem year="1999">Born</BioListItem>
            </Grid>
          </IntroSection>
        </Stack>

        {/* Contact */}
      </Stack>
    </Page>
  );
};

const IntroSection: FC<{ title: string }> = ({ title, children }) => {
  const welcomeLineBgColor = useColorModeValue(
    "blackAlpha.200",
    "whiteAlpha.200"
  );

  return (
    <Stack>
      <Heading
        borderColor={welcomeLineBgColor}
        borderBottom={"4px"}
        w="fit-content"
        fontSize={"2xl"}
      >
        {title}
      </Heading>
      {children}
    </Stack>
  );
};

const BioListItem: FC<{ year: string }> = ({ year, children }) => {
  return (
    <>
      <Text fontSize={"xl"} fontWeight={"bold"}>
        {year}
      </Text>
      <Text fontSize={"xl"}>{children}</Text>
    </>
  );
};

export default Home;
