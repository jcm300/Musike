var User = require("../models/user")
var bcrypt = require("bcrypt")
var mongoose = require("mongoose")
const saltRounds = 12

const Users = module.exports

Users.list = () => {
    return User
        .find()
        .sort({name: -1})
        .exec()
}

Users.findOne = emailI => {
    return User
        .findOne({email: emailI})
}

Users.getUser = id => {
    return User
        .findOne({_id: id})
        .exec()
}

Users.isValidPassword = (password, passwordStored) => {
    return bcrypt.compare(password, passwordStored)
}

Users.createUser = user => {
    user.password = bcrypt.hashSync(user.password,saltRounds)
    return User.create(user)
}

Users.updateUser = (id, user) => {
    return User
        .findOneAndUpdate({_id: id}, {$set: {name: user.name, email: user.email}}, {useFindAndModify: false})
        .exec()
}

Users.updatePassword = async (id, prevPass, newPass) => {
    var user = await User.findOne({_id: id})
    if(bcrypt.compareSync(prevPass,user.password)){
        newPass = bcrypt.hashSync(newPass,saltRounds) 
        return User
            .findOneAndUpdate({_id: id}, {$set: {password: newPass}}, {useFindAndModify: false})
            .exec()
    }else return null
}

Users.deleteUser = async id => {
    return User
        .findOneAndDelete({_id: id})
        .exec()
}

//stats

//get all stats of user
Users.getRecordingsUser = async id => {
    var user = await User.findOne({_id: id})
    return user.stats
}

//get 10 recordings with more views of a user
Users.getMoreRecordingsViewsUser = async id => {
    var user = await User.findOne({_id: id})
    var values = user.stats.map(s => {return {id: s.id, views: s.views}})
    var sorted = values.sort((a, b) => {return b.views - a.views})
    return sorted.slice(0,10)
}

Users.updateViews = async (id, idMusic) => {
    var user = await User.findOne({_id: new mongoose.Types.ObjectId(id), stats: { $elemMatch: { id: idMusic} }})
    if(user){
        return User
            .findOneAndUpdate({ _id: id, stats: { $elemMatch: { id: idMusic} } },{ $inc: {"stats.$.views": 1} }, {useFindAndModify: false} )
    }else{
        return User
            .findOneAndUpdate({ _id: id },{ $push: {stats: {id: idMusic, views: 1, rating: 0}} }, {useFindAndModify: false} )
    }
}

Users.updateRating = async (id, idMusic, rating) => {
    var user = await User.findOne({_id: new mongoose.Types.ObjectId(id), stats: { $elemMatch: { id: idMusic} }})
    if(user){
        return User
            .findOneAndUpdate({ _id: id, stats: { $elemMatch: { id: idMusic} } },{ $set: {"stats.$.rating": rating } }, {useFindAndModify: false} )
    }else{
        return User
            .findOneAndUpdate({ _id: id },{ $push: {stats: {id: idMusic, views: 0, rating: rating}} }, {useFindAndModify: false} )
    }
}

Users.deleteStat = idMusic => {
    return User
        .updateMany({},{ $pull: {stats: { id: idMusic}}},{useFindAndModify: false})
}
