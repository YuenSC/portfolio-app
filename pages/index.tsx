import {
  Box,
  Flex,
  HStack,
  Heading,
  Link,
  ListItem,
  Stack,
  StackProps,
  Text,
  UnorderedList,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { FC, useState } from "react";

import { MotionBox } from "../components/Motion";
import Page from "../components/Page";

const Home: NextPage = () => {
  const [isShowingAnimation, setIsShowingAnimation] = useState(false);

  const avatorBorderColor = useColorModeValue("black", "white");

  return (
    <Page>
      {/* Full Page Header*/}
      <VStack
        w="100%"
        {...(isShowingAnimation && {
          pos: "absolute",
          inset: "0",
          bgColor: "orange.100",
          zIndex: "overlay",
        })}
      >
        {/* ---Intro and Avatar  */}
        <HStack
          w="100%"
          justifyContent={"space-between"}
          flexDirection={{ base: "column-reverse", lg: "row" }}
          textAlign={{ base: "center", lg: "left" }}
          {...(isShowingAnimation && {
            flexDirection: "column-reverse",
            h: "100%",
            justifyContent: "center",
          })}
          sx={{
            "@media print": {
              flexDirection: "row",
              textAlign: "left",
            },
          }}
        >
          <Stack spacing={0}>
            <Text fontSize={"6xl"} fontWeight={"bold"}>
              {isShowingAnimation ? "Welcome to Calvin Web" : "Calvin Yuen"}
            </Text>

            <Text
              fontSize={"2xl"}
              {...(isShowingAnimation && { display: "none" })}
            >
              React, HTML, CSS, Typescript
            </Text>
            <HStack
              fontSize={"md"}
              display="none"
              sx={{
                "@media print": {
                  display: "flex",
                },
              }}
            >
              <Text>Portfolio: </Text>
              <Link
                isExternal
                href="https://portfolio-app-teal.vercel.app/works"
              >
                https://portfolio-app-teal.vercel.app/works
              </Link>
            </HStack>
          </Stack>
          <Box
            pos="relative"
            h="150px"
            w="150px"
            borderRadius={"full"}
            overflow="hidden"
            borderWidth={"2px"}
            borderColor={avatorBorderColor}
            {...(isShowingAnimation && {
              borderRadius: "none",
              h: "200px",
              w: "200px",
            })}
            sx={{
              "@media print": {
                // paddingTop: 0,
                display: "none",
              },
            }}
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
      <Stack
        spacing={8}
        mt={10}
        sx={{
          "@media print": {
            // paddingTop: 0,
            mt: 5,
          },
        }}
      >
        <IntroSection title="Contact">
          <HStack>
            <Text>Email:</Text>
            <Text>scyuenab@gmail.com</Text>
          </HStack>
          <HStack>
            <Text>Phone:</Text>
            <Text>5168 7161</Text>
          </HStack>
        </IntroSection>
        <IntroSection title="Intro">
          <Text>
            After graduating from HKUST, I started my career as a Web Developer
            in Talkbox Limited from Aug 2021 to Aug 2022. Most of my work is to
            build console app for its internal products and project. I felt
            satisfied when created some interesting and valuable thing in
            frontend. Currently, I am learning React Native to discover more
            about the frontend world.
          </Text>
        </IntroSection>
        <IntroSection title="Bios">
          <BioListItemRow year="2022-2021">
            <Stack spacing={0}>
              <Text>
                Worked as Web Developer in{" "}
                <Link
                  href="https://talkbox.app/"
                  isExternal
                  color="blue.700"
                  textDecoration={"underline"}
                >
                  TalkBox Limited
                </Link>
              </Text>
              <UnorderedList pl="8">
                <ListItem>
                  <Text fontSize={"md"} color="gray.500">
                    React v17.0 for building Airside Property Management console
                    app from scratch (Web part only)
                  </Text>
                </ListItem>
              </UnorderedList>
            </Stack>
          </BioListItemRow>
          <BioListItemRow year="2021-2017">
            <Stack spacing={0}>
              <Text>
                The Hong Kong university of Science and Technology BEng in
                Electronic Engineering with IT minor (First Class Honor)
              </Text>
              <UnorderedList pl="8">
                <ListItem>
                  <Text fontSize={"md"} color="gray.500">
                    GGA : 3.815/4.3
                  </Text>
                </ListItem>
              </UnorderedList>
            </Stack>
          </BioListItemRow>
          <BioListItemRow year="1999">Born</BioListItemRow>
        </IntroSection>

        <IntroSection title="Language">
          <HStack>
            <Text>Cantonese :</Text>
            <Text>Native</Text>
          </HStack>
          <HStack>
            <Text>English :</Text>
            <Text>Conversational</Text>
          </HStack>
        </IntroSection>

        <IntroSection
          title="Additional Information"
          display={"none"}
          sx={{
            "@media print": {
              display: "block",
            },
          }}
        >
          <HStack>
            <Text>Availability :</Text>
            <Text>After October 2022</Text>
          </HStack>
          <HStack>
            <Text>Expected salary :</Text>
            <Text>HKD 28,000</Text>
          </HStack>
        </IntroSection>
      </Stack>
    </Page>
  );
};

const IntroSection: FC<{ title: string } & StackProps> = ({
  title,
  children,
  ...stackProps
}) => {
  const welcomeLineBgColor = useColorModeValue(
    "blackAlpha.200",
    "whiteAlpha.200"
  );

  return (
    <Stack {...stackProps}>
      <MotionBox
        initial="hidden"
        animate="visible"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}
      >
        <Heading
          borderColor={welcomeLineBgColor}
          borderBottom={"4px"}
          w="fit-content"
          fontSize={"2xl"}
        >
          {title}
        </Heading>
      </MotionBox>

      {children}
    </Stack>
  );
};

const BioListItemRow: FC<{ year: string }> = ({ year, children }) => {
  return (
    <Flex
      alignItems={"flex-start"}
      flexDirection={{ base: "column", lg: "row" }}
      sx={{
        "@media print": {
          flexDirection: "row",
        },
      }}
    >
      <Text fontSize={"xl"} fontWeight={"bold"} whiteSpace="nowrap" w="125px">
        {year}
      </Text>
      <Text
        fontSize={"xl"}
        mb={{ base: 5, lg: 0 }}
        flex={1}
        sx={{
          "@media print": {
            mb: 0,
          },
        }}
      >
        {children}
      </Text>
    </Flex>
  );
};

export default Home;
