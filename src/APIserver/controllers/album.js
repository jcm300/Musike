var axios = require("axios")
const Album = module.exports
var execQuery = require("./execQuery.js").execQuery

Album.listAlbums = async (offset) => {
    const query = `
    select * where {
        ?id a :Album ;
            :title ?title.
    }
    order by ASC(?title)
    offset ${offset}
    limit 50` 
    
    return await execQuery(query)
}

Album.listAlbumsByFilter = async (offset,filter) => {
    filter = filter.replace(/\\'/g,"'")
    filter = filter.replace(/'/g,"\\'")
    const query = `
    select * where {
        ?id a :Album ;
            :title ?title.
        FILTER regex(?title,'^${filter}.*')
    }
    order by ASC(?title)
    offset ${offset}
    limit 50` 
    
    return await execQuery(query)
}

Album.getAlbum = async (id) => {
    const query = `
    select * where {
        :${id} :title ?title .
        OPTIONAL{ :${id} :firstReleaseDate ?firstReleaseDate . }
        OPTIONAL{ :${id} :about ?about . }
        OPTIONAL{ :${id} :disambiguation ?disambiguation . }
    }` 
    
    return await execQuery(query)
}

Album.getURLs = async (id) => {
    const query = `
    select ?label ?value where {
        :${id} :hasURL ?url .
        ?url :label ?label ;
            :value ?value .
    }
    order by ASC(?label)` 
    
    return await execQuery(query)
}

Album.getTracks = async (id) => {
    const query = `
    select distinct ?id (SAMPLE(?title) as ?title) (SAMPLE(?duration) as ?duration) (SAMPLE(?disambiguation) as ?disambiguation) where {
        :${id} :hasTrack ?id .
	    ?id :title ?title ;
	        :duration ?duration .
        OPTIONAL {?id :disambiguation ?disambiguation .}
    }
    group by ?id
    order by ASC(?title)`
    
    return await execQuery(query)
}

Album.getTags = async (id) => {
    const query = `
    select distinct ?tag where {
        :${id} :hasTrack ?track .
        ?track :tag ?tag .
    }
    order by ASC(?tag)`
    
    return await execQuery(query)
}

Album.getArtistsCredit = async (id) => {
    const query = `
    select distinct ?id ?name where {
        :${id} :hasTrack ?track .
        ?track :artistCredit ?id .
        ?id :name ?name .
    }
    order by ASC(?name)`
    
    return await execQuery(query)
}
