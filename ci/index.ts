import * as pulumi from "@pulumi/pulumi";

import { DockerStrapiImageBuild } from "./services/docker-strapi-image-build";
import { GCPCloudRunDeploy } from "./services/gcp-cloudrun-deploy";
import { GCPCStorageCreate } from "./utils/gcp-storage-create";
import { setEnv } from "./utils";

/** Use pulumi stack name throughout as env, e.g. 'staging' or 'production' */
const envName = pulumi.getStack();

// remove google_application_credentials as cloudrun will auto-provide
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { GOOGLE_APPLICATION_CREDENTIALS, ...KEPT_ENV } = setEnv(envName);

const config = new pulumi.Config();
const GCS_STORAGE_BUCKET = config.require("GCS_STORAGE_BUCKET");

// Backend Storage Bucket
const bucket = GCPCStorageCreate(GCS_STORAGE_BUCKET);
export const bucketName = bucket.url.apply((name) => name.replace("gs://", ""));

// Backend Docker Image
const image = DockerStrapiImageBuild(envName);

// TODO - also want to ensure the docker build script matches correctly for strapi

// Cloudrun Instance with backend environment variables

export const cloudRunUrl = GCPCloudRunDeploy(image, envName, {
  ...KEPT_ENV,
  GCS_BUCKET_NAME: bucketName, // populate storage bucket created above
  STRAPI_HOST: "0.0.0.0", // expose to docker host
  NODE_ENV: envName,
  GCS_PUBLIC_FILES: "false", // files do not need to be marked as public when accessing from google env
  uniform: "false", // uniform acl not set (fine-grained)
});
// TODO - consider db file

// TODO - GCS_PUBLIC_FILES marked as false but were still not showing so entire storage bucket has been made public

// TODO - frontend
// https://medium.com/develop-everything/create-a-cloud-run-service-and-https-load-balancer-with-pulumi-3ba542e60367
// https://cloud.google.com/load-balancing/docs/https/ext-load-balancer-backend-buckets

// https://cloud.google.com/run/docs/mapping-custom-domains
