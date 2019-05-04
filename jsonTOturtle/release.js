var readlineSync = require("n-readlines")
var liner = new readlineSync(process.argv[2])
var getId = require("./auxFunctions.js").getId
var asyncForEach = require("./auxFunctions.js").asyncForEach

function getRelations(rels){
    var urls = []
    var langs = new Set()

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

    return [urls,langs]
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

async function getRecording(rec, tags, id){
    console.log(":recording_" + id + " a owl:NamedIndividual, :Recording ;")

    if(rec.annotation!=null)
        console.log("\t\t :about " + JSON.stringify(rec.annotation) + " ;")

    if(rec.disambiguation!="")
        console.log("\t\t :disambiguation " + JSON.stringify(rec.disambiguation) + " ;")

    var urls = []
    var langs = []
    if(rec.relations!=null && rec.relations.length>0){
        var relationsAux = getRelations(rec.relations)
        urls = relationsAux[0]
        langs = relationsAux[1]
    }

    if(rec['artist-credit']!=null && rec['artist-credit'].length>0){
        var artists = []
        await asyncForEach(rec['artist-credit'], async (c) => {
            var idArt = await getId("artist",c.artist.id)
            artists.push(":artist_" + idArt)
        })
        console.log("\t\t :artistCredit " + artists.join(", ") + " ;")
    }

    if(rec.length!=null)
        console.log("\t\t :duration \"" + rec.length + "\" ;")

    if(langs.size>0)
        console.log("\t\t :language " + Array.from(langs).join(", ") + " ;")

    if(tags!="")
        console.log(tags)

    console.log("\t\t :title " + JSON.stringify(rec.title) + " .\n")

    getUrls(urls)
}

async function main(){
    while (line = liner.next()) {
        var jsonLine = JSON.parse(line)
        var id = await getId('release-group',jsonLine['release-group'].id)
        var tracks = new Set()
        var tags = ""

        if(jsonLine.tags!=null && jsonLine.tags.length>0){
            tags = getTags(jsonLine.tags)
        }
        
        if(jsonLine.media!=null && jsonLine.media.length>0){
            await asyncForEach(jsonLine.media, async (m) => {
                if(m.tracks!=null && m.tracks.length>0){
                    await asyncForEach(m.tracks, async (t) => {
                        var idRec = await getId("recording",t.recording.id)
                        tracks.add(":recording_" + idRec) 
                        await getRecording(t.recording,tags,idRec)
                    })
                }
                if(tracks.size>0){
                    console.log(":album_" + id + " :hasTrack " + Array.from(tracks).join(", ") + " .\n")
                }
            })
        }
    }
}

main()
