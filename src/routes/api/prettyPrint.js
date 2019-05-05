module.exports.prettyPrint = function(data){
    var vars = data.head.vars
    var data = data.results.bindings
    var out = []

    data.forEach(e => {
        var outE = {}
        vars.forEach( v => {
            outE[v] = e[v].value
        })
        out.push(outE)
    })

    return out
}
