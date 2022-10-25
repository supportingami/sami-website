const { existsSync } = require("fs");
const { resolve } = require("path");

module.exports = ({ env }) => {
  //   gcloud auth application-default login
  //   const serviceAccountPath = env("GOOGLE_APPLICATION_CREDENTIALS");
  //   if (!serviceAccountPath || !existsSync(serviceAccountPath)) {
  //     // try to use application default credentials
  //     // process.exitCode = 1;
  //     // throw new Error("GCP_SERVICE_ACCOUNT not found", serviceAccountPath);
  //   }
  //   const bucketName = env("GCP_BUCKET_NAME");
  //   if (!bucketName) {
  //     process.exitCode = 1;
  //     throw new Error("GCP_BUCKET_NAME not provided");
  //   }

  // const serviceAccount = JSON.parse(resolve(serviceAccountPath));
  const bucketName = env("GCS_BUCKET_NAME");
  if (!bucketName) {
    process.exitCode = 1;
    throw new Error("GCS_BUCKET_NAME not provided");
  }
  return {
    upload: {
      config: {
        provider: "@strapi-community/strapi-provider-upload-google-cloud-storage",
        providerOptions: {
          bucketName: `${bucketName}`,
          // Auth for non-GCP environments
          //   serviceAccount,
          baseUrl: `https://storage.googleapis.com/${bucketName}`,
          basePath: env("GCS_BASE_PATH"),
          baseUrl: env("GCS_BASE_URL"),
          publicFiles: env("GCS_PUBLIC_FILES"),
          uniform: env("GCS_UNIFORM"),
        },
      },
    },
    //...
  };
};
