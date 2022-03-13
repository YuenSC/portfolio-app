// pages/_document.js

import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";

import theme from "./../styles/theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />

        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap"
          rel="stylesheet"
        />

        <body style={{ height: "100%" }}>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
