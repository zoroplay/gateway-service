#!/bin/bash

echo "Checking if .VERSION file exists..."
if [ ! -f .VERSION ]; then
  echo "ERROR: .VERSION file is missing"
  exit 1
fi

echo "Contents of .VERSION file:"
cat .VERSION

VERSION=$(cat .VERSION)
echo "VERSION is set to: $VERSION"

if [ -z "$VERSION" ]; then
  echo "ERROR: Version is empty"
  exit 1
fi

echo "Building Docker image with version $VERSION"
docker build -t "$CI_REGISTRY/$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME:$VERSION" .

if ! docker push "$CI_REGISTRY/$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME:$VERSION"; then
  echo "Docker push failed"
  exit 1
fi

echo "Finished building Docker image with tag $VERSION"
