import React from "react";
import { SectionHeader } from "components/layout/Header";
import PageSection from "components/layout/pageSection";
import Testimonials from "components/pages/about/testmonials/Testmonials";
import Link from "next/link";
import type { IProject } from "types/project";
import { DynamicComponents } from "components/common/dynamic";

export const ProjectTypeComponent = ({ project }: { project: IProject }) => {
  const { Name, PageContent } = project;
  return (
    <>
      <SectionHeader background={{ imageName: "bg-tiling-2", size: "1500px 1500px", position: "70px -640px" }}>
        <h1 className="text-white">{Name}</h1>
        {/* Breadcrumbs */}
        <div className="text-lg flex items-center mx-auto mb-4">
          <Link href="/projects">Projects</Link>
          <svg
            className="rtl:rotate-180 w-3 h-3 text-white-500 mx-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <Link href="#">{Name}</Link>
        </div>
      </SectionHeader>

      <PageSection className="prose max-w-screen-lg py-8">
        <DynamicComponents blocks={PageContent || []} />
      </PageSection>

      {/* TODO - move */}
      <PageSection fullwidth className="bg-base-200 py-16">
        <Testimonials />
      </PageSection>
    </>
  );
};
