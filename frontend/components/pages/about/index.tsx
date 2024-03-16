import React from "react";
import type { IAbout } from "types/about";
import PageSection from "components/layout/pageSection";

const principles = [
  {
    title: "Working with Partners",
    text: "Supporting charities and NGOs to implement local and pan-African Maths Initiatives",
  },
  {
    title: "Mathematical Education",
    text: "Scaling projects in African countries at primary, secondary and university levels",
  },
  {
    title: "Empowerment",
    text: "Providing support for grass-root initiatives to develop into sustainable solutions",
  },
  {
    title: "Research and Development",
    text: "Assist research and development projects to access mathematics and statistical expertise",
  },
  {
    title: "Leapfrogging",
    text: "Creating awareness of cutting edge technology, methodologies and ideas that provide the opportunity for local initiatives to become world leaders",
  },
  {
    title: "Use of Technology",
    text: "Assisting in the provision and effective evaluation of the use of new technologies in the classroom to motivate and engage learners for improved outcomes",
  },
];

export const AboutPageComponent: React.FC<any> = () => {
  return (
    <>
      <PageSection className="prose max-w-screen-lg py-8">
        <h3 className="text-center">
          There are huge divides in terms of access and quality of education across Africa
        </h3>
        <p>
          Mathematics in particular proves problematic for students and teachers alike, falling far short of global
          standards. There is however no shortage of passionate, enthusiastic and talented individuals in these
          countries with powerful ideas to improve the current state of education. SAMI was founded in 2013 as a means
          to support these local initiatives, and provide the expertise and funding necessary to implement, sustain and
          scale these ideas.
        </p>
        <p className="mt-5 mb-10 font-bold">
          By working directly with local people and organisations that have support and contacts within mathematics
          education, SAMI is well positioned to help deliver high impact solutions where they are needed most.
        </p>
      </PageSection>
      <PageSection fullwidth className="bg-base-200 py-16" id="principles">
        <h3 className="text-center">All projects live by the following principles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {principles.map(({ title, text }, i) => (
            <div key={i} className="prose">
              <h4 className="font-bold">{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </PageSection>
    </>
  );
};

export default AboutPageComponent;
