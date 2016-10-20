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
	rm -rf $baseop
	tar zxvf $basedir/$baseop/*.tar.gz
  chmod 777 start.sh
  ./start.sh start
}

init_env
deploy
