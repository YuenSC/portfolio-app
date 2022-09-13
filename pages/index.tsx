import {
  Box,
  HStack,
  Heading,
  ListItem,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
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
      <Stack spacing={20}>
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
            {...(isShowingAnimation && {
              flexDirection: "column-reverse",
              h: "100%",
              justifyContent: "center",
            })}
          >
            <Stack>
              <Text fontSize={"6xl"} fontWeight={"bold"}>
                {isShowingAnimation ? "Welcome to Calvin Web" : "Calvin Yuen"}
              </Text>

              <Text
                fontSize={"2xl"}
                {...(isShowingAnimation && { display: "none" })}
              >
                React, HTML, CSS, JS
              </Text>
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
          <IntroSection title="Contact">
            <Text fontSize={"2xl"}>scyuenab@gmail.com</Text>
          </IntroSection>
          <IntroSection title="Intro">
            <Text>
              After graduating from HKUST, I started my career as a Web
              Developer in Talkbox Limited from Aug 2021 to Aug 2022. Most of my
              work is to build console app for its internal products and
              project. Currently, I am learning React Native to discover more
              about the frontend world.
            </Text>
          </IntroSection>
          <IntroSection title="Bios">
            <TableContainer>
              <Table variant={"unstyled"}>
                <Tbody>
                  <BioListItemRow year="Current">
                    <Stack spacing={2}>
                      <Text>Worked as Web Developer in TalkBox Limited</Text>
                      <UnorderedList pl="8">
                        <ListItem>
                          <Text fontSize={"md"} color="gray.500">
                            React v17.0 for building Airside Property Management
                            console app from scratch (Web part only)
                          </Text>
                        </ListItem>
                      </UnorderedList>
                    </Stack>
                  </BioListItemRow>
                  <BioListItemRow year="2021">
                    HKUST Degree in Electronic Engineering with IT minor (First
                    Class Honor)
                  </BioListItemRow>
                  <BioListItemRow year="1999">Born</BioListItemRow>
                </Tbody>
              </Table>
            </TableContainer>
          </IntroSection>
        </Stack>
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
      <MotionBox
        initial="hidden"
        whileInView="visible"
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
    <Tr>
      <Td verticalAlign={"top"} pl="0">
        <Text fontSize={"xl"} fontWeight={"bold"}>
          {year}
        </Text>
      </Td>
      <Td whiteSpace="pre-wrap">
        <Text fontSize={"xl"}>{children}</Text>
      </Td>
    </Tr>
  );
};

export default Home;
