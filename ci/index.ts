import * as pulumi from "@pulumi/pulumi";

import { GCPDeployCloudRun } from "./services/gcp-deploy-cloudrun";
import { GCPBuildStrapiImage } from "./services/gcp-build-strapi-image";
import { GCPCStorageCreate } from "./services/gcp-storage-create";
import { getBackendEnv } from "./utils";

const config = new pulumi.Config();
const GCS_STORAGE_BUCKET = config.require("GCS_STORAGE_BUCKET");

// Storage Bucket
const bucket = GCPCStorageCreate(GCS_STORAGE_BUCKET);
export const bucketName = bucket.url;

// Docker Image
const image = GCPBuildStrapiImage();

// Cloudrun Instance
const dockerEnv = getBackendEnv();
console.log("dockerEnv", dockerEnv);

export const cloudRunUrl = GCPDeployCloudRun(image, {
  ...dockerEnv, // populate default env vars stored locally
  GCS_BUCKET_NAME: bucketName, // populate storage bucket created above
  STRAPI_HOST: "0.0.0.0", // expose to docker host
});
