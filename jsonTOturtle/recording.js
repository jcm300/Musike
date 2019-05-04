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
    console.log("\t\t :tag " + Array.from(ts).join(", ") + " ;")
}

function getUrls(urls){
    urls.forEach(url => {
        console.log(url.id + " a owl:NamedIndividual, :URL ;")
        console.log("\t\t :label \"" + url.name + "\" ;")
        console.log("\t\t :value \"" + url.value + "\" .\n")
    })
}

async function procElem(jsonLine){
    if(jsonLine.annotation!=null)
        console.log("\t\t :about " + JSON.stringify(jsonLine.annotation) + " ;")

    if(jsonLine.disambiguation!="")
        console.log("\t\t :disambiguation " + JSON.stringify(jsonLine.disambiguation) + " ;")
    
    var relationsAux = getRelations(jsonLine.relations)
    var urls = relationsAux[0]
    var langs = relationsAux[1]

    if(jsonLine['artist-credit']!=null && jsonLine['artist-credit'].length>0){
        var artists = []
        await asyncForEach(jsonLine['artist-credit'], async (c) => {
            var idArt = await getId("artist",c.artist.id)
            artists.push(":artist_" + idArt)
        })
        console.log("\t\t :artistCredit " + artists.join(", ") + " ;")
    }

    if(jsonLine.length!=null)
        console.log("\t\t :duration \"" + jsonLine.length + "\" ;")

    if(langs.size>0)
        console.log("\t\t :language " + Array.from(langs).join(", ") + " ;")

    if(jsonLine.tags!=null && jsonLine.tags.length>0)
        getTags(jsonLine.tags)

    console.log("\t\t :title " + JSON.stringify(jsonLine.title) + " .\n")

    getUrls(urls)
}

async function main(){
    while (line = liner.next()) {
        var jsonLine = JSON.parse(line)

        var id = await getId("recording",jsonLine.id)
        console.log(":recording_" + id + " a owl:NamedIndividual, :Recording ;")
        await procElem(jsonLine)
    }
}

main()
