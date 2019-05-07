var axios = require("axios")
var graphDB = "http://localhost:7200/repositories/musicbrainz?query="
var prefix = `PREFIX : <https://musicbrainz.org#>`

module.exports.execQuery = async function(query){
    try{
        var encoded = encodeURIComponent(prefix + query)
        response = await axios.get(graphDB + encoded)
        return prettyPrint(response.data)
    }catch(error){
        return "ERROR: " + error
    }
}

function prettyPrint(data){
    var vars = data.head.vars
    var data = data.results.bindings
    var out = []
    
    data.forEach(e => {
        var outE = {}
        vars.forEach( v => {
            if(e[v])
                outE[v] = e[v].value
        })
        out.push(outE)
    })

    return out
}
