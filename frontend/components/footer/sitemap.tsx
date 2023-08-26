import React from "react";
import Image from "next/image";
import PageSection from "components/layout/pageSection";
import Link from "next/link";

import { FacebookIcon, LinkedinIcon } from "react-share";

const size = "20px";

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
    <PageSection fullwidth className="bg-base-300 py-8" data-cy="sitemap">
      <div className="items-center p-4">
        <div className="items-center flex flex-wrap">
          <Image src="/images/sami-logo-no-text.svg" alt="sitemap-logo" width={100} height={100}></Image>
        </div>

        <div className="flex flex-wrap gap-6">
          {pageLinks.map(({ href, label, id }) => (
            <li key={id} style={{ listStyleType: "none" }} className="font-medium">
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </div>
        <div>
          <button type="submit" className="btn btn-secondary">
            Donate
          </button>
        </div>

        <div className="flex flex-wrap md:place-self-center md:justify-self-end gap-1">
          Follow us:
          <FacebookIcon size={size} />
          <LinkedinIcon size={size} />
        </div>
      </div>

      <p className="flex items-center justify-center text-sm text-sky-600">
        © Supporting African Maths Initiatives | Registered Charity #1161994{" "}
      </p>
    </PageSection>
  );
};

export default Sitemap;
