import "../styles/globals.css";

import { Box, ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import Navbar from "../components/Navbar";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box bgColor={"rgb(32,32,35)"} minH="100vh">
        <Container maxW="container.xl">
          <Navbar />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
