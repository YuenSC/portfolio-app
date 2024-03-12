import {
  Box,
  Grid,
  GridItem,
  HStack,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { IconType } from "react-icons";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Page from "./../components/Page";

const Works: NextPage = () => {
  return (
    <Page>
      <Text fontSize="4xl" fontWeight="bold" mb={4}>
        Side Project
      </Text>
      <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={10}>
        <GridItem>
          <Card
            title="Resume Creator (Next.js 14 + tailwindcss + shadcn/ui)"
            subtitle="Last Update: 2024 MAR"
            imgSrc={"/resume-creator.png"}
            links={[
              {
                href: "https://resume-creator-calvin-yuen.vercel.app/",
                label: "Project",
                icon: FaExternalLinkAlt,
              },
              {
                href: "https://github.com/YuenSC/resume-maker",
                label: "Code",
                icon: FaGithub,
              },
            ]}
          />
        </GridItem>
      </Grid>
      <Text fontSize="4xl" fontWeight="bold" my={8}>
        Basic HTML CSS Demo
      </Text>
      <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={10}>
        <GridItem>
          <Card
            title="Line Product Page Clone (Next.js 12 + Chakra UI)"
            subtitle="Last Update: 2022"
            imgSrc={"/sideProject2.png"}
            links={[
              {
                href: "https://line-clone-five.vercel.app/",
                label: "Project",
                icon: FaExternalLinkAlt,
              },
              {
                href: "https://github.com/YuenSC/line-clone",
                label: "Code",
                icon: FaGithub,
              },
            ]}
          />
        </GridItem>

        <GridItem>
          <Card
            title="Parallax Demo (Next.js 12 + Chakra UI)"
            subtitle="Last Update: 2022"
            imgSrc={"/sideProject1.gif"}
            links={[
              {
                href: "https://parallax-demo-waterworld.vercel.app",
                label: "Project",
                icon: FaExternalLinkAlt,
              },
              {
                href: "https://github.com/YuenSC/parallax-demo-waterworld",
                label: "Code",
                icon: FaGithub,
              },
            ]}
          />
        </GridItem>
      </Grid>
    </Page>
  );
};

const Card = ({
  imgSrc,
  links,
  subtitle,
  title,
}: {
  imgSrc: string;
  links: {
    icon: IconType;
    href: string;
    label: string;
  }[];
  title: string;
  subtitle: string;
}) => {
  const bg = useColorModeValue("gray.300", "gray.500");

  return (
    <Box role="group">
      <Box h="300px" bg={bg} pos="relative" borderRadius="md" overflow="hidden">
        <Image src={imgSrc} alt="post image" layout="fill" objectFit="cover" />
        <HStack
          justifyContent="center"
          pos="absolute"
          w="100%"
          h="100%"
          spacing={8}
          bg="rgba(77,77,77,0.4)"
          transition="all 0.1s"
          transform="translateX(100%)"
          _groupHover={{
            transform: "translateX(0)",
          }}
          _focusWithin={{
            transform: "translateX(0)",
          }}
        >
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              userSelect={"none"}
              textDecoration="none"
              isExternal={true}
              color="gray.100"
            >
              <VStack spacing={0.5}>
                <Icon size={40} />
                <Text fontWeight="bold" fontSize="sm">
                  {label}
                </Text>
              </VStack>
            </Link>
          ))}
        </HStack>
      </Box>
      <Text textAlign={"center"} fontSize="xl" mt={2}>
        {title}
      </Text>
      <Text textAlign={"center"} fontSize="sm" mt={0} color="gray.500">
        {subtitle}
      </Text>
    </Box>
  );
};

export default Works;
