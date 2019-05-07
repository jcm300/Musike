var axios = require("axios")
const Artist = module.exports
var execQuery = require("./execQuery.js").execQuery

Artist.listArtists = async (offset) => {
    const query = `
    select * where {
        ?id a :Artist ;
            :name ?name ;
            :type ?type .
    }
    order by ASC(?name) ASC(?type)
    offset ${offset}
    limit 100` 
    
    return await execQuery(query)
}

Artist.listArtistsByFilter = async (offset,filter) => {
    filter = filter.replace(/\\'/g,"'")
    filter = filter.replace(/'/g,"\\'")
    const query = `
    select * where {
        ?id a :Artist ;
            :name ?name ;
            :type ?type .
        FILTER regex(?name,'^${filter}.*')
    }
    order by ASC(?name) ASC(?type)
    offset ${offset}
    limit 100` 
    
    return await execQuery(query)
}

Artist.getArtist = async (id) => {
    const query = `
    select * where {
        :${id} :name ?name ;
            :type ?type .
        OPTIONAL{ :${id} :sortName ?sortName . }
        OPTIONAL{ :${id} :type ?type . }
        OPTIONAL{ :${id} :beginDate ?beginDate . }
        OPTIONAL{ :${id} :endDate ?endDate . }
        OPTIONAL{ :${id} :gender ?gender . }
        OPTIONAL{ 
            :${id} :from ?areaId . 
            ?areaId :name ?nameArea .
        }
        OPTIONAL{ :${id} :about ?about . }
        OPTIONAL{ :${id} :disambiguation ?disambiguation . }
    }` 
    
    return await execQuery(query)
}

Artist.getAliases = async (id) => {
    const query = `
    select * where {
        :${id} :alias ?alias .
    }`
    
    return await execQuery(query)
}

Artist.getURLs = async (id) => {
    const query = `
    select ?label ?value where {
        :${id} :hasURL ?url .
        ?url :label ?label ;
            :value ?value .
    }
    order by ASC(?label)` 
    
    return await execQuery(query)
}

Artist.getRecordings = async (id) => {
    const query = `
    select * where {
        ?id a :Recording ;
            :artistCredit :${id} ;
            :title ?title .
    }
    order by ASC(?title)` 
    
    return await execQuery(query)
}

Artist.getTags = async (id) => {
    const query = `
    select ?tag where {
        ?recording a :Recording ;
            :artistCredit :${id} ;
            :tag ?tag .
    }
    order by ASC(?tag)` 
    
    return await execQuery(query)
}

Artist.getAlbums = async (id) => {
    const query = `
    select ?album ?title where {
        ?recording a :Recording ;
            :artistCredit :${id} .
        ?id :hasTrack ?recording ;
            :title ?title .
    }
    order by ASC(?title)` 
    
    return await execQuery(query)
}
