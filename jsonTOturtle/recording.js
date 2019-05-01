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
    console.log("\t\t :tag " + Array.from(ts).join(", ") + " ;")
}

function getUrls(urls){
    urls.forEach(url => {
        console.log(url.id + " a owl:NamedIndividual, :URL ;")
        console.log("\t\t :label \"" + url.name + "\" ;")
        console.log("\t\t :value \"" + url.value + "\" .\n")
    })
}

var langs = new Set()
var urls = []

var lineReader = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

lineReader.on('line', function (line) {
    var jsonLine = JSON.parse(line)
    
    console.log(":recording_" + jsonLine.id + " a owl:NamedIndividual, :Recording ;")

    if(jsonLine.annotation!=null){
        console.log("\t\t :about " + JSON.stringify(jsonLine.annotation) + " ;")
    }

    if(jsonLine.disambiguation!=""){
        console.log("\t\t :disambiguation " + JSON.stringify(jsonLine.disambiguation) + " ;")
    }

    getRelations(jsonLine.relations)

    if(jsonLine['artist-credit']!=null && jsonLine['artist-credit'].length>0){
        var artists = []
        jsonLine['artist-credit'].forEach(c => {
            artists.push(":artist_" + c.artist.id)
        })
        console.log("\t\t :artistCredit " + artists.join(", ") + " ;")
    }

    if(jsonLine.length!=null){
        console.log("\t\t :duration \"" + jsonLine.length + "\" ;")
    }

    if(langs.size>0){
        console.log("\t\t :language " + Array.from(langs).join(", ") + " ;")
        langs = new Set()
    }

    if(jsonLine.tags!=null && jsonLine.tags.length>>0){
        getTags(jsonLine.tags)
    }

    console.log("\t\t :title " + JSON.stringify(jsonLine.title) + " .\n")

    getUrls(urls)
    urls = []
})
