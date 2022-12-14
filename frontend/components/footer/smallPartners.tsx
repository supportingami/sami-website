import PageSection from "components/layout/pageSection";
import React from "react";
import Image from "next/image";

import AIMSLogo from "public/images/Partners/aims-rwanda-logo.png";
import AMILogo from "public/images/Partners/ami-logo.png";
import AMIGhanaLogo from "public/images/Partners/ami-ghana-logo.png";
import MTLogo from "public/images/Partners/im-togo-logo.png";

const SmallPartners = () => {
  const logos = [
    {
      id: 1,
      image: AIMSLogo,
    },
    {
      id: 2,
      image: AMILogo,
    },
    {
      id: 3,
      image: AMIGhanaLogo,
    },
    {
      id: 4,
      image: MTLogo,
    },
  ];
  return (
    <PageSection fullwidth className="mb-5 grayscale">
              <div className="grid grid-cols-2 md:grid-cols-4 my-6 md:my-6 items-center justify-items-center">
                  {logos &&
                      logos.map((logo) => (
                          <div key={logo.id} className="mb-2">
                              <Image src={logo.image} alt="" height={25}/>
                          </div>
                      ))}
              </div>
    </PageSection>
  );
};

export default SmallPartners;
