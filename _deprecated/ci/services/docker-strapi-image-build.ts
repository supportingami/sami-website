import * as gcp from "@pulumi/gcp";
import * as docker from "@pulumi/docker";
import { PATHS } from "../utils";

/**
 * Build docker image from backend strapi workspace and submit to google artifact registry
 *
 * Prerequisites
 * ```
 * gcloud auth ... application-default (TO CONFIRM FROM GUIDE)
 * gcloud auth configure-docker europe-west1-docker.pkg.dev
 * ```
 *
 * https://github.com/pulumi/pulumi-docker/blob/master/examples/container-registries/gcp/ts/index.ts
 */
export function DockerStrapiImageBuild(envName: string) {
  const location = gcp.config.region || "europe-west1";
  const repositoryId = `sami-website-${envName}`;
  const project = gcp.config.project;

  // Create a private artifact registry.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const registry = new gcp.artifactregistry.Repository("sami-website-artifact-repo", {
    description: "SAMI Website Repository",
    format: "DOCKER",
    location,
    repositoryId,
    project,
  });
  //
  const imageId = "strapi-backend";
  // Name the image for upload to artifact registry
  const imageName = `${location}-docker.pkg.dev/${project}/${repositoryId}/${imageId}`;

  // Build and publish the image.
  const image = new docker.Image("strapi-backend-image", {
    build: {
      context: PATHS.backendDir,
      args: {
        NODE_ENV: envName,
      },
    },
    imageName,
  });

  return image;
}
