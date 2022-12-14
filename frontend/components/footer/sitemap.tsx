import React from "react";
import Image from "next/image";
import PageSection from "components/layout/pageSection";
import Link from "next/link";

import {FacebookIcon, LinkedinIcon,} from "react-share";


const size = "28px";

const pageLinks = [
    {
      id: "about",
      label: "ABOUT SAMI",
      href: "/about",
    },
    {
      id: "projects",
      label: "PROJECTS",
      href: "/projects",
    },
    {
      id: "news",
      label: "NEWS",
      href: "/blog-posts",
    },
    {
      id: "volunteer",
      label: "VOLUNTEER",
      href: "/volunteer",
    },
    {
      id: "contact",
      label: "CONTACT US",
      href: "/contact-us",
    },
  ];

const Sitemap = () => {
    return (
        <PageSection fullwidth className="bg-base-300 py-8">
            <div className="navbar">
            <div className="navbar-start">
            <div className="w-[100px] h-[35px] -mt-2 no-animation">
                <Image src="/images/sami-logo-no-text.svg" alt="sitemap-logo" width={100} height={100}></Image>
            </div>
            </div>
            <div className="navbar-center flex space-x-4">
                {pageLinks.map(({ href, label, id }) => (
                    <li key={id} style={{ listStyleType: "none" }} className="font-medium">
                    <Link href={href}>{label}</Link>
                    </li>
                ))}
                <button className="btn btn-secondary">Donate</button>

            </div>
            <div className="navbar-end">
                Follow us:
                <button className="btn btn-ghost btn-circle">
                <FacebookIcon size={size} />
                </button>
                <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                <LinkedinIcon size={size} />
                </div>
                </button>
            </div>
            </div>
            <p className="flex items-center justify-center">© Supporting African Maths Initiatives   |   Registered Charity #1161994 </p>

        </PageSection>
    );
};

export default Sitemap;