'use strict';

var YA = require('youtube-api'),
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

        console.warn('fetching playlist items...');

        YA.playlistItems.list(args, function(err, D) {
            if (err) {
                console.warn('ERROR!');
                console.warn(err);
                process.exit(2);
            } else {
                if (D.items) {
                    plist = plist.concat(D.items);
                }
                if (D.nextPageToken) {
                    getPlistNext(D.nextPageToken);
                } else {
                    console.log(JSON.stringify(plist));
                    console.warn('DONE!');
                    console.warn(plist.length);
                }
            }
        });
    };

if (process.argv.length < 4) {
    console.warn('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' project_key playlist_id');
    process.exit(1);
}

getPlistNext();
