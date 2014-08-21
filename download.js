'use strict';

var http = require('http'),
    fs = require('fs'),
    F = process.argv[2],
    T = process.argv[3],
    plist = [],
    usage = function () {
        console.warn('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' ./playlist.json [save_path]');
        process.exit(1);
    },
    downloadList = function () {
        var D = plist.pop(),
            F;

        if (!D.contentDetails || !D.contentDetails.videoId || !D.contentDetails.note) {
            console.warn(D);
            console.warn('Bad data! the video may be removed or the playlist note is incorrect!');
            process.exit(4);
        }

        F = D.contentDetails.note.replace(/ |-/g, '_') + '.mp3';

        console.log('Now downloading video ' + D.contentDetails.videoId + ' to ' + F + '...');

        if (plist.length) {
            downloadList();
        }
    };

if (process.argv.length < 3) {
    usage();
}

try {
    plist = require(F);
} catch (E) {
    console.warn(E);
    process.exit(2);
}

if (plist.length) {
    downloadList();
} else {
    console.warn('Empty playlist file!');
    process.exit(3);
}
