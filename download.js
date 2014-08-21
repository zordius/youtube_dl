'use strict';

var http = require('http'),
    fs = require('fs'),
    F = process.argv[2],
    plist = [],
    usage = function () {
        console.warn('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' [playlist.json]');
        process.exit(1);
    },
    downloadList = function () {
        console.log(plist);
    };

if (process.argv.length < 3) {
    usage();
}

try {
    plist = require(F);
} catch (E) {
    console.warn(E);
    usage();
}

downloadList();
