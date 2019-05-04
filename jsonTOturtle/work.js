var readlineSync = require("n-readlines")
var liner = new readlineSync(process.argv[2])
var getId = require("./auxFunctions.js").getId
var asyncForEach = require("./auxFunctions.js").asyncForEach

async function main(){
    while (line = liner.next()) {
        var jsonLine = JSON.parse(line)
        
        if(jsonLine.relations.length>0){
            await asyncForEach(jsonLine.relations, async (r) => {
                if(r.recording!=null){
                    if(r.type=="performance"){
                        var langs = new Set()
                        if(jsonLine.language!=null){
                            langs.add("\"" + jsonLine.language + "\"")
                        }
                        if(jsonLine.languages!=null && jsonLine.languages.length>0){
                            jsonLine.languages.forEach(l => langs.add("\"" + l + "\""))
                        }
                        if(langs.size>0){
                            var id = await getId("recording",r.recording.id)
                            console.log(":recording_" + id + " :language " + Array.from(langs).join(", ") + " .")
                        }
                    }
                }
            })
        }   
    }
}

main()
