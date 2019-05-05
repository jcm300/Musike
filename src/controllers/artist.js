var axios = require("axios")
const Artist = module.exports
var execQuery = require("./execQuery.js").execQuery

Artist.listArtists = async () => {
    const query = `
    select * where {
        ?s a :Artist ;
            :name ?name ;
            :type ?type .
    }
    order by DESC(?name) DESC(?type)` 
    
    return await execQuery(query)
}

Artist.getArtist = async (id) => {
    const query = `
    select * where {
        :${id} :name ?name ;
            :sortName ?sortName ;
            :type ?type ;
            :alias ?aliases ;
            :beginDate ?beginDate ;
            :endDate ?endDate ;
            :gender ?gender ;
            :from ?areaId ;
            :about ?about ;
            :disambiguation ?disambiguation .
        ?areaId :name ?nameArea .
    }` 
    
    return await execQuery(query)
}

Artist.GetURLs = async (id) => {
    const query = `
    select ?labels ?values where {
        :${id} :hasURL ?urls .
        ?urls :label ?labels ;
            :value ?values .
    }
    order by DESC(?labels)` 
    
    return await execQuery(query)
}

Artist.GetRecordings = async (id) => {
    const query = `
    select * where {
        ?recordings a :Recording ;
            :artistCredit :${id} ;
            :title ?titles .
    }
    order by DESC(?titles)` 
    
    return await execQuery(query)
}

Artist.GetTags = async (id) => {
    const query = `
    select ?tags where {
        ?recordings a :Recording ;
            :artistCredit :${id} ;
            :tag ?tags .
    }
    order by DESC(?titles)` 
    
    return await execQuery(query)
}

Artist.GetAlbums = async (id) => {
    const query = `
    select ?albums ?titles where {
        ?recordings a :Recording ;
            :artistCredit :${id} .
        ?albums :hasTrack ?recordings ;
            :title ?titles .
    }
    order by DESC(?titles)` 
    
    return await execQuery(query)
}
