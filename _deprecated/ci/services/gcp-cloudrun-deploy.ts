import type * as pulumi from "@pulumi/pulumi";
import type * as docker from "@pulumi/docker";
import * as gcp from "@pulumi/gcp";

type IEnvVars = Record<string, pulumi.Output<string> | string>;

/**
 *
 * @input image - generated docker image to deploy to cloud run
 * https://www.pulumi.com/blog/google-cloud-run-serverless-containers/
 */
export function GCPCloudRunDeploy(image: docker.Image, envName: string, envVars: IEnvVars) {
  const enableCloudRun = new gcp.projects.Service("EnableCloudRun", {
    service: "run.googleapis.com",
  });

  // Location to deploy Cloud Run services
  const location = gcp.config.region || "europe-west1";
  const fullImageName = image.imageName;

  // Environment variables
  const envs: { name: string; value: pulumi.Output<string> | string }[] = Object.entries(envVars).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const cloudrunService = new gcp.cloudrun.Service(
    "strapi-cloudrun",
    {
      location,
      name: `sami-website-backend-${envName}`,
      template: {
        metadata: {
          // https://cloud.google.com/run/docs/configuring/min-instances
          // NOTE - will need to ensure max db connections not reached
          annotations: {
            "autoscaling.knative.dev/minScale": "0",
            "autoscaling.knative.dev/maxScale": "1",
          },
        },
        // https://cloud.google.com/run/docs/reference/rest/v1/RevisionSpec
        spec: {
          // https://cloud.google.com/run/docs/reference/rest/v1/Container
          containers: [
            {
              image: fullImageName,
              envs,
              ports: [{ containerPort: 1337 }],

              /**
               * Default cloudrun listens on port 8080. expose additional here
               * https://cloud.google.com/run/docs/container-contract
               **/
              // ports: [{ containerPort: 80 }, { containerPort: 443 }],

              // https://cloud.google.com/run/docs/reference/rest/v1/Container#ResourceRequirements
              resources: {
                limits: {
                  memory: "1Gi",
                  cpu: "1",
                },
              },
            },
          ],
          timeoutSeconds: 120,
        },
      },
    },
    { dependsOn: [enableCloudRun, image] }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const iam = new gcp.cloudrun.IamMember("hello-everyone", {
    service: cloudrunService.name,
    location,
    role: "roles/run.invoker",
    member: "allUsers",
  });
  const helloUrl = cloudrunService.statuses[0].url;
  return helloUrl;
}
