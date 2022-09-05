import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createStrapiInstance } from "scripts/src/commands/strapi/common";

export default async function (req: VercelRequest, res: VercelResponse) {
  console.log("request app", req);
  const app = await createStrapiInstance();
  await app.start();
  res.status(200).send("app started");
}
