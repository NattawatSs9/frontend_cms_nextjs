import { ColorModeScript, useColorModeValue } from "@chakra-ui/react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "../component/theme/theme";

export default class CustomDoc extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
        </body>
        <NextScript />
      </Html>
    );
  }
}
