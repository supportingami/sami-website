import React from "react";
import Head from "next/head";
import { AnnualReportPageComponent } from "components/pages/annual-reports";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { AReport } from "types/annualreport";
import { AnnualReportsQuery, AnnualReportsDocument } from "../graphql/generated";
import { serverQuery } from "lib/graphql";

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  let areports: AReport[] = [];
  const res = await serverQuery<AnnualReportsQuery>(AnnualReportsDocument);
  if (res) {
    areports =
      res.data.annualReports.data.map((m) => ({ ...m.attributes, id: m.id })) || [];
  }
  return {
    props: {
      areports,
    },
  };
};

const AnnualReportsPage = ({
  areports,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Annual Reports Page</title>
      </Head>
      <AnnualReportPageComponent areports={areports} />
    </>
  );
};

export default AnnualReportsPage;
