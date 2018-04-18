#!/bin/bash
# Adapted from https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
# and https://github.com/discordjs/Commando/blob/master/deploy/deploy.sh.

set -e

tests () {
  npm test
}

gendoc () {
  npm run lint
  npm run docs
}

dockerize () {
  DOCKER_RELEASE="$1"
  tests
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  docker build -t sharpen .
  docker run -d sharpen
  docker ps -a
  docker tag sharpen:latest brinkflew/sharpen:"$DOCKER_RELEASE"
  docker push brinkflew/sharpen:"$DOCKER_RELEASE"
}

# For revert branches, do nothing
if [[ "$TRAVIS_BRANCH" == revert-* ]]; then
  echo -e "\e[36m\e[1mBuild triggered for reversion branch \"${TRAVIS_BRANCH}\" - Nothing to do."
  exit 0
fi

# For PRs, only run tests
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo -e "\e[36m\e[1mBuild triggered for PR #${TRAVIS_PULL_REQUEST} to branch \"${TRAVIS_BRANCH}\" - Running tests."
  tests
  exit 0
fi

# Figure out the source of the build
if [ -n "$TRAVIS_TAG" ]; then
  echo -e "\e[36m\e[1mBuild triggered for tag \"${TRAVIS_TAG}\"."
  SOURCE=$TRAVIS_TAG
  SOURCE_TYPE="tag"
else
  echo -e "\e[36m\e[1mBuild triggered for branch \"${TRAVIS_BRANCH}\"."
  SOURCE=$TRAVIS_BRANCH
  SOURCE_TYPE="branch"

  # Dockerize the master branch
  if [[ "$SOURCE" == master ]]; then
    echo -e "\e[36m\e[1mDockerizing branch \"${TRAVIS_BRANCH}\"."
    dockerize "$SOURCE"
  fi
fi

# Generate documentation and push it to GitHub
echo -e "\e[36m\e[1mGenerating documentation for \"${SOURCE}\"."
gendoc

# Initialise some useful variables
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

if [ -d out ]; then
  rm -Rf out
fi

# Clone the existing GitHub pages for this repo into out
TARGET_BRANCH="$SOURCE"
git clone $REPO out
cd out
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

# Clean out existing contents
rm -rf out/docs/**/* || exit 0

# Move the generated doc files to the newly-checked-out repo
mv docs out

# Commit and push
echo -e "\e[36m\e[1mPushing documentation to \"${TARGET_BRANCH}\"."
cd out
git add .
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"
git commit -m "Docs build for ${SOURCE_TYPE} ${SOURCE}: ${SHA}" || true
git push $SSH_REPO $TARGET_BRANCH

exit 0
