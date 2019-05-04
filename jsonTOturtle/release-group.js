var readlineSync = require("n-readlines")
var liner = new readlineSync(process.argv[2])
var getId = require("./auxFunctions.js").getId
var asyncForEach = require("./auxFunctions.js").asyncForEach

function getRelations(rels){
    var urls = []

    rels.forEach(r => {
        if(r.url!=null)
            urls.push({id: ":url_" + r.url.id, name: r.type, value: r.url.resource})
    })

    if(urls.length>0)
        console.log("\t\t :hasURL " + urls.map(e => e.id).join(", ") + " ;")

    return urls
}

function getUrls(urls){
    urls.forEach(url => {
        console.log(url.id + " a owl:NamedIndividual, :URL ;")
        console.log("\t\t :label \"" + url.name + "\" ;")
        console.log("\t\t :value \"" + url.value + "\" .\n")
    })
}

function procElem(jsonLine){
    if(jsonLine.annotation!=null){
        console.log("\t\t :about " + JSON.stringify(jsonLine.annotation) + " ;")
    }

    if(jsonLine.disambiguation!=""){
        console.log("\t\t :disambiguation " + JSON.stringify(jsonLine.disambiguation) + " ;")
    }

    var urls = getRelations(jsonLine.relations)

    if(jsonLine['first-release-date']!=null && jsonLine['first-release-date']!=""){
        console.log("\t\t :firstReleaseDate \"" + jsonLine['first-release-date'] + "\" ;")       
    }

    console.log("\t\t :title " + JSON.stringify(jsonLine.title) + " .\n")

    getUrls(urls)
}

async function main(){
    while (line = liner.next()) {
        var jsonLine = JSON.parse(line)

        var id = await getId("release-group",jsonLine.id)
        console.log(":album_" + id + " a owl:NamedIndividual, :Album ;")
        procElem(jsonLine)
    }
}

main()
