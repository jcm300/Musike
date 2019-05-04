var readlineSync = require("n-readlines")
var liner = new readlineSync(process.argv[2])
var getId = require("./auxFunctions.js").getId

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

//print urls
function getUrls(urls){
    urls.forEach(url => {
        console.log(url.id + " a owl:NamedIndividual, :URL ;")
        console.log("\t\t :label \"" + url.name + "\" ;")
        console.log("\t\t :value \"" + url.value + "\" .\n")
    })
}

async function procElem(jsonLine){
    if(jsonLine.type!=null)
        console.log("\t\t :type " + JSON.stringify(jsonLine.type) + " ;")
    
    if(jsonLine.aliases!=null)
        if(jsonLine.aliases.length>0)
            getAliases(jsonLine.aliases)
    
    if(jsonLine.annotation!=null)
        console.log("\t\t :about " + JSON.stringify(jsonLine.annotation) + " ;")
    
    if(jsonLine.disambiguation!="")
        console.log("\t\t :disambiguation " + JSON.stringify(jsonLine.disambiguation) + " ;")
    
    if(jsonLine['life-span'].begin!=null)
        console.log("\t\t :beginDate " + JSON.stringify(jsonLine['life-span'].begin) + " ;")
    
    if(jsonLine['life-span'].end!=null)
        console.log("\t\t :endDate " + JSON.stringify(jsonLine['life-span'].end) + " ;")
    
    var urls = getRelations(jsonLine.relations)
    
    if(jsonLine.gender!=null)
        console.log("\t\t :gender \"" + jsonLine.gender + "\" ;")
    
    if(jsonLine['sort-name']!=null)
        console.log("\t\t :sortName " + JSON.stringify(jsonLine['sort-name']) + " ;")
    
    if(jsonLine.area!=null){
        var idArea = await getId("area",jsonLine.area.id)
        console.log("\t\t :from :area_" + idArea + " ;")
    }
    
    console.log("\t\t :name " + JSON.stringify(jsonLine.name) + " .\n")

    getUrls(urls)
}

async function main(){
    while (line = liner.next()) {
        var jsonLine = JSON.parse(line)

        var id = await getId("artist",jsonLine.id)
        console.log(":artist_" + id + " a owl:NamedIndividual, :Artist ;")
        await procElem(jsonLine)
    }
}

main()
