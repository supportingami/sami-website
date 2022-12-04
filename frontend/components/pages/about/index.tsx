import React from "react";
import type { IAbout } from "types/about";
import { SectionHeader } from "components/layout/Header";

const headerButtons = [
  {
    id: 0,
    text: "Theory of Change",
  },
  {
    id: 1,
    text: "Members & Volunteers",
  },
  {
    id: 2,
    text: "Annual Reports",
  },
];

export const AboutPageComponent: React.FC<{ aboutPageContent: IAbout[] }> = ({ aboutPageContent }) => {
  return (
    <>
      <SectionHeader background={{ imageName: "bg-math-1", size: "1660px 480px", position: "-150px -58px" }}>
        <h1 className="text-white">Our Work</h1>
        <div className="flex gap-2 justify-center flex-1">
          {headerButtons.map(({ text, id }) => (
            <a key={id} className="btn btn-outline btn-primary bg-white">
              {text}
            </a>
          ))}
        </div>
      </SectionHeader>
      <div className="px-28">
        <div className="text-center">
          <h4 className="font-bold text-lg mt-10 mb-5">
            There are huge divides in terms of access and quality of education across Africa.
          </h4>
          <p>
            Mathematics in particular proves problematic for students and teachers alike, falling far short of global
            standards. There is however no shortage of passionate, enthusiastic and talented individuals in these
            countries with powerful ideas to improve the current state of education. SAMI was founded in 2013 as a means
            to support these local initiatives, and provide the expertise and funding necessary to implement, sustain
            and scale these ideas.
          </p>
          <h4 className="mt-5 mb-10 font-bold">
            By working directly with local people and organisations that have support and contacts within mathematics
            education,
            <br />
            SAMI is well positioned to help deliver high impact solutions where they are needed most.
          </h4>
        </div>
      </div>

      {/*Principles Section*/}

      <div className="bg-blue-50 w-full px-20 py-10">
        <p className=" text-center">All projects live by the following principles:</p>
        <div className="grid grid-cols-3 gap-10 mt-10">
          <div className="w-11/12">
            <h4 className="font-bold text-lg mb-2">Working with Partners</h4>
            <p>Supporting charities and NGOs to implement local and pan-African Maths Initiatives</p>
          </div>
          <div className="w-11/12">
            <h4 className="font-bold text-lg mb-2">Mathematical Education</h4>
            <p>Scaling projects in African countries at primary, secondary and university levels</p>
          </div>
          <div className="w-11/12">
            <h4 className="font-bold text-lg mb-2">Empowerment</h4>
            <p>Providing support for grass-root initiatives to develop into sustainable solutions</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-10">
          <div className="w-11/12">
            <h4 className="font-bold text-lg mb-2">Research and Development</h4>
            <p>Assist research and development projects to access mathematics and statistical expertise</p>
          </div>
          <div className="w-11/12">
            <h4 className="font-bold text-lg mb-2">Leapfrogging</h4>
            <p>
              Creating awareness of cutting edge technology, methodologies and ideas that provide the opportunity for
              local initiatives to become world leaders
            </p>
          </div>
          <div className="w-11/12">
            <h4 className="font-bold text-lg mb-2">Use of Technology</h4>
            <p>
              Assisting in the provision and effective evaluation of the use of new technologies in the classroom to
              motivate and engage learners for improved outcomes
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPageComponent;
