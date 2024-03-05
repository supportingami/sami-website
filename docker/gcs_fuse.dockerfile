# yarn scripts docker build --only gcs_fuse

# https://cloud.google.com/storage/docs/gcs-fuse
# https://github.com/GoogleCloudPlatform/gcsfuse/blob/master/Dockerfile
# https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/main/run/filesystem/gcsfuse.Dockerfile
# https://github.com/GoogleCloudPlatform/gcsfuse/blob/master/docs/semantics.md
# https://github.com/splitgraph/seafowl-gcsfuse


# Setup Buildx builder
# syntax=docker/dockerfile:1
FROM docker
COPY --from=docker/buildx-bin /buildx /usr/libexec/docker/cli-plugins/docker-buildx
RUN docker buildx version


# Install GCS Fuse to allow volume mount to Google Cloud Storage
# https://cloud.google.com/storage/docs/gcs-fuse
# https://github.com/GoogleCloudPlatform/nodejs-docs-samples/tree/main/run/filesystem
# https://hub.docker.com/r/chiaen/docker-gcsfuse/dockerfile
FROM golang:1.22-alpine as builder

ENV GOPATH /go

ENV PATH /app/node_modules/.bin:$PATH

RUN apk update add --no-cache git \
    && go install github.com/googlecloudplatform/gcsfuse@latest


FROM python:3.12-alpine

ENV GCS_BUCKET_NAME="sami_website_uploads-18fd1f1"
ENV GCS_PROJECT="sami-website-365718"

RUN apk add --update --no-cache bash ca-certificates fuse bash rsync \
    && rm -rf /var/cache/apk/* && rm -rf /tmp/*  \
    && mkdir -p /mnt/gcs

# Setup gcloud auth (not required in gcloud env)
COPY --from=gcr.io/google.com/cloudsdktool/google-cloud-cli:alpine /google-cloud-sdk/ /usr/local/gcloud/google-cloud-sdk/
COPY backend/config/service-account.json /service-account.json
COPY docker/gcs_fuse_run.sh /gcs_fuse_run.sh

ENV PATH $PATH:/usr/local/gcloud/google-cloud-sdk/bin
ENV GOOGLE_APPLICATION_CREDENTIALS="/service-account.json"

# Ensure the script is executable
RUN chmod +x gcs_fuse_run.sh

COPY --from=builder /go/bin/gcsfuse /usr/local/bin

CMD ["/gcs_fuse_run.sh"]
# "/bin/ash -c 'while sleep 3600; do :; done'"