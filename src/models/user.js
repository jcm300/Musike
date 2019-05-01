var mongoose = require("mongoose")
var Schema = mongoose.Schema

var StatisticsSchema = new Schema(
    {
        views: {type: Number}
    }
)

var UserSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, index: {unique: true}},
        password: {type: String, required: true},
        stats: {type: [StatisticsSchema]}
    }
)

module.exports = mongoose.model("User",UserSchema,"users")
