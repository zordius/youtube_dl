'use strict';

var ytdl = require('ytdl-core'),
    fs = require('fs'),
    F = process.argv[2],
    T = process.argv[3] || '',
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

        F = T + D.contentDetails.note.replace(/ |-/g, '_') + '.mp4';

        console.log('Now downloading video ' + D.contentDetails.videoId + ' to ' + F + '...');

        if (fs.existsSync(F)) {
            if (fs.statSync(F).size) {
                console.warn(' File already downloaded, skip.');
                return next();
            } else {
                console.warn(' 0 size file already there, I will overwrite on it.');
            }
        }

        F = fs.createWriteStream(F);
        F.on('finish', function () {
            F.close();
            console.log(' Saved!');
            next();
        });

        ytdl('http://www.youtube.com/watch?v=' + D.contentDetails.videoId, {
            filter: function (format) {
                return (format.audioBitrate === 128) && (format.container === 'mp4');
            }
        }).pipe(F);
    },
    next = function () {
        if (plist.length) {
            downloadList();
        } else {
            console.log('Done!');
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
