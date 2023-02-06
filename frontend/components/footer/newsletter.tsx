import PageSection from "components/layout/pageSection";
import React from "react";

const Newsletter = () => {
  return (
    <PageSection fullwidth className="bg-primary text-white text-center py-8">
      <h3>Sign up to get latest updates</h3>
      <p>Be the first to hear about new projects and receive ocasional updates about SAMI</p>
      <br />
      <div className="flex space-x-4 items-center justify-center text-black">
        <input type="text" placeholder="Your Name" className="input input-lg w-full max-w-xs" />
        <input type="text" placeholder="Your Email" className="input input-lg w-full max-w-xs" />
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">SIGN ME UP</button>
      </div>
    </PageSection>
  );
};

export default Newsletter;
