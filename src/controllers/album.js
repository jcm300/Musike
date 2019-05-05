var axios = require("axios")
const Album = module.exports
var execQuery = require("./execQuery.js").execQuery

Album.listAlbums = async () => {
    const query = `
    select * where {
        ?s a :Album ;
            :title ?title.
    }
    order by DESC(?title)` 
    
    return await execQuery(query)
}

Album.getAlbum = async (id) => {
    const query = `
    select * where {
        :${id} :title ?title ;
            :firstReleaseDate ?firstReleaseDate ;
            :about ?about ;
            :disambiguation ?disambiguation .
    }` 
    
    return await execQuery(query)
}

Album.GetURLs = async (id) => {
    const query = `
    select ?labels ?values where {
        :${id} :hasURL ?urls .
        ?urls :label ?labels ;
            :value ?values .
    }
    order by DESC(?labels)` 
    
    return await execQuery(query)
}

Album.GetTracks = async (id) => {
    const query = `
    select * where {
        :${id} :hasTracks ?tracks .
    }`
    
    return await execQuery(query)
}

Album.GetTags = async (id) => {
    const query = `
    select ?tags where {
        :${id} :hasTracks ?tracks .
        ?tracks :tag ?tags .
    }`
    
    return await execQuery(query)
}

Album.GetArtistsCredit = async (id) => {
    const query = `
    select ?artists ?names where {
        :${id} :hasTracks ?tracks .
        ?tracks :artistCredit ?artists ;
            :name ?names .
    }`
    
    return await execQuery(query)
}
