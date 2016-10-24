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
	tar zxf $basedir/$baseop/*.tar.gz
  chmod 777 start.sh
   ./start.sh stop
   sleep 2
  ./start.sh start
}

init_env
deploy
