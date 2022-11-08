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
      <SectionHeader background={{ imageName: "bg-math-1", size: "1560px", position: "-150px -58px" }}>
        <h1 className="text-white">Our Work</h1>
        <div className="flex gap-2 justify-center flex-1">
          {headerButtons.map(({ text, id }) => (
            <a key={id} className="btn btn-outline btn-primary bg-white">
              {text}
            </a>
          ))}
        </div>
      </SectionHeader>

      {/* TODO - remove fixed sizes and colours, remove absolute positioning */}
      <div className={`relative text-center w-[1148px] h-[227.89px] text-[rgba(29,33,48,1)] mt-8`}>
        <div>
          <p className="left-0 bottom-0 absolute text-xl font-bold leading-normal inline m-0 h-[76.89px] w-[1088.88px] right-[5.15%] top-[66.26%]">
            {
              "By working directly with local people and organisations that have support and contacts within mathematics education, "
            }
            <br />
            SAMI is well positioned to help deliver high impact solutions where they are needed most.
          </p>
          <div className="opacity-70 absolute right-0 leading-none inline-block font-normal h-[83px] w-[1143px] left-[0.44%] top-[22.82%] bottom-[40.76%]">
            <p className="text-base inline m-0 leading-[1.6]">
              {
                "Mathematics in particular proves problematic for students and teachers alike, falling far short of global standards. There is however no shortage of passionate, enthusiastic and talented individuals in these countries with powerful ideas to improve the current state of education. "
              }
            </p>
            <p className="text-base inline m-0 leading-[1.6]">
              SAMI was founded in 2013 as a means to support these local initiatives, and provide the expertise and
              funding necessary to implement, sustain and scale these ideas.
            </p>
          </div>
          <p className="inset-x-0 top-0 absolute text-2xl font-bold leading-normal inline m-0 h-[38px] w-[1148px] bottom-[83.33%]">
            There are huge divides in terms of access and quality of education across Africa.
          </p>
        </div>
      </div>

      {/*Principles Section*/}

      <div className={`relative w-[1500px] h-[367px] text-[rgba(29,33,48,1)] bg-slate-200`}>
        <div className="absolute text-left w-[340px] left-[68.93%] right-[8.4%] top-[59.13%] bottom-[13.08%]">
          <div className="inset-0 absolute w-[340px]">
            <p className="inset-x-0 opacity-70 bottom-0 absolute text-sm font-normal inline m-0 w-[340px] top-[35.29%] leading-[1.6]">
              Assisting in the provision and effective evaluation of the use of new technologies in the classroom to
              motivate and engage learners for improved outcomes
            </p>
            <p className="left-0 top-0 absolute text-2xl font-bold inline m-0 w-[204.82px] right-[39.76%] bottom-[72.55%] leading-[normal]">
              Use of Technology
            </p>
          </div>
        </div>
        <div className="absolute text-left w-[340px] left-[39.07%] right-[38.27%] top-[59.13%] bottom-[7.08%]">
          <div className="inset-0 absolute w-[340px]">
            <p className="inset-x-0 opacity-70 bottom-0 absolute text-sm font-normal inline m-0 w-[340px] top-[29.03%] leading-[1.6]">
              Creating awareness of cutting edge technology, methodologies and ideas that provide the opportunity for
              local initiatives to become world leaders
              <br />
            </p>
            <p className="left-0 top-0 absolute text-2xl font-bold inline m-0 w-[147.47px] right-[56.63%] bottom-[77.42%] leading-[normal]">
              Leapfrogging
            </p>
          </div>
        </div>
        <div className="absolute text-left w-[340px] left-[9.2%] right-[68.13%] top-[59.13%] bottom-[19.07%]">
          <div className="inset-0 absolute w-[340px]">
            <p className="inset-x-0 opacity-70 bottom-0 absolute text-sm font-normal inline m-0 w-[340px] top-[45%] leading-[1.6]">
              Assist research and development projects to access mathematics and statistical expertise
            </p>
            <p className="left-0 top-0 absolute text-2xl font-bold inline m-0 w-[302.11px] right-[11.14%] bottom-[65%] leading-[normal]">
              Research and Development
            </p>
          </div>
        </div>
        <div className="absolute text-left w-[340px] left-[68.93%] right-[8.4%] top-[25.89%] bottom-[52.86%]">
          <div className="inset-0 absolute w-[340px]">
            <p className="inset-x-0 opacity-70 bottom-0 absolute text-sm font-normal inline m-0 w-[340px] top-[43.59%] leading-[1.6]">
              Providing support for grass-root initiatives to develop into sustainable solutions
            </p>
            <p className="left-0 top-0 absolute text-2xl font-bold inline m-0 w-[160.78px] right-[52.71%] bottom-[64.1%] leading-[normal]">
              Empowerment
            </p>
          </div>
        </div>
        <div className="absolute text-left w-[340px] left-[39.07%] right-[38.27%] top-[25.89%] bottom-[52.32%]">
          <div className="inset-0 absolute w-[340px]">
            <p className="inset-x-0 opacity-70 bottom-0 absolute text-sm font-normal inline m-0 w-[340px] top-[45%] leading-[1.6]">
              Scaling projects in African countries at primary, secondary and university levels
            </p>
            <p className="left-0 top-0 absolute text-2xl font-bold inline m-0 w-[268.31px] right-[21.08%] bottom-[65%] leading-[normal]">
              Mathematical Education
            </p>
          </div>
        </div>
        <div className="absolute text-left w-[340px] left-[9.2%] right-[68.13%] top-[25.89%] bottom-[52.32%]">
          <div className="inset-0 absolute w-[340px]">
            <p className="inset-x-0 opacity-70 bottom-0 absolute text-sm font-normal inline m-0 w-[340px] top-[45%] leading-[1.6]">
              Supporting charities and NGOs to implement local and pan-African Maths Initiatives
            </p>
            <p className="left-0 top-0 absolute text-2xl font-bold inline m-0 w-[246.81px] right-[27.41%] bottom-[65%] leading-[normal]">
              Working with Partners
            </p>
          </div>
        </div>
        <p className="opacity-70 absolute text-base font-normal text-center inline m-0 h-[28.56px] w-[1148px] left-[11.13%] right-[12.33%] top-[8.57%] bottom-[83.65%] leading-[1.6]">
          All projects live by the following principles:
        </p>
      </div>
    </>
  );
};

export default AboutPageComponent;
