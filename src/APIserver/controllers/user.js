var User = require("../models/user")
var bcrypt = require("bcrypt")
var mongoose = require("mongoose")
const saltRounds = 12

const Users = module.exports

/*
Users.list = () => {
    return User
        .find()
        .sort({name: -1})
        .exec()
}*/

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

Users.updateUser = async (id, user) => {
    var userF = await Users.findOne(user.email)
    if(userF!=null){
        if(userF.id == id){
            return User
                .findOneAndUpdate({_id: id}, {$set: {name: user.name, email: user.email}}, {useFindAndModify: false})
                .exec()
        }else return null
    }else{
        return null
    }
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

//favs

Users.getFavs = async (id) => {
    var user = await User.findOne({_id: id})
    return user.favs
}

Users.addFav = async (id, idRec) => {
    if(await Users.isFav(id,idRec) == false){
        return User
            .findOneAndUpdate({_id: id},{ $push: {favs: idRec}}, {useFindAndModify: false})
    }else{
        return null
    }
}

Users.removeFav = async (id, idRec) => {
    return User
        .findOneAndUpdate({_id: id},{ $pull: {favs: idRec}}, {useFindAndModify: false})
}

Users.isFav = async (id, idRec) => {
    var user = await User.findOne({_id: id})
    isFav = false

    for(var i=0; i < user.favs.length && !isFav; i++){
        if(idRec == user.favs[i]) isFav = true
    }

    return isFav
}

//stats

//get all stats of user
Users.getRecordingsUser = async id => {
    var user = await User.findOne({_id: id})
    return user.stats
}

//get 10 recordings with Most views of a user
Users.getMostRecordingsViewsUser = async id => {
    var user = await User.findOne({_id: id})
    var values = user.stats.map(s => {
        if(s.views > 0) 
            return {id: s.id, views: s.views} 
        else 
            return null
    })
    values = values.filter(e => e!=null)
    var sorted = values.sort((a, b) => {return b.views - a.views})
    return sorted.slice(0,10)
}

//get 10 recordings with Most rating of a user
Users.getMostRecordingsRatingUser = async id => {
    var user = await User.findOne({_id: id})
    var values = user.stats.map(s => {
        if(s.rating > 0) 
            return {id: s.id, rating: s.rating} 
        else 
            return null
    })
    values = values.filter(e => e!=null)
    var sorted = values.sort((a, b) => {return b.rating - a.rating})
    return sorted.slice(0,10)
}

//get user rating for a recording
Users.getRecordingUserRating = async (id, idRec) => {
    var user = await User.findOne({_id: id})
    var founded = false
    var value = 0

    for(var i=0; i < user.stats.length && !founded; i++){
        if(user.stats[i].id == idRec){
            value = user.stats[i].rating
            founded = true
        }
    }

    return value
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

/*
Users.deleteStat = idMusic => {
    return User
        .updateMany({},{ $pull: {stats: { id: idMusic}}},{useFindAndModify: false})
}*/
