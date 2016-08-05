"use strict"

exports.redirect = function (res) {
    res.writeHead(302, {
        'Location': 'index.html'
    });
    res.end();
}

exports.redirectLoc = function (res, loc) {
    res.writeHead(302, {
        'Location': loc
    });
    res.end();
}