#!/bin/sh

NODE_VERSION="v18.18.2"
GIT_REPO="fatiguediary"

HOME="/home/${USER}"
NODE_DIR="${HOME}/.nvm/versions/node/${NODE_VERSION}"

export PATH=${NODE_DIR}/bin:/usr/local/bin:/usr/bin:/bin
export NVM_DIR=${HOME}/.nvm
export NVM_INC=${NODE_DIR}/include/node
export NVM_BIN=${NODE_DIR}/bin
export NVM_CD_FLAGS=

cd ~/${GIT_REPO}
npm run start
