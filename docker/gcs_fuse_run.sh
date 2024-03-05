#!/usr/bin/env bash
set -eo pipefail

echo -e "start fuse. \nGCS_PROJECT: $GCS_PROJECT\nGCS_BUCKET_NAME: $GCS_BUCKET_NAME"

# Create mount directory for service
mkdir -p /mnt/gcs

echo "Authenticating service account"
gcloud auth activate-service-account --key-file="/service-account.json" --project=${GCS_PROJECT}
# Check bucket exists

echo "Mounting GCS Fuse."
gcsfuse --debug_gcs --debug_fuse --implicit-dirs --foreground $GCS_BUCKET_NAME /mnt/gcs
# echo "Mounting completed."

# # Exit immediately when one of the background processes terminate.
# wait -n

# --debug_fuse --debug_fuse_errors --file-mode 777 --dir-mode 777 --limit-ops-per-sec 10