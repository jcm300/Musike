var readline = require("readline")
var fs = require("fs")

function getRelations(rels){
    rels.forEach(r => {
        if(r.url!=null)
            urls.push({id: ":url_" + r.url.id, name: r.type, value: r.url.resource})
    })

    if(urls.length>0)
        console.log("\t\t :hasURL " + urls.map(e => e.id).join(", ") + " ;")
}

function getUrls(urls){
    urls.forEach(url => {
        console.log(url.id + " a owl:NamedIndividual, :URL ;")
        console.log("\t\t :label \"" + url.name + "\" ;")
        console.log("\t\t :value \"" + url.value + "\" .\n")
    })
}

var urls = []

var lineReader = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

lineReader.on('line', function (line) {
    var jsonLine = JSON.parse(line)
    
    console.log(":album_" + jsonLine.id + " a owl:NamedIndividual, :Album ;")

    if(jsonLine.annotation!=null){
        console.log("\t\t :about " + JSON.stringify(jsonLine.annotation) + " ;")
    }

    if(jsonLine.disambiguation!=""){
        console.log("\t\t :disambiguation " + JSON.stringify(jsonLine.disambiguation) + " ;")
    }

    getRelations(jsonLine.relations)

    if(jsonLine['first-release-date']!=null && jsonLine['first-release-date']!=""){
        console.log("\t\t :firstReleaseDate \"" + jsonLine['first-release-date'] + "\" ;")       
    }

    console.log("\t\t :title " + JSON.stringify(jsonLine.title) + " .\n")

    getUrls(urls)
    urls = []
})
