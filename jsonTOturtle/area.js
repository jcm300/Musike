var readline = require("readline")
var fs = require("fs")

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

//print relations area to urls, and relations between areas
function getRelations(relations){
    var areasForward = []
    var areasBackward = []

    relations.forEach(r => {
        if(r.url!=null){
            urls.push({id: ":url_" + r.url.id, name: r.type, value: r.url.resource})
        }else if(r.area!=null){
            if(r.direction=="forward")
                areasForward.push(":area_" + r.area.id)
            else //backward
                areasBackward.push(":area_" + r.area.id)
        }
    })

    if(areasBackward.length>0)
        console.log("\t\t :partOf " + areasBackward.join(", ") + " ;")
    if(areasForward.length>0)
        console.log("\t\t :hasPart " + areasForward.join(", ") + " ;")
    if(urls.length>0)
        console.log("\t\t :hasURL " + urls.map(e => e.id).join(", ") + " ;")
}

//print urls
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
    
    console.log(":area_" + jsonLine.id + " a owl:NamedIndividual, :Area ;")
    
    if(jsonLine.type!=null)
        console.log("\t\t :type " + JSON.stringify(jsonLine.type) + " ;")
    
    if(jsonLine.aliases!=null){
        if(jsonLine.aliases.length>0)
            getAliases(jsonLine.aliases)
    }
    
    if(jsonLine.annotation!=null){
        console.log("\t\t :about " + JSON.stringify(jsonLine.annotation) + " ;")
    }
    
    if(jsonLine.disambiguation!=""){
        console.log("\t\t :disambiguation " + JSON.stringify(jsonLine.disambiguation) + " ;")
    }

    if(jsonLine['life-span'].begin!=null){
        console.log("\t\t :beginDate " + JSON.stringify(jsonLine['life-span'].begin) + " ;")
    }

    if(jsonLine['life-span'].end!=null){
        console.log("\t\t :endDate " + JSON.stringify(jsonLine['life-span'].end) + " ;")
    }

    getRelations(jsonLine.relations)
    console.log("\t\t :mbID \"" + jsonLine.id + "\" ;")
    console.log("\t\t :name " + JSON.stringify(jsonLine.name) + " .\n")

    getUrls(urls)
    urls = []
})
