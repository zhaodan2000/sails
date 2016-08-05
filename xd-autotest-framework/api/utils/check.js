"use strict"

exports.checkParamDetail = function(param){
    var checkRes = {
        isOk:true,
        info:''
    };
    if(param && typeof param != 'undefined'){
        for( var arg in param){
            if(!param[arg] || typeof param[arg] == 'undefined'){
                checkRes.isOk = false;
                checkRes.info += arg + ' cant be null. ';
            }
        }
    }
    return checkRes;
}