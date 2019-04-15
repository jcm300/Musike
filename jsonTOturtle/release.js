var readline = require("readline")
var fs = require("fs")

var lineReader = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

lineReader.on('line', function (line) {
    var jsonLine = JSON.parse(line)
    var id = jsonLine['release-group'].id
    var tracks = new Set()
    
    if(jsonLine.media!=null && jsonLine.media.length>0){
        jsonLine.media.forEach(m => {
            if(m.tracks!=null && m.tracks.length>0){
                m.tracks.forEach(t => {
                    tracks.add(":recording_" + t.recording.id) 
                })
            }
            if(tracks.size>0){
                console.log(":album_" + id + " :hasTrack " + Array.from(tracks).join(", ") + " .")
            }
        })
    }
})

//lineReader.on("close", () => {
//})
