var readline = require("readline")
var fs = require("fs")

var lineReader = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

lineReader.on('line', function (line) {
    var jsonLine = JSON.parse(line)
    
    if(jsonLine.relations.length>0){
        jsonLine.relations.forEach(r => {
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
                        console.log(":recording_" + r.recording.id + " :language " + Array.from(langs).join(", ") + " .")
                    }
                }
            }
        })
    }
})

//lineReader.on("close", () => {
//})
