var graphDB = "http://localhost:7200/repositories/musicbrainz?query="
var prefix = "PREFIX : <https://musicbrainz.org#>"

module.exports.execQuery = async function(query){
    try{
        var encoded = encodeURIComponent(prefix + query)
        response = await axios.get(graphDB + encoded)
        return response.data
    }catch(error){
        return "ERROR: " + error
    }
}
