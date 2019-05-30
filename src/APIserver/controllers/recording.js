var axios = require("axios")
const Recording = module.exports
var execQuery = require("./execQuery.js").execQuery

Recording.listRecordings = async (offset) => {
    const query = `
    select * where {
        ?id a :Recording ;
            :title ?title .
    }
    order by ASC(?title)
    offset ${offset}
    limit 50` 
    
    return await execQuery(query)
}

Recording.listRecordingsByFilter = async (offset,filter) => {
    filter = filter.replace(/\\'/g,"'")
    filter = filter.replace(/'/g,"\\'")
    const query = `
    select * where {
        ?id a :Recording ;
            :title ?title .
        FILTER strstarts(?title,'${filter}')
    }
    order by ASC(?title)
    offset ${offset}
    limit 50` 
    
    return await execQuery(query)
}

Recording.getRecording = async (id) => {
    const query = `
    select * where {
        :${id} :title ?title .
        OPTIONAL{ :${id} :duration ?duration . }
        OPTIONAL{ :${id} :about ?about . }
        OPTIONAL{ :${id} :disambiguation ?disambiguation . }
    }` 
    
    return await execQuery(query)
}

Recording.getLanguages = async (id) => {
    const query = `
    select * where {
        :${id} :language ?language .
    }
    order by ASC(?language)`
    
    return await execQuery(query)
}

Recording.getTags = async (id) => {
    const query = `
    select * where {
        :${id} :tag ?tag .
    }
    order by ASC(?tag)`
    
    return await execQuery(query)
}

Recording.getURLs = async (id) => {
    const query = `
    select ?label ?value where {
        :${id} :hasURL ?url .
        ?url :label ?label ;
            :value ?value .
    }
    order by ASC(?label)` 
    
    return await execQuery(query)
}

Recording.getArtistsCredit = async (id) => {
    const query = `
    select * where {
        :${id} :artistCredit ?id .
        ?id :name ?name .
    }
    order by ASC(?name)`
    
    return await execQuery(query)
}

Recording.getAlbums = async (id) => {
    const query = `
    select distinct * where {
        ?id :hasTrack :${id} ;
            :title ?title .
    }
    order by ASC(?title)`
    
    return await execQuery(query)
}

Recording.searchForRecordings = async (name, title) => {
    name = name.replace(/\\'/g,"'")
    name = name.replace(/'/g,"\\'")
    title = title.replace(/\\'/g,"'")
    title = title.replace(/'/g,"\\'")
    const query = `
    select distinct ?id ?name (SAMPLE(?title) as ?title) where {
        ?idA a :Artist ;
            :name ?name .
        FILTER strstarts(?name,'${name}')
        ?id :artistCredit ?idA ;
            :title ?title .
        FILTER strstarts(?title,'${title}')
    }
    group by ?id ?name
    order by ASC(?name) ASC(?title)`
    
    return await execQuery(query)
}
