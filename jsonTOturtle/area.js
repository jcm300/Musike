var readline = require("readline")
var fs = require("fs")

//get the elements that are present in arr2 and not in arr1
function diff (arr1, arr2) {return arr2.filter(x => !arr1.includes(x));}

function getAliases(aliases){
    var aliasesSet = new Set()
    aliases.forEach(a => {
        if(a.ended==false){
            if(a.locale!=null)
                aliasesSet.add("\"" + a.name.replace(/(["\n])/g,"\\$1") + "(" + a.locale.replace(/(["\n])/g,"\\$1") + ")\"")
            else 
                aliasesSet.add("\"" + a.name.replace(/(["\n])/g,"\\$1") + "\"")
        }
    })
    if(aliasesSet.size>0)
        console.log("\t\t :alias " + Array.from(aliasesSet).join(", ") + " ;")
}

function getRelations(relations){
    relations.forEach(r => {
        if(r.url!=null){
            urls.push({id: r.url.id, name: r.type, value: r.url.resource})
            console.log("\t\t :url :url_" + r.url.id + " ;")
        }else if(r.area!=null){
            //areaIds.push({id: r.area.id, name: r.area.name}) 
            if(r.direction=="forward")
                console.log("\t\t :hasPart :area_" + r.area.id + " ;")
            else //backward
                console.log("\t\t :partOf :area_" + r.area.id + " ;")
        }
    })
}

function getUrls(urls){
    urls.forEach(url => {
        console.log(":url_" + url.id + " a owl:NamedIndividual, :URL ;")
        console.log("\t\t :name \"" + url.name + "\" ;")
        console.log("\t\t :value \"" + url.value + "\" .\n")
    })
}

var urls = [] //ids dos urls + name + value para no fim de cada area criar os urls
//var areaIds = [] //ids das áreas nas relações + nome, no caso de não estarem definidas no fim de tudo
//var ids = [] //ids encontrados em cada linha

var lineReader = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

lineReader.on('line', function (line) {
    var jsonLine = JSON.parse(line)
    
    //ids.push(jsonLine.id)

    console.log(":area_" + jsonLine.id + " a owl:NamedIndividual, :Area ;")
    if(jsonLine.type!=null)
        console.log("\t\t :type \"" + jsonLine.type.replace(/(["\n])/g,"\\$1") + "\" ;")
    if(jsonLine.aliases!=null){
        if(jsonLine.aliases.length>0)
            getAliases(jsonLine.aliases)
    }
    if(jsonLine.annotation!=null){
        console.log("\t\t :about \"" + jsonLine.annotation.replace(/(["\n])/g,"\\$1") + "\" ;")
    }
    if(jsonLine.disambiguation!=""){
        console.log("\t\t :disambiguation \"" + jsonLine.disambiguation.replace(/(["\n])/g,"\\$1") + "\" ;")
    }
    if(jsonLine['life-span'].begin!=null){
        console.log("\t\t :beginDate \"" + jsonLine['life-span'].begin.replace(/(["\n])/g,"\\$1") + "\" ;")
    }
    if(jsonLine['life-span'].end!=null){
        console.log("\t\t :endDate \"" + jsonLine['life-span'].end.replace(/(["\n])/g,"\\$1") + "\" ;")
    }
    getRelations(jsonLine.relations)
    console.log("\t\t :name \"" + jsonLine.name.replace(/(["\n])/g,"\\$1") + "\" .\n")

    //create urls after each area
    getUrls(urls)
    urls = []
})

//lineReader.on("close", () => {
//})
