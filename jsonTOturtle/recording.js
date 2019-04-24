var readline = require("readline")
var fs = require("fs")
var crypto = require("crypto");

var types = {
    "forward": {
        "member of band":"member of",
        "subgroup":"subgroup of",
        "conductor position":"conductor for",
        "founder":"founded",
        "supporting musician":"supporting artist for",
        "vocal supporting musician":"vocal support for",
        "instrumental supporting musician":"instrument support for",
        "tribute":"tribute to",
        "voice actor":"voice of",
        "collaboration":"collaborator on",
        "is person":"performs as",
        "teacher":"has student",
        "parent":"has children",
        "sibling":"has sibling",
        "married":"married with",
        "involved with":"involved with",
        "named after":"named after",
        "performer":"performed",
        "instrument":"instrument performer for",
        "vocal":"vocal performer for",
        "performing orchestra":"performing orchestra for",
        "conductor":"conducted",
        "chorus master":"chorus master for",
        "concertmaster":"concertmaster for",
        "arranger":"arranged",
        "instrument arranger":"instrument arranged",
        "orchestrator":"orchestrated",
        "vocal arranger":"vocal arranged",
        "compiler":"compiled",
        "mix-DJ":"DJ-mixed",
        "remixer":"remixed",
        "producer":"produced",
        "mix":"mixed",
        "editor":"edited",
        "karaoke":"has karaoke version",
        "edit":"edit of",
        "music video":"has music video",
        "first track release":"has later release",
        "remaster":"remaster of",
        "compilation":"compilation of",
        "DJ-mix":"DJ-mix of",
        "remix":"remix of",
        "mashes up":"mash-up of",
        "dedicated to":"has dedication",
        "live performance":"live performance of",
        "cover":"cover of",
        "single from":"single taken from",
        "included in":"included in"
    },
    "backward": {
        "member of band":"has member",
        "subgroup":"has subgroup",
        "conductor position":"conductor of",
        "founder":"founded by",
        "supporting musician":"has supporting musician",
        "vocal supporting musician":"vocal support by",
        "instrumental supporting musician":"instrument support by",
        "tribute":"has tribute",
        "voice actor":"voiced by",
        "collaboration":"has collaborator",
        "is person":"has legal name",
        "teacher":"has teacher",
        "parent":"has parent",
        "sibling":"has sibling",
        "married":"married with",
        "involved with":"involved with",
        "named after":"inspired the name of",
        "performer":"has performer",
        "instrument":"has instrument performer",
        "vocal":"has vocal performer",
        "performing orchestra":"has performing orchestra",
        "conductor":"has conductor",
        "chorus master":"has chorus master",
        "concertmaster":"has concertmaster",
        "arranger":"has arranger",
        "instrument arranger":"has instrument arranger",
        "orchestrator":"has orchestrator",
        "vocal arranger":"has vocal arranger",
        "compiler":"has compiler",
        "mix-DJ":"has DJ-mixer",
        "remixer":"has remixer",
        "producer":"has producer",
        "mix":"has mixer",
        "editor":"has editor",
        "karaoke":"karaoke version of",
        "edit":"has edit",
        "music video":"music video for",
        "first track release":"has earliest release",
        "remaster":"has remaster",
        "compilation":"compiled in",
        "DJ-mix":"has DJ-mix",
        "remix":"has remix",
        "mashes up":"has mash-up",
        "dedicated to":"dedicated to",
        "live performance":"has live performance",
        "cover":"has cover",
        "single from":"has single in",
        "included in":"include"
    }
}

function getRelations(rels){
    rels.forEach(r => {
        if(r.url!=null){
            urls.push({id: ":url_" + r.url.id, name: r.type, value: r.url.resource})
        }else if(r.artist!=null){
            relations.push({range: "artist_" + r.artist.id, type: types[r.direction][r.type]})
        }else if(r.recording!=null){
            relations.push({range: "recording_" + r.recording.id, type: types[r.direction][r.type]})
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

function printMoreRelations(rels, id){
    rels.forEach(r => {
        if(r.type!=undefined){
            var relationId = crypto.randomBytes(20).toString("hex");
            console.log(":relation_" + relationId + " a owl:NamedIndividual, :Relation ;")
            console.log("\t\t :domain :" + id + " ;")
            console.log("\t\t :range :" + r.range + " ;")
            console.log("\t\t :relationType \"" + r.type + "\" .\n")
        }
    })
}

var langs = new Set()
var relations = []
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

    printMoreRelations(relations, "recording_" + jsonLine.id)
    relations = []
})
