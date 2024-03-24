import * as gcp from "@pulumi/gcp";

/**
 * TODO
 * - pass storage bucket name back to config file if required
 * - enable public access
 * @param bucketname
 * @returns
 */

export function GCPCStorageCreate(bucketname: string) {
  const location = gcp.config.region || "europe-west1";
  // Create a GCP resource (Storage Bucket)
  const bucket = new gcp.storage.Bucket(bucketname, {
    location,
  });
  return bucket;
}
