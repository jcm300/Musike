var axios = require("axios")

exports.getId = async (entity,mbid) => {
    var id
    try{
        //var response = await axios.get("https://musicbrainz.org/ws/2/" + entity + "/" + mbid)
        var response = await axios.get("http://localhost:5000/ws/2/" + entity + "/" + mbid)
        id = response.data.id
    }catch(e){
        console.error(entity + ": " + mbid + " -> " + e)
        id = mbid
    }
    return id
}

exports.asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
