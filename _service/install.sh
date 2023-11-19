#!/bin/sh

set -e

GIT_REPO="fatiguediary"

DIR="$(cd -- "$(dirname "${0}")" > /dev/null 2>&1 ; pwd -P)"
PREFIX="/home/"
SUFFIX="/${GIT_REPO}/_service"
DIR=${DIR#"${PREFIX}"}
DIR=${DIR%"${SUFFIX}"}

HOME="/home/${DIR}"
SERVICE="${DIR}"

cp -f ${HOME}/${GIT_REPO}/_service/start.sh ${HOME}/
cp -f ${HOME}/${GIT_REPO}/_service/template.service /etc/systemd/system/${SERVICE}.service

sed -i -e "s/SERVICE/${SERVICE}/" /etc/systemd/system/${SERVICE}.service

systemctl stop ${SERVICE}
systemctl daemon-reload
systemctl enable ${SERVICE}
systemctl start ${SERVICE}
sleep 1
systemctl status ${SERVICE}
