import { HStack, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <HStack mb={4} align="center">
      <Text>All rights reserved. © 2024 Calvin Yuen</Text>
      <Link
        isExternal
        href="https://www.linkedin.com/in/sing-chun-yuen-423a09185/"
        mb={0}
        width={"20px"}
        height={"20px"}
      >
        <Image
          width={20}
          height={20}
          src="/linkedinLogo.svg"
          alt="LinkedIn link"
        />
      </Link>
    </HStack>
  );
};

export default Footer;
