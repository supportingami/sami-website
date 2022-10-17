import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

import { GCPDeployCloudRun } from "./services/gcp-deploy-cloudrun";
import { GCPBuildStrapiImage } from "./services/gcp-build-strapi-image";

// Create a GCP resource (Storage Bucket)
const bucket = new gcp.storage.Bucket("uploads-dev", {
  location: "europe-west2",
});

// Export the DNS name of the bucket
export const bucketName = bucket.url;

const image = GCPBuildStrapiImage();
export const helloUrl = GCPDeployCloudRun(image);

// TODO - manage secrets
const config = new pulumi.Config();
