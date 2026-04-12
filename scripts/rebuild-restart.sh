#!/usr/bin/env sh

set -eu

SERVICE_NAME="sublime-landing"

echo "Stopping existing container for ${SERVICE_NAME}..."
docker compose down

echo "Building image for ${SERVICE_NAME}..."
docker compose build "${SERVICE_NAME}"

echo "Starting ${SERVICE_NAME}..."
docker compose up -d "${SERVICE_NAME}"

echo "Done. Current status:"
docker compose ps
