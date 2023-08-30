/** @typedef { import('@vercel/node').VercelRequest } VercelRequest */
/** @typedef { import('@vercel/node').VercelResponse } VercelResponse */

/**
 * Request Handler
 * @param {VercelRequest} request
 * @param {VercelResponse} response
 */
export default async function (request, response) {
  if (request.method === "POST") {
    const { body } = request;
    const data = await newsletterSignup(body);
    return response.json(data);
  } else {
    return response.status(400).send(`[${request.method}] Method not supported`);
  }
}

/**
 * When submitting to mailchimp prefer to use more simple http POST endpoint instead of full mailchimp api
 * Details for endpoints can be taken from UI console (by examining "action" property of embed code)
 *
 * Submission handled via an API endpoint instead of direct from frontend as mailchimp does not support
 * browser cross-origin requests
 *
 * Adapted from https://medium.com/@ivanlucasgoncalves/mailchimp-form-using-ajax-call-6bc55f1d2e51
 */
export async function newsletterSignup(user = { EMAIL: "", FNAME: "", LNAME: "" }) {
  // store user data to formdata
  const formData = new FormData();
  for (const [key, value] of Object.entries(user)) {
    formData.set(key, value);
  }
  // store metadata to formdata
  const BASE_URL = "https://samicharity.us10.list-manage.com";
  const POST_URL = `${BASE_URL}/subscribe/post-json`;
  const POST_PARAMS = { u: "cc3d4aebc50b456aeb83cf746", id: "8beb5b3911", f_id: "00e4cce5f0" };
  // TODO - consider making server environment variables
  // Not sensitive, available hardcoded into embed widget anyway, just for convenience if changed
  for (const [name, value] of Object.entries(POST_PARAMS)) {
    formData.set(name, value);
  }
  const res = await fetch(POST_URL, { body: formData, method: "POST" });
  const data = await res.json();
  return data;
}
