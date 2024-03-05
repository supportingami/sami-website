#!/usr/bin/env bash
set -eo pipefail

echo -e "start fuse. \nGCS_PROJECT: $GCS_PROJECT\nGCS_BUCKET_NAME: $GCS_BUCKET_NAME"

echo "Authenticating service account"
gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS} --project=${GCS_PROJECT}

# TODO - ensure bucket exists and user has access

echo "Mounting GCS Fuse."
gcsfuse --debug_gcs --debug_fuse --implicit-dirs --foreground $GCS_BUCKET_NAME /data
# echo "Mounting completed."

# # Exit immediately when one of the background processes terminate.
# wait -n

# --debug_fuse --debug_fuse_errors --file-mode 777 --dir-mode 777 --limit-ops-per-sec 10