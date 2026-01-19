import React from "react";
import Image from "next-export-optimize-images/image";
import Link from "next/link";
import { FacebookIcon } from "react-share";

import { ExternalLink } from "components/common/externalLink";
import PageSection from "components/layout/pageSection";

const size = "32px";

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
    href: "mailto:admin@supportingami.org",
  },
  {
    id: "donate",
    label: "DONATE",
    href: "/donate",
  },
];

const Sitemap = () => {
  return (
    <>
      <PageSection fullwidth className="bg-base-300 py-16" data-test-id="sitemap">
        <div className="flex flex-wrap justify-between gap-x-24 gap-y-8">
          <Image src="/images/sami-logo-no-text.svg" alt="sitemap-logo" width={100} height={100}></Image>

          <div className="flex-1 m-auto">
            <div className="flex flex-wrap gap-6 justify-between">
              {pageLinks.map(({ href, label, id }) => (
                <Link key={id} className="font-medium" href={href}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap md:place-self-center md:justify-self-end gap-1">
            Follow us
            <ExternalLink href="https://www.facebook.com/supportingami">
              <FacebookIcon size={size} />
            </ExternalLink>
          </div>
        </div>
        <p className="-mb-8 mt-8 text-center text-sm text-sky-600">
          © Supporting African Maths Initiatives | Registered Charity #1161994{" "}
        </p>
      </PageSection>
    </>
  );
};

export default Sitemap;
