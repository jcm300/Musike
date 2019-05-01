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
        .findOneAndUpdate({_id: id}, {$set: {name: user.name, email: user.email, type: user.type}}, {useFindAndModify: false})
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

Users.deleteUser = id => {
    return User
        .findOneAndDelete({_id: id})
        .exec()
}
