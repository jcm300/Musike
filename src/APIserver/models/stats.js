var mongoose = require("mongoose")
var Schema = mongoose.Schema

var StatsSchema = new Schema(
    {
        views: {type: Number},
        avgRating: {type: Number},
        nRating: {type: Number}
    }
)

module.exports = mongoose.model("Stat",StatsSchema,"stat")
