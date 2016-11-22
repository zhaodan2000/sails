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
  chmod u+x start.sh
   ./start.sh stop
   sleep 6
  ./start.sh start
}

init_env
deploy
