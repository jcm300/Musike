var axios = require("axios")
const Area = module.exports
var execQuery = require("./execQuery.js").execQuery

Area.listAreas = async () => {
    const query = `
    select * where {
        ?s a :Area ;
            :name ?name ;
            :type ?type .
    }
    order by DESC(?name) DESC(?type)` 
    
    return await execQuery(query)
}

Area.getArea = async (id) => {
    const query = `
    select * where {
        :${id} :name ?name ;
            :type ?type ;
            :alias ?aliases ;
            :beginDate ?beginDate ;
            :endDate ?endDate ;
            :about ?about ;
            :disambiguation ?disambiguation .
    }` 
    
    return await execQuery(query)
}

Area.getPartOf = async (id) => {
    const query = `
    select * where {
        :${id} :partOf ?area .
        ?area :name ?name .
    }` 
    
    return await execQuery(query)
}

Area.GetParts = async (id) => {
    const query = `
    select * where {
        :${id} :hasPart ?areas .
        ?areas :name ?names .
    }` 
    
    return await execQuery(query)
}

Area.GetURLs = async (id) => {
    const query = `
    select ?labels ?values where {
        :${id} :hasURL ?urls .
        ?urls :label ?labels ;
            :value ?values .
    }
    order by DESC(?labels)` 
    
    return await execQuery(query)
}
