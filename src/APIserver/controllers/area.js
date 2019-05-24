var axios = require("axios")
const Area = module.exports
var execQuery = require("./execQuery.js").execQuery

Area.listAreas = async (offset) => {
    const query = `
    select * where {
        ?id a :Area ;
            :name ?name ;
            :type ?type .
    }
    order by ASC(?name) ASC(?type)
    offset ${offset}
    limit 50`
    
    return await execQuery(query)
}

Area.listAreasByFilter = async (offset,filter) => {
    filter = filter.replace(/\\'/g,"'")
    filter = filter.replace(/'/g,"\\'")
    const query = `
    select * where {
        ?id a :Area ;
            :name ?name ;
            :type ?type .
        FILTER regex(?name,'^${filter}.*')
    }
    order by ASC(?name) ASC(?type)
    offset ${offset}
    limit 50`
    
    return await execQuery(query)
}

Area.getArea = async (id) => {
    const query = `
    select * where {
        :${id} :name ?name ;
            :type ?type .
        OPTIONAL{ :${id} :beginDate ?beginDate . }
        OPTIONAL{ :${id} :endDate ?endDate . }
        OPTIONAL{ :${id} :about ?about . }
        OPTIONAL{ :${id} :disambiguation ?disambiguation . }
    }` 
    
    return await execQuery(query)
}

Area.getAliases = async (id) => {
    const query = `
    select * where {
        :${id} :alias ?alias .
    }`
    
    return await execQuery(query)
}

Area.getPartOf = async (id) => {
    const query = `
    select * where {
        :${id} :partOf ?id .
        ?id :name ?name .
    }
    order by ASC(?name)` 
    
    return await execQuery(query)
}

Area.getParts = async (id) => {
    const query = `
    select * where {
        :${id} :hasPart ?id .
        ?id :name ?name .
    }
    order by ASC(?name)` 
    
    return await execQuery(query)
}

Area.getURLs = async (id) => {
    const query = `
    select ?label ?value where {
        :${id} :hasURL ?url .
        ?url :label ?label ;
            :value ?value .
    }
    order by ASC(?label)` 
    
    return await execQuery(query)
}

Area.getArtists = async (id) => {
    const query = `
    select distinct ?id ?name where {
        ?id a :Artist;
            :from :${id};
            :name ?name .
    }
    order by ASC(?name)`

    return await execQuery(query)
}
