'use strict';

var YA = require("youtube-api"),
    TK = process.argv[2],
    L = process.argv[3],
    plist = [],
    getPlistNext = function (pageToken) {
        var args = {
            auth: TK,
            part: 'snippet,contentDetails',
            maxResults: 50,
            playlistId: L
        };

        if (pageToken) {
            args.pageToken = pageToken;
        }

        console.log('fetching playlist items...');

        YA.playlistItems.list(args, function(err, D) {
            if (err) {
                console.log('ERROR!');
                console.log(err);
            } else {
                if (D.items) {
                    plist = plist.concat(D.items);
                }
                if (D.nextPageToken) {
                    getPlistNext(D.nextPageToken);
                } else {
                    console.log('DONE!');
                    console.log(plist.length);
                }
            }
        });
    };

if (process.argv.length < 4) {
    console.log('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' [project_key] [playlist]');
    process.exit(1);
}

getPlistNext();
