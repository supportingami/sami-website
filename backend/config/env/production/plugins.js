module.exports = ({ env }) => {
  //   gcloud auth application-default login

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
          //  `https://storage.cloud.google.com/${bucketName}`
          baseUrl: "https://storage.googleapis.com/{bucket-name}",
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
