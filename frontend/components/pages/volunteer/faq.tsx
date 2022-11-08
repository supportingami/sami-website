import React from "react";
import type { IFaq } from "types/faq";

export const FAQS: React.FC<{
  faq: IFaq;
}> = ({ faq }) => {
  return (
    <>
      <div className="Faqs" style={{ border: "1px solid #dee", margin: "8px 0", cursor: "pointer" }}>
        <details style={{ padding: "10px 16px" }}>
          <summary style={{ fontSize: "18px", fontWeight: "400" }}>{faq.Question}</summary>
          <div style={{ fontSize: "15px", fontWeight: "400", padding: "10px 10px 0 20px" }}>{faq.Response}</div>
        </details>
      </div>
    </>
  );
};
