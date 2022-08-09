import Link from "next/link";
import React from "react";
import { IFaq } from "types/faq";
import { IVolunteer } from "types/volunteer";
import { FAQS } from "./faq";

export const VolunteerPageComponent: React.FC<{ volunteerPageContent: IVolunteer[]; faqs: IFaq[] }> = ({
  volunteerPageContent,
  faqs,
}) => {
  return (
    <>
      {volunteerPageContent.map((volunteer) => (
        <div key={volunteer.id}>
          <h1 style={{ fontSize: "25px", fontWeight: "600", marginBottom: "30px" }}>{volunteer.Title}</h1>
          <div dangerouslySetInnerHTML={{ __html: volunteer.Content }}></div>
          <Link href={volunteer.ApplicationLink}>
            <button
              style={{
                margin: "30px 0",
                borderRadius: "8px",
                padding: "10px 16px",
                backgroundColor: "#0693e3",
                color: "#fff",
              }}
            >
              Apply Now
            </button>
          </Link>
        </div>
      ))}
      {faqs.map((f) => (
        <FAQS key={f.id} faq={f} />
      ))}
    </>
  );
};
