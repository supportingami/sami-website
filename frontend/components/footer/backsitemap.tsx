import React from "react";
import Image from "next/image";
import PageSection from "components/layout/pageSection";


const Sitemap = () => {
    return (
        <PageSection fullwidth className="bg-base-300 py-16">

        <div>
            <div className="w-[100px] h-[35px] -mt-2 no-animation">
                <Image src="/images/sami-logo-no-text.svg" alt="sitemap-logo" width={100} height={100}></Image>
            </div>
            <div>
                Site map
            </div>
            <div>
                social icons
            </div>
        </div>
        </PageSection>
    );
};

export default Sitemap;