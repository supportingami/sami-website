import PageSection from "components/layout/pageSection";
import React from "react";

const FORM_ID = "sub-form";

/** Fields expected  */
interface ISignupData {
  FNAME: string;
  LNAME: string;
  EMAIL: string;
}

const Newsletter = () => {
  const [signupMessage, setSignupMessage] = React.useState("");
  const [signupResult, setSignupResult] = React.useState("");
  const [formDisabled, setFormDisabled] = React.useState(false);
  /**
   * Submit form by checking validity and then sending post request to local api endpoint
   * @See `app/api/newsletter-signup`
   *
   * Simple form validation and submit methods, adapted from
   * https://medium.com/@alessio.carnevale/form-validation-submission-in-vanilla-react-no-libraries-491327f985d0
   *
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.target as HTMLFormElement;
    const isValid = formEl.checkValidity();
    if (isValid) {
      setFormDisabled(true);
      const formData = new FormData(formEl);
      const EMAIL = formData.get("EMAIL")?.toString() || "";
      // Hack - convert single 'NAME' field to separate first and last names for use in mailchimp
      const name = formData.get("NAME")?.toString() || "";
      const [FNAME, ...LNAMES] = name.split(" ");
      const LNAME = LNAMES.join(" ");
      const bodyData: ISignupData = { EMAIL, FNAME, LNAME };
      // Send form to api
      const res = await fetch(`/api/newsletter-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
      setFormDisabled(false);
      const data = await res.json();
      const { msg, result } = data as any;
      setSignupMessage(msg);
      setSignupResult(result);
    }
  };

  return (
    <PageSection fullwidth className="bg-primary text-white text-center py-8">
      <h3>Sign up to get latest updates</h3>
      <p>Be the first to hear about new projects and receive ocasional updates about SAMI</p>
      <br />
      <form
        autoComplete="on"
        className="flex flex-wrap gap-8 items-center justify-center text-black"
        onSubmit={(e) => handleSubmit(e)}
        method="post"
        name="subscribe-form"
        target="_blank"
        id={FORM_ID}
      >
        <input
          type="text"
          name="NAME"
          required={true}
          placeholder="Your Name"
          className="input input-lg w-full sm:w-64"
        />
        <input
          type="email"
          name="EMAIL"
          placeholder="Your Email"
          className="input input-lg w-full sm:w-auto sm:flex-1 md:max-w-sm"
          required={true}
        ></input>
        <button type="submit" form={FORM_ID} className="btn btn-lg" disabled={formDisabled}>
          SIGN ME UP
        </button>
      </form>
      <p className={`text-${signupResult} mt-4 min-h-[2rem]`}>{signupMessage}</p>
      {/* TODO - add support for google recaptcha */}
    </PageSection>
  );
};

export default Newsletter;
