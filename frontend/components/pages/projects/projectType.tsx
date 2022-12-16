import React from "react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import type { ProjectType, ProjectsQuery, UploadFileEntityResponse } from "../../../graphql/generated";
import { ProjectsDocument } from "../../../graphql/generated";
import { serverQuery } from "lib/graphql";
import { SectionHeader } from "components/layout/Header";
import PageSection from "components/layout/pageSection";
import Testimonials from "components/pages/about/testmonials/Testmonials";
import Link from "next/link";





export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
    const projectRes = await serverQuery<ProjectsQuery>(ProjectsDocument);
  
    return {
      props: {
        projectData: (projectRes?.data?.projectTypes?.data || []).map((p) => ({
          ...(p.attributes as ProjectType),
          id: p.id,
        })),
      },
    };
  };

export const ProjectTypeComponent = ({projectType, id}) => {

    return (
        <>
        <Head>
            <title>Project Type</title>
        </Head>
       
        {
            projectType.filter((project) => project.id === id).map((project) => (  
                <><SectionHeader background={{ imageName: "bg-tiling-2", size: "1500px 1500px", position: "70px -640px" }}>
                    <h1 className="text-white">{project.Name}</h1>
                   
                    <div className="flex gap-2 justify-center flex-1 flex-wrap mb-8">
                        {projectType.map(({ id, Name }) => (
                            
                            <Link href={`/projects/${id}/${Name}`} key={id}>
                            <button className="btn btn-outline btn-primary bg-white">
                                {Name}
                            </button>
                            </Link>
                            
                        ))}
                    </div>
                </SectionHeader>
        
                <PageSection className="prose max-w-screen-lg py-8">
                    <div dangerouslySetInnerHTML={{ __html: project.Content }}></div>
                </PageSection>

                <PageSection fullwidth className="bg-base-200 py-16">
                <Testimonials />
                </PageSection>
                <PageSection fullwidth className="bg-primary-focus text-white py-8">
                    <div className="flex space-x-4 items-center justify-center">
                   <Link href="/volunteer">
                   <button className="bg-white rounded px-6 py-2 text-primary font-bold">
                    Volunteer
                    </button>
                   </Link>
                   
                   <Link href="/contact">
                   <button className="bg-white rounded px-6 py-2 text-primary font-bold">
                    Contact Us
                    </button>
                   </Link>
                  
                    </div>
                </PageSection>
                </>
            )
            )}
        
        </>
    );
};