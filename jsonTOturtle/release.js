var readline = require("readline")
var fs = require("fs")

function getRelations(rels){
    rels.forEach(r => {
        if(r.url!=null){
            urls.push({id: ":url_" + r.url.id, name: r.type, value: r.url.resource})
        }else if(r.work!=null){
            if(r.type=="performance"){
                if(r.work.language!=null){
                    langs.add("\"" + r.work.language + "\"")
                }
                if(r.work.languages!=null && r.work.languages.length>0){
                    r.work.languages.forEach(l => langs.add("\"" + l + "\""))
                }
            }
        }
    })

    if(urls.length>0)
        console.log("\t\t :hasURL " + urls.map(e => e.id).join(", ") + " ;")
}

function getTags(tags){
    var ts = new Set()
    tags.forEach(t => {
        ts.add("\"" + t.name + "\"")
    })
    return "\t\t :tag " + Array.from(ts).join(", ") + " ;"
}

function getUrls(urls){
    urls.forEach(url => {
        console.log(url.id + " a owl:NamedIndividual, :URL ;")
        console.log("\t\t :label \"" + url.name + "\" ;")
        console.log("\t\t :value \"" + url.value + "\" .\n")
    })
}

function getRecording(rec, tags){
    console.log(":recording_" + rec.id + " a owl:NamedIndividual, :Recording ;")

    if(rec.annotation!=null){
        console.log("\t\t :about " + JSON.stringify(rec.annotation) + " ;")
    }

    if(rec.disambiguation!=""){
        console.log("\t\t :disambiguation " + JSON.stringify(rec.disambiguation) + " ;")
    }

    if(rec.relations!=null && rec.relations.length>0){
        getRelations(rec.relations)
    }

    if(rec['artist-credit']!=null && rec['artist-credit'].length>0){
        var artists = []
        rec['artist-credit'].forEach(c => {
            artists.push(":artist_" + c.artist.id)
        })
        console.log("\t\t :artistCredit " + artists.join(", ") + " ;")
    }

    if(rec.length!=null){
        console.log("\t\t :duration \"" + rec.length + "\" ;")
    }

    if(langs.size>0){
        console.log("\t\t :language " + Array.from(langs).join(", ") + " ;")
        langs = new Set()
    }

    if(tags!=""){
        console.log(tags)
    }

    console.log("\t\t :title " + JSON.stringify(rec.title) + " .\n")

    getUrls(urls)
    urls = []
}

var langs = new Set()
var urls = []

var lineReader = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

lineReader.on('line', function (line) {
    var jsonLine = JSON.parse(line)
    var id = jsonLine['release-group'].id
    var tracks = new Set()
    var tags = ""

    if(jsonLine.tags!=null && jsonLine.tags.length>>0){
        tags = getTags(jsonLine.tags)
    }
    
    if(jsonLine.media!=null && jsonLine.media.length>0){
        jsonLine.media.forEach(m => {
            if(m.tracks!=null && m.tracks.length>0){
                m.tracks.forEach(t => {
                    tracks.add(":recording_" + t.recording.id) 
                    getRecording(t.recording,tags)
                })
            }
            if(tracks.size>0){
                console.log(":album_" + id + " :hasTrack " + Array.from(tracks).join(", ") + " .\n")
            }
        })
    }
})
