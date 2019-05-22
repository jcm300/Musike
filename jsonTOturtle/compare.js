var fs = require("fs")

var file = JSON.parse(fs.readFileSync(process.argv[2]))

function diff (arr1, arr2) {return arr2.filter(x => !arr1.includes(x));}
//function diff (arr1, arr2) {return arr1.filter(x => !arr2.includes(x));}

var res = diff(Array.from(file[process.argv[3] + 'Ids']),Array.from(file[process.argv[3]]))
console.log(JSON.stringify(res))
