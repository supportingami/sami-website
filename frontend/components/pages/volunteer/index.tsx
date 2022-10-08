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
          <h1>{volunteer.Title}</h1>
          <div className="prose" dangerouslySetInnerHTML={{ __html: volunteer.Content }}></div>
          <a href={volunteer.ApplicationLink} target="_blank" rel="noopener noreferrer">
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
          </a>
        </div>
      ))}
      <div style={{ margin: "20px 0" }}>
        <h3 style={{ fontSize: "25px", fontWeight: "600", marginBottom: "5px" }}>Volunteer FAQS</h3>
        {faqs.map((f) => (
          <FAQS key={f.id} faq={f} />
        ))}
      </div>
    </>
  );
};
