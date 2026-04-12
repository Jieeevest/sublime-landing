#!/usr/bin/env sh

set -eu

SERVICE_NAME="sublime-landing"

echo "Building image for ${SERVICE_NAME}..."
docker compose build "${SERVICE_NAME}"

echo "Running or restarting ${SERVICE_NAME}..."
docker compose up -d --force-recreate "${SERVICE_NAME}"

echo "Done. Current status:"
docker compose ps
