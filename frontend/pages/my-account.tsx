import React from "react";
import Head from "next/head";
import Page from "components/pages/my-account";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AccessDeniedIndicator from "components/access-denied-indicator";
import { getSession } from "next-auth/react";
import { GraphQLProvider } from "lib/graphql";

const MyAccountPage: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  session,
}) => {
  if (!session) {
    return <AccessDeniedIndicator />;
  }

  return (
    <GraphQLProvider session={session}>
      <Head>
        <title>My Account Page</title>
      </Head>
      <Page />
    </GraphQLProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};

export default MyAccountPage;
