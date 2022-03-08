import {
  Box,
  ChakraProvider,
  Container,
  extendTheme,
  useColorModeValue,
} from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React, { FC } from "react";

import theme from "./../styles/theme";
import Navbar from "../components/Navbar";

const Layout: FC = ({ children }) => {
  const bgColor = useColorModeValue("yellow.100", "rgb(32,32,35)");
  const color = useColorModeValue("black", "white");

  return (
    <Box bgColor={bgColor} color={color} minH="100vh">
      {children}
    </Box>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Navbar />
        <Container maxW="container.md" pt={40}>
          <Component {...pageProps} />
        </Container>
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
