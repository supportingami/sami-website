# Support binding local folder directly with google cloud storage bucket via GCSFuse
# yarn scripts docker build --only gcs_fuse

# Using as a standalone image requires additional binds to allow sharing file system
# with other containers, handled using unison. 
# NOTE - this severely limits concurrency ability and should only be used for local testing

# Source References:
# https://cloud.google.com/storage/docs/gcs-fuse
# https://github.com/GoogleCloudPlatform/nodejs-docs-samples/tree/main/run/filesystem
# https://hub.docker.com/r/chiaen/docker-gcsfuse/dockerfile
# https://github.com/GoogleCloudPlatform/gcsfuse/blob/master/Dockerfile
# https://github.com/splitgraph/seafowl-gcsfuse
# https://www.splitgraph.com/blog/deploying-serverless-seafowl


# Setup Buildx builder
FROM docker
COPY --from=docker/buildx-bin /buildx /usr/libexec/docker/cli-plugins/docker-buildx
RUN docker buildx version


# Install GCS Fuse to allow volume mount to Google Cloud Storage
FROM golang:1.22-alpine as gcsfuse_builder
ENV GOPATH /go
RUN apk update add --no-cache git \
    && go install github.com/googlecloudplatform/gcsfuse@latest


# Initialise GCP and setup fuse bindings
FROM python:3.12-alpine

# id of gcs project
ENV GCP_PROJECT=
# name of gcs buckets
ENV GCS_DB_BUCKET_NAME=
ENV GCS_PUBLIC_BUCKET_NAME=
# path to google application credential json file
ENV GOOGLE_APPLICATION_CREDENTIALS=
# path to mount gcs fuse files, e.g. /mnt/gcs/db /mnt/gcs/public
ENV GCSFUSE_DB_MNT=
ENV GCSFUSE_PUBLIC_MNT=
# path to sync gcs_fuse files with (forces dl from gcs)
ENV UNISON_DB_MNT=
ENV UNISON_PUBLIC_MNT=
# poll interval used by unison when checking for new files
ENV POLL_INTERVAL=10

# Add gcloud and gcsfuse bins and deps
COPY --from=gcr.io/google.com/cloudsdktool/google-cloud-cli:alpine /google-cloud-sdk/ /usr/local/gcloud/google-cloud-sdk/
COPY --from=gcsfuse_builder /go/bin/gcsfuse /usr/local/bin
ENV PATH $PATH:/usr/local/gcloud/google-cloud-sdk/bin
RUN apk add --update --no-cache bash ca-certificates fuse unison \
    && rm -rf /var/cache/apk/* \
    && rm -rf /tmp/*

# # expose as volume to allow adding files externally
# VOLUME ["/data"]
# VOLUME [ "/mnt/gcs" ]

# Copy gcsfuse scripts and make executable
COPY docker/gcsfuse /gcsfuse
RUN chmod -R +x gcsfuse

CMD /gcsfuse/run.sh
# "/bin/ash -c 'while sleep 3600; do :; done'"