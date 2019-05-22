var fs = require("fs")
var readline = require("readline")

var lineReader = readline.createInterface({
  input: fs.createReadStream(process.argv[3])
});

var file = fs.readFileSync(process.argv[2])
var file = JSON.parse(file)

var acum = {
    artistIds: new Set(file.artistIds),
    recordingIds: new Set(file.recordingIds),
    albumIds: new Set(file.albumIds),
    areaIds: new Set(file.areaIds),
    artist: new Set(file.artist),
    recording: new Set(file.recording),
    album: new Set(file.album),
    area: new Set(file.area)
}

lineReader.on('line', function (line) {
    line.replace(/^:([a-z]+)_([0-9a-zA-Z-]+)/g,(m,p1,p2) => {
        if(p1=='artist')
            acum.artistIds.add(p2)
        else if(p1=='recording')
            acum.recordingIds.add(p2)
        else if(p1=='album')
            acum.albumIds.add(p2)
        else if(p1=='area')
            acum.areaIds.add(p2)
    })

    line.replace(/:(album|artist|area|recording)_([0-9a-zA-Z-]+)/g,(m,p1,p2) => {
        acum[p1].add(p2)
    })
})

lineReader.on("close", () => {
    for(var key in acum){
        acum[key] = Array.from(acum[key])
    }
    console.log(JSON.stringify(acum, null, 4))
})
