#!/bin/sh

HOME="/home/fatiguediary-beta"
NODE="${HOME}/.nvm/versions/node/v18.18.2"
export PATH=${NODE}/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games
export NVM_DIR=${HOME}/.nvm
export NVM_INC=${NODE}/include/node
export NVM_BIN=${NODE}/bin
export NVM_CD_FLAGS=

cd ~/fatiguediary
npm run start
