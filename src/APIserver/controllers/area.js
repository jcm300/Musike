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
    #order by ASC(?name) ASC(?type)
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
        FILTER strstarts(?name,'${filter}')
    }
    #order by ASC(?name) ASC(?type)
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
        ?id :name ?name ;
            :type ?type .
    }
    order by ASC(?name)` 
    
    return await execQuery(query)
}

Area.getParts = async (id) => {
    const query = `
    select * where {
        :${id} :hasPart ?id .
        ?id :name ?name ;
            :type ?type .
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

Area.countriesWithMostArtists = async () => {
    const query = `
    select ?area ?name ?artists where {
        {
        select ?area (sum(?artistsAux) as ?artists) where {
            {
                select (if(bound(?areaId6), ?areaId6, 
                        if(bound(?areaId5), ?areaId5,
                        if(bound(?areaId4), ?areaId4,
                        if(bound(?areaId3), ?areaId3,
                        if(bound(?areaId2), ?areaId2, ?areaId))))) as ?area) ?artistsAux where {
                    {
                        select distinct ?areaId (count(?idA) as ?artistsAux) where {
                            ?idA a :Artist ;
                                :from ?areaId .
                        }
                        group by(?areaId)
                    }
                    OPTIONAL { ?areaId :partOf ?areaId2 .
                        OPTIONAL { ?areaId2 :partOf ?areaId3 .
                            OPTIONAL{ ?areaId3 :partOf ?areaId4 .
                                OPTIONAL{ ?areaId4 :partOf ?areaId5 .
                                    OPTIONAL{?areaId5 :partOf ?areaId6 .}}}}}}
            }
            #?area :type "Country" .
        }
        group by (?area)
        }
        ?area :name ?name .
    }
    order by DESC(?artists)`

    return await execQuery(query)
}

Area.countriesWithMostRecordings = async () => {
    const query = `
    select ?area ?name ?recordings where {
        {
        select ?area (sum(?recsAux) as ?recordings) where {
            {
                select (if(bound(?areaId6), ?areaId6, 
                        if(bound(?areaId5), ?areaId5,
                        if(bound(?areaId4), ?areaId4,
                        if(bound(?areaId3), ?areaId3,
                        if(bound(?areaId2), ?areaId2, ?areaId))))) as ?area) ?recsAux where {
                    {
                        select distinct ?areaId (count(?idR) as ?recsAux) where {
                            ?idA a :Artist ;
                                :from ?areaId .
                            ?idR :artistCredit ?idA .
                        }
                        group by(?areaId)
                    }
                    OPTIONAL { ?areaId :partOf ?areaId2 .
                        OPTIONAL { ?areaId2 :partOf ?areaId3 .
                            OPTIONAL{ ?areaId3 :partOf ?areaId4 .
                                OPTIONAL{ ?areaId4 :partOf ?areaId5 .
                                    OPTIONAL{?areaId5 :partOf ?areaId6 .}}}}}}
            }
            #?area :type "Country" .
        }
        group by (?area)
        }
        ?area :name ?name .
    }
    order by DESC(?recordings)`

    return await execQuery(query)
}

Area.countriesWithMostAlbums = async () => {
    const query = `
    select ?area ?name ?albums where {
        {
        select ?area (sum(?albumsAux) as ?albums) where {
            {
                select (if(bound(?areaId6), ?areaId6, 
                        if(bound(?areaId5), ?areaId5,
                        if(bound(?areaId4), ?areaId4,
                        if(bound(?areaId3), ?areaId3,
                        if(bound(?areaId2), ?areaId2, ?areaId))))) as ?area) ?albumsAux where {
                    {
                        select distinct ?areaId (count(?idAl) as ?albumsAux) where {
                            ?idA a :Artist ;
                                :from ?areaId .
                            ?idR :artistCredit ?idA .
                            ?idAl :hasTrack ?idR .
                        }
                        group by(?areaId)
                    }
                    OPTIONAL { ?areaId :partOf ?areaId2 .
                        OPTIONAL { ?areaId2 :partOf ?areaId3 .
                            OPTIONAL{ ?areaId3 :partOf ?areaId4 .
                                OPTIONAL{ ?areaId4 :partOf ?areaId5 .
                                    OPTIONAL{?areaId5 :partOf ?areaId6 .}}}}}}
            }
            #?area :type "Country" .
        }
        group by (?area)
        }
    ?area :name ?name .
    }
    order by DESC(?albums)`

    return await execQuery(query)
}
