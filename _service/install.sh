#!/bin/sh

set -e

NODE_VERSION="v18.19.0"
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

# customize for branch
case "${USER}" in
    fatiguediary-dev)
        rm -f ${HOME}/${GIT_REPO}/public/sitemap.xml
        cp -f ${HOME}/${GIT_REPO}/app/robots-dev.txt ${HOME}/${GIT_REPO}/app/robots.txt
        ;;
esac

# build
export PATH=${NODE_DIR}/bin:/usr/local/bin:/usr/bin:/bin
export NVM_DIR=${HOME}/.nvm
export NVM_INC=${NODE_DIR}/include/node
export NVM_BIN=${NODE_DIR}/bin
export NVM_CD_FLAGS=
cd ${HOME}/${GIT_REPO}
${NODE_DIR}/bin/npm install --production
${NODE_DIR}/bin/npm run build

# install service
cp -f ${HOME}/${GIT_REPO}/_service/start.sh ${HOME}/

# restart service
sudo systemctl stop ${SERVICE}
sleep 1
sudo systemctl start ${SERVICE}
