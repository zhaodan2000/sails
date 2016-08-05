"use strict"

function eventchooser(info){
    this.event = info["event"];
    this.callback = info["callback"];
    this.choose = function(info){
        if(info["event"] && typeof(info["event"]) != "undefined"){
            if(info["event"] == this.event){
                callback(info["result"]);
            } else {
                info["passfunc"](info["result"]);
            }
        }
    }
}