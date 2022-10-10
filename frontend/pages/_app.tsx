import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@chakra-ui/core";
import Layout from "components/layout";
import "../styles/globals.scss";
import DaisyThemeProvider from "lib/themeProvider";

const App = ({ Component, pageProps }: AppProps) => {
  const { session } = pageProps;
  const ChakraThemeProvider = ThemeProvider as any;
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <ChakraThemeProvider>
          <DaisyThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </DaisyThemeProvider>
        </ChakraThemeProvider>
      </SessionProvider>
    </>
  );
};

export default App;
