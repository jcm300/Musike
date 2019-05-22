#!/usr/bin/bash

#install dependencies
npm i

#convert
node area.js ../datasets/JSON/area.json > ../datasets/Turtle/area.ttl
node artist.js ../datasets/JSON/artist.json > ../datasets/Turtle/artist.ttl
node recording.js ../datasets/JSON/recording.json > ../datasets/Turtle/recording.ttl
node release-group.js ../datasets/JSON/release-group.json > ../datasets/Turtle/release-group.ttl
node release.js ../datasets/JSON/release.json > ../datasets/Turtle/release.ttl
node work.js ../datasets/JSON/work.json > ../datasets/Turtle/work.ttl

#verify
node getIdsFromTTL.js ids.json ../datasets/Turtle/area.ttl > ids1.json
node getIdsFromTTL.js ids1.json ../datasets/Turtle/artist.ttl > ids2.json
node getIdsFromTTL.js ids2.json ../datasets/Turtle/recording.ttl > ids3.json
node getIdsFromTTL.js ids3.json ../datasets/Turtle/release-group.ttl > ids4.json
node getIdsFromTTL.js ids4.json ../datasets/Turtle/release.ttl > ids5.json
node getIdsFromTTL.js ids5.json ../datasets/Turtle/work.ttl > ids6.json

#result files should have a empty list
node compare.js ids6.json area > areaEr
node compare.js ids6.json artist > artistEr
node compare.js ids6.json album > albumEr
node compare.js ids6.json recording > recordingEr

#clean
rm ids1 ids2 ids3 ids4 ids5 ids6

#in the results obtained artist was not empty, because of some artists in recordings from release.ttl, so to get that artists we can do:
node remainArtistsFromRelease.js ../datasets/JSON/release.json artistEr > ../datasets/Turtle/artistFromRelease.ttl

#clean
rm areaEr artistEr albumEr recordingEr

#join all
cd ../datasets/Turtle 
cat structure.ttl area.ttl artist.ttl artistFromRelease.ttl release-group.ttl recording.ttl release.ttl work.ttl > MusicBrainz.ttl

#clean
rm structure.ttl area.ttl artist.ttl artistFromRelease.ttl release-group.ttl recording.ttl release.ttl work.ttl
