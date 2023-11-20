#!/bin/sh

set -e

NODE_VERSION="v18.18.2"
GIT_REPO="fatiguediary"

DIR="$(cd -- "$(dirname "${0}")" > /dev/null 2>&1 ; pwd -P)"
PREFIX="/home/"
SUFFIX="/${GIT_REPO}/_service"
DIR=${DIR#"${PREFIX}"}
DIR=${DIR%"${SUFFIX}"}

HOME="/home/${DIR}"
SERVICE="${DIR}"
NODE_DIR="${HOME}/.nvm/versions/node/${NODE_VERSION}"

# refresh repo
cd ${HOME}/${GIT_REPO}
git checkout -f HEAD
git pull --rebase

# build
cd ${HOME}/${GIT_REPO}
${NODE_DIR}/bin/npm install --production
${NODE_DIR}/bin/npm run build

# install service
cp -f ${HOME}/${GIT_REPO}/_service/start.sh ${HOME}/

# restart service
sudo systemctl stop ${SERVICE}
sleep 1
sudo systemctl start ${SERVICE}
