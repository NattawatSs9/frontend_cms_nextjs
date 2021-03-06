import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, useColorModeValue } from "@chakra-ui/react";
import Layout from "../component/layout/Layout"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
