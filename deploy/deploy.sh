#!/bin/bash
# Adapted from https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
# and https://github.com/discordjs/Commando/blob/master/deploy/deploy.sh.

set -e

tests () {
  npm test
}

dockerize () {
  DOCKER_RELEASE="$1"
  tests
  docker login --username="$DOCKER_USERNAME" --password="$DOCKER_PASSWORD"
  docker build -t sharpen
  docker tag sharpen:latest brinkflew/sharpen:"$DOCKER_RELEASE"
  docker push brinkflew/sharpen:"$DOCKER_RELEASE"
}

# For revert branches, do nothing
if [[ "$TRAVIS_BRANCH" == revert-* ]]; then
  echo -e "\e[36m\e[1mBuild triggered for reversion branch \"${TRAVIS_BRANCH}\" - doing nothing."
  exit 0
fi

# For PRs, only run tests
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo -e "\e[36m\e[1mBuild triggered for PR #${TRAVIS_PULL_REQUEST} to branch \"${TRAVIS_BRANCH}\" - only running tests."
  tests
  exit 0
fi

# Figure out the source of the build
if [ -n "$TRAVIS_TAG" ]; then
  echo -e "\e[36m\e[1mBuild triggered for tag \"${TRAVIS_TAG}\"."
  dockerize "$TRAVIS_TAG"
  exit 0
else
  echo -e "\e[36m\e[1mBuild triggered for branch \"${TRAVIS_BRANCH}\"."
  dockerize "latest"
  exit 0
fi
