import React from "react";
import { SectionHeader } from "components/layout/Header";
import PageSection from "components/layout/pageSection";
import Testimonials from "components/pages/about/testmonials/Testmonials";
import Link from "next/link";
import type { IProject } from "types/project";

export const ProjectTypeComponent = ({ project }: { project: IProject }) => {
  const { Slug, Name, Content } = project;
  return (
    <>
      <SectionHeader background={{ imageName: "bg-tiling-2", size: "1500px 1500px", position: "70px -640px" }}>
        <h1 className="text-white">{Name}</h1>
        <div className="flex gap-2 justify-center flex-1 flex-wrap mb-8">
          <Link href={`/projects/${Slug}`}>
            <button className="btn btn-outline btn-primary bg-white">{Name}</button>
          </Link>
        </div>
      </SectionHeader>

      <PageSection className="prose max-w-screen-lg py-8">
        <div dangerouslySetInnerHTML={{ __html: Content }}></div>
      </PageSection>

      <PageSection fullwidth className="bg-base-200 py-16">
        <Testimonials />
      </PageSection>
      <PageSection fullwidth className="bg-primary-focus text-white py-8">
        <div className="flex space-x-4 items-center justify-center">
          <Link href="/volunteer">
            <button className="bg-white rounded px-6 py-2 text-primary font-bold">Volunteer</button>
          </Link>

          <Link href="/contact">
            <button className="bg-white rounded px-6 py-2 text-primary font-bold">Contact Us</button>
          </Link>
        </div>
      </PageSection>
    </>
  );
};
