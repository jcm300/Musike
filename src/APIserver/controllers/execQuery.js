var axios = require("axios")
var graphdb = ''
var prefix = `PREFIX : <https://musicbrainz.org#>`

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

module.exports.set = function (url) {
    graphdb = url
}

module.exports.execQuery = async function(query){
    var graphDB = "http://" + graphdb + "/repositories/musicbrainz?query="
    var encoded = encodeURIComponent(prefix + query)
    try{
        response = await axios.get(graphDB + encoded)
        return prettyPrint(response.data)
    }catch(error){
        return "ERROR: " + error
    }
}

