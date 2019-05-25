var mongoose = require("mongoose")
var Schema = mongoose.Schema

var musicStatisticsSchema = new Schema(
    {
        id: {type: String, required: true},
        views: {type: Number},
        rating: {type: Number}
    }, { _id: false }
)

var UserSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, index: {unique: true}},
        password: {type: String, required: true},
        stats: {type: [musicStatisticsSchema]}
    }
)

module.exports = mongoose.model("User",UserSchema,"users")
