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

# Generate documentation and push it to GitHub
echo -e "\e[36m\e[1mGenerating documentation for \"${SOURCE}\"."
gendoc

# Initialise some useful variables
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Decrypt and add the ssh key
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy/deploy-key.enc -out deploy/deploy-key.pem -d
chmod 600 deploy/deploy-key.pem
eval `ssh-agent -s`
ssh-add deploy/deploy-key.pem

# Checkout the repo in the target branch so we can build docs and push to it
TARGET_BRANCH="docs"
git clone $REPO out -b $TARGET_BRANCH

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
