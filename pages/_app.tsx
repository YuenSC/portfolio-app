import "../global.css";

import {
  Box,
  BoxProps,
  ChakraProvider,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { forwardRef, useRef } from "react";
import Navbar from "../components/Navbar";
import theme from "./../styles/theme";

const Layout = forwardRef<HTMLDivElement, BoxProps>(({ children }, ref) => {
  const bgColor = useColorModeValue("rgb(240, 231, 219)", "rgb(32,32,35)");
  const color = useColorModeValue("black", "white");

  return (
    <Box
      ref={ref}
      bgColor={bgColor}
      color={color}
      minH="100vh"
      h="100%"
      sx={{
        "@media print": {
          bgColor: "white",
        },
      }}
    >
      <style jsx global>{`
        body {
          background-color: ${bgColor};
        }
      `}</style>
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

        <Container
          maxW="container.md"
          pt={40}
          sx={{
            "@media print": {
              paddingTop: 0,
            },
          }}
        >
          <Component {...pageProps} />
        </Container>
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
