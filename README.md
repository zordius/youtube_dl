youtube_dl
==========

A nodejs command line tool to download youtube playlist into mp3 files

How to use (for developers)
---------------------------

First, you should create a google API project with a project key.

Then...

1. fetch playlist json data.
```
node playlist.js project_key play_list_id > playlist.json
```
2. download files by json data
```
node download.js playlist.json
```

How to download (for none developers)
-------------------------------------

TBD....

Why this tool?
--------------

I created this to download my youtube playlist: 初音系列-名曲影片收錄計劃
https://www.youtube.com/playlist?list=PLd9h8qIvou__eaEQ6XFHR6Z3DmDVfz_r_

The name of file will fit into my notes, and then I can play these mp3 files.
