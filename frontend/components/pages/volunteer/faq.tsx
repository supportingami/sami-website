import React, { useEffect } from "react";
import { IFaq } from "types/faq";

export const FAQS: React.FC<{
  faq: IFaq;
}> = ({ faq }) => {
  return (
    <>
      <div className="dropdown">
        <button className="dropdown-btn">
          <span id="question">
            <i> {">"}</i>
            <span>{'  '}{faq.Question}</span>
          </span>
        </button>
        <ul id="response" className="faq-dropdown" style={{display:'none'}}>
          {faq.Response}
        </ul>
      </div>
    </>
  );
};
