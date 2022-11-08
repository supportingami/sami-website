import React from "react";
import Head from "next/head";
import Page from "components/pages/index";
import type { NextPage } from "next";

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>SAMI</title>
      </Head>
      <Page />
    </>
  );
};

export default IndexPage;
