import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Import main code from vercel serverless function
import { newsletterSignup } from "../../../api/newsletter-signup.mjs";

/***********************************************************************************************
 *                                  API Routes
 *
 * Used to intercept pages request and run API methods instead
 * https://nextjs.org/docs/app/building-your-application/routing/route-handlers
 *
 * They are used instead of pages api routes as these are not supported in static exports
 * https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
 *
 * Additionally all code here must be replicated as a vercel serverless function
 *
 ***********************************************************************************************/

/** Request handler */
export async function POST(request: NextRequest) {
  const user = await request.json();
  const data = await newsletterSignup(user);
  return NextResponse.json(data);
}
