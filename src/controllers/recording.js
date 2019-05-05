var axios = require("axios")
const Recording = module.exports
var execQuery = require("./execQuery.js").execQuery

Recording.listRecordings = async () => {
    const query = `
    select * where {
        ?s a :Recording ;
            :name ?title .
    }
    order by DESC(?title)` 
    
    return await execQuery(query)
}

Recording.getRecording = async (id) => {
    const query = `
    select * where {
        :${id} :title ?title ;
            :duration ?duration ;
            :tag ?tags ;
            :language ?languages ;
            :about ?about ;
            :disambiguation ?disambiguation .
    }` 
    
    return await execQuery(query)
}

Recording.GetURLs = async (id) => {
    const query = `
    select ?labels ?values where {
        :${id} :hasURL ?urls .
        ?urls :label ?labels ;
            :value ?values .
    }
    order by DESC(?labels)` 
    
    return await execQuery(query)
}

Recording.GetArtistsCredit = async (id) => {
    const query = `
    select * where {
        :${id} :artistCredit ?artists .
    }`
    
    return await execQuery(query)
}
