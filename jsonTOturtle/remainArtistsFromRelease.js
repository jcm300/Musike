var fs = require("fs")
var readline = require("readline")
var lineReader = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

var file = fs.readFileSync(process.argv[3])
var artistIds = JSON.parse(file)

//print aliases
function getAliases(aliases){
    var aliasesSet = new Set()
    aliases.forEach(a => {
        if(a.ended==false){
            if(a.locale!=null)
                aliasesSet.add(JSON.stringify(a.name + "(" + a.locale + ")"))
            else
                aliasesSet.add(JSON.stringify(a.name))
        }
    })
    if(aliasesSet.size>0)
        console.log("\t\t :alias " + Array.from(aliasesSet).join(", ") + " ;")
}

function getArtist(rec){
    if(rec['artist-credit']!=null && rec['artist-credit'].length>0){
        rec['artist-credit'].forEach( c => {
            var index = artistIds.indexOf(c.artist.id)
            if(index != -1){
                //remove from list
                artistIds.splice(index, 1)

                //construct individual
                console.log(":artist_" + c.artist.id + " a owl:NamedIndividual, :Artist ;")

                if(c.artist.aliases!=null)
                    if(c.artist.aliases.length>0)
                        getAliases(c.artist.aliases)

                if(c.artist.annotation!=null)
                    console.log("\t\t :about " + JSON.stringify(c.artist.annotation) + " ;")

                if(c.artist.disambiguation!="")
                    console.log("\t\t :disambiguation " + JSON.stringify(c.artist.disambiguation) + " ;")

                if(c.artist['sort-name']!=null)
                    console.log("\t\t :sortName " + JSON.stringify(c.artist['sort-name']) + " ;")

                console.log("\t\t :name " + JSON.stringify(c.artist.name) + " .\n")
            }
        })
    }
}

lineReader.on('line', function (line) {
    var jsonLine = JSON.parse(line)

    if(jsonLine.media!=null && jsonLine.media.length>0){
        jsonLine.media.forEach( m => {
            if(m.tracks!=null && m.tracks.length>0){
                m.tracks.forEach( t => {
                    getArtist(t.recording)
                })
            }
        })
    }
})
