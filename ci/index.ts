import * as pulumi from "@pulumi/pulumi";

import { DockerStrapiImageBuild } from "./services/docker-strapi-image-build";
import { GCPCloudRunDeploy } from "./services/gcp-cloudrun-deploy";
import { GCPCStorageCreate } from "./services/gcp-storage-create";
import { getBackendEnv } from "./utils";

const config = new pulumi.Config();
const GCS_STORAGE_BUCKET = config.require("GCS_STORAGE_BUCKET");

// Storage Bucket
const bucket = GCPCStorageCreate(GCS_STORAGE_BUCKET);
export const bucketName = bucket.url;

// Docker Image
const image = DockerStrapiImageBuild();

// Cloudrun Instance with backend environment variables
const STRAPI_ENV_FILE = config.require("STRAPI_ENV_FILE");
const dockerEnv = getBackendEnv(STRAPI_ENV_FILE);
export const cloudRunUrl = GCPCloudRunDeploy(image, {
  ...dockerEnv, // populate default env vars stored locally
  GCS_BUCKET_NAME: bucketName, // populate storage bucket created above
  STRAPI_HOST: "0.0.0.0", // expose to docker host
});

// TODO - frontend
// https://medium.com/develop-everything/create-a-cloud-run-service-and-https-load-balancer-with-pulumi-3ba542e60367
