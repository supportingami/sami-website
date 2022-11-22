import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
// import { SessionProvider } from "next-auth/react";
import Layout from "components/layout";
import "../styles/globals.scss";
import DaisyThemeProvider from "lib/themeProvider";

import { Roboto } from "@next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-roboto" });

const App = ({ Component, pageProps }: AppProps) => {
  // const { session } = pageProps;
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      {/* <SessionProvider session={session}> */}
      <DaisyThemeProvider>
        <Layout className={`${roboto.variable} font-sans`}>
          <Component {...pageProps} />
        </Layout>
      </DaisyThemeProvider>
      {/* </SessionProvider> */}
    </>
  );
};

export default App;
