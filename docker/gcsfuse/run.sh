#!/usr/bin/env bash
set -eo pipefail

echo -e "start fuse\nGCP_PROJECT: $GCP_PROJECT\nGCS_DB_BUCKET_NAME: $GCS_DB_BUCKET_NAME\nGCS_UPLOADS_BUCKET_NAME: $GCS_UPLOADS_BUCKET_NAME"

# Authenticate google application credentials if provided
if [ $GOOGLE_APPLICATION_CREDENTIALS]; then
    echo "Authenticating service account"
    gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS} --project=${GCP_PROJECT}
fi

# TODO - ensure bucket exists and user has access

echo "Mounting GCS Fuse."
mkdir -p $GCSFUSE_MNT
gcsfuse --debug_gcs --debug_fuse --implicit-dirs $GCS_DB_BUCKET_NAME $GCSFUSE_DB_MNT
gcsfuse --debug_gcs --debug_fuse --implicit-dirs $GCS_UPLOADS_BUCKET_NAME $GCSFUSE_PUBLIC_MNT
echo "Mounting completed."
echo $(ls $GCSFUSE_MNT)

# Sync data to external folder using unison
if [ $UNISON_DB_MNT ]; then
    mkdir UNISON_MNT
    unison -repeat $POLL_INTERVAL -prefer newer -perms 0 -dontchmod -batch -copyonconflict $GCSFUSE_DB_MNT $UNISON_DB_MNT \ &
    unison -repeat $POLL_INTERVAL -prefer newer -perms 0 -dontchmod -batch -copyonconflict $GCSFUSE_PUBLIC_MNT $UNISON_PUBLIC_MNT
fi
