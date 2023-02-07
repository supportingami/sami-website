import React from "react";
import type { NextPage } from "next";
import PageSection from "components/layout/pageSection";

const Custom404Page: NextPage = () => {
  return (
    <>
      <PageSection className={`py-16 `} fullwidth>
        <h3>Page not found</h3>
      </PageSection>
    </>
  );
};

export default Custom404Page;
