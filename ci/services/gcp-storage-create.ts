import * as gcp from "@pulumi/gcp";

export function GCPCStorageCreate(bucketname: string) {
  const location = gcp.config.region || "europe-west2";
  // Create a GCP resource (Storage Bucket)
  const bucket = new gcp.storage.Bucket(bucketname, {
    location,
  });
  return bucket;
}
