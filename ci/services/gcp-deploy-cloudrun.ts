import * as docker from "@pulumi/docker";
import * as gcp from "@pulumi/gcp";

/**
 *
 * @input image - generated docker image to deploy to cloud run
 * https://www.pulumi.com/blog/google-cloud-run-serverless-containers/
 */
export function GCPDeployCloudRun(image: docker.Image) {
  const enableCloudRun = new gcp.projects.Service("EnableCloudRun", {
    service: "run.googleapis.com",
  });

  // Location to deploy Cloud Run services
  const location = gcp.config.region || "europe-west2";
  const fullImageName = image.imageName;
  const helloService = new gcp.cloudrun.Service(
    "strapi-cloudrun",
    {
      location,
      template: {
        metadata: {
          // https://cloud.google.com/run/docs/configuring/min-instances
          annotations: {
            "autoscaling.knative.dev/minScale": "0",
            "autoscaling.knative.dev/maxScale": "3",
          },
        },
        // https://cloud.google.com/run/docs/reference/rest/v1/RevisionSpec
        spec: {
          // https://cloud.google.com/run/docs/reference/rest/v1/Container
          containers: [
            {
              image: fullImageName,
              envs: [{ name: "TEST_ENV_VAR", value: "TEST_ENV_VALUE" }],
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
        },
      },
    },
    { dependsOn: [enableCloudRun, image] }
  );

  const iamHello = new gcp.cloudrun.IamMember("hello-everyone", {
    service: helloService.name,
    location,
    role: "roles/run.invoker",
    member: "allUsers",
  });
  const helloUrl = helloService.statuses[0].url;
  return helloUrl;
}
