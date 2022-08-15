import {
  Box,
  BoxProps,
  Center,
  ChakraProvider,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { forwardRef, useRef } from "react";

import theme from "./../styles/theme";
import Navbar from "../components/Navbar";

const Layout = forwardRef<HTMLDivElement, BoxProps>(({ children }, ref) => {
  const bgColor = useColorModeValue("rgb(240, 231, 219)", "rgb(32,32,35)");
  const color = useColorModeValue("black", "white");

  return (
    <Box ref={ref} bgColor={bgColor} color={color} minH="100vh" h="100%">
      {children}
    </Box>
  );
});

Layout.displayName = "Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onToggleFullScreen = () => {
    if (!ref.current || !document) return;

    const fullscreenElement = document.fullscreenElement;

    !fullscreenElement && ref.current.requestFullscreen();
    fullscreenElement && document.exitFullscreen();
  };

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Calvin Yuen Personal Website</title>
      </Head>
      <Layout ref={ref}>
        <Navbar onToggleFullScreen={onToggleFullScreen} />

        <Container maxW="container.md" pt={40}>
          <Component {...pageProps} />
          <Center py={10}>© 2022 Calvin Yuen. All Rights Reserved</Center>
        </Container>
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
