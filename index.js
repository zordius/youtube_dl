'use strict';

var YA = require("youtube-api"),
    TK = process.argv[2],
    L = process.argv[3];

if (process.argv.length < 4) {
    console.log('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' [project_key] [playlist]');
    process.exit(1);
}

YA.playlistItems.list({
    auth: TK,
    part: 'snippet,contentDetails',
    maxResults: 50,
    playlistId: L
}, function(err, D) {
    if (err) {
        console.log('ERROR!');
        console.log(err);
    } else {
        console.log(D);
    }
});
