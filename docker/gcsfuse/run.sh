#!/usr/bin/env bash
set -eo pipefail

echo -e "start fuse\nGCS_PROJECT: $GCS_PROJECT\nGCS_BUCKET_NAME: $GCS_BUCKET_NAME"

# Authenticate google application credentials if provided
if [ $GOOGLE_APPLICATION_CREDENTIALS]; then
    echo "Authenticating service account"
    gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS} --project=${GCS_PROJECT}
fi

# TODO - ensure bucket exists and user has access

echo "Mounting GCS Fuse."
mkdir -p $GCSFUSE_MNT
gcsfuse --debug_gcs --debug_fuse --implicit-dirs $GCS_BUCKET_NAME $GCSFUSE_MNT
echo "Mounting completed."
echo $(ls $GCSFUSE_MNT)

# Sync data to external folder using unison
if [ $UNISON_MNT ]; then
    mkdir UNISON_MNT
    unison -repeat $POLL_INTERVAL -prefer newer -perms 0 -dontchmod -batch -copyonconflict $GCSFUSE_MNT $UNISON_MNT
fi
