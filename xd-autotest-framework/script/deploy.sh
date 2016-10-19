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
  #cp -rf $basedir/$baseop/conf/* /home/work/xiaodou/$baseop/WEB-INF/classes/conf/custom/env
	#rm -rf /home/work/xiaodou/$baseop/*.war
#	sh /home/work/xiaodou/$tomcat/bin/stop_tomcat.sh
#	sh /home/work/xiaodou/$tomcat/bin/start_tomcat.sh
  npm install
  /bin/bash ../start.sh
}

init_env
deploy
