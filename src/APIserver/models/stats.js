var mongoose = require("mongoose")
var Schema = mongoose.Schema

var StatsSchema = new Schema(
    {
        id: {type: String, required: true, index: {unique: true}},
        views: {type: Number},
        avgRating: {type: Number},
        nRating: {type: Number}
    }
)

module.exports = mongoose.model("Stat",StatsSchema,"stat")
