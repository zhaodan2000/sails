#!/bin/bash
##path##
basedir=/home/editor/sails
baseop=xd-autotest-framework

function init_env
{
	mkdir -p $basedir/$baseop
}

function deploy
{
	cd $basedir/$baseop
	tar zxvf $basedir/$baseop/*.tar.gz
  cd $baseop
  npm install
  chmod 777 start.sh
  ./start.sh start
}

init_env
deploy
