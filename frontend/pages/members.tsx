import React from "react";
import Head from "next/head";
import { MembersPageComponent } from "components/pages/members";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import WithGraphQL from "lib/with-graphql";

const FeedsPage: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  session,
}) => {
  return (
    <WithGraphQL session={session}>
      <Head>
        <title>Members Page</title>
      </Head>
      <MembersPageComponent />
    </WithGraphQL>
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

export default FeedsPage;
