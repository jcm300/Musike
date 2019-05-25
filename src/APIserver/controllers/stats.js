var Stat = require("../models/stats")
var User = require("../models/user")
var mongoose = require("mongoose")

const Stats = module.exports

Stats.createOrUpdate = async (stat) => {
    var statM = await Stat.findOne({_id: stat.id})
    if(statM != null){
        var newAvgRating = (statM.avgRating * statM.nRating + stat.rating) / (statM.nRating + 1)
        return Stat
            .findOneAndUpdate({_id: stat.id}, {$set: {views: statM.views + stat.views, avgRating: newAvgRating, nRating: statM.nRating + 1}}, {useFindAndModify: false})
            .exec()
    }else{
        var newStat = {_id: stat.id, views: stat.views, avgRating: stat.rating, nRating: 1}
        return Stat.create(newStat)
    }
}

//get all stats
Stats.getStats = async () => {
    var rawValues = await User.find()
    rawValues = rawValues.map(u => {return u.stats})
    var values = []
    rawValues.forEach(l => {
        l.forEach(s => {
            var index = values.findIndex(elem => elem.id == s.id)
            if(index != -1){
                values[index].views += s.views
                if(s.rating>0){
                    values[index].nRating++
                    values[index].avgRating = (values[index].avgRating * values[index].nRating + s.rating) / values[index].nRating
                }
            }else{
                if(s.rating==0){
                    values.push({id: s.id, views: s.views, avgRating: s.rating, nRating: 0})
                }else{
                    values.push({id: s.id, views: s.views, avgRating: s.rating, nRating: 1})
                }
            }
        })
    })

    rawValues = await Stat.find()
    rawValues.forEach(s => {
        var index = values.findIndex(elem => elem.id == s._id)
        if(index != -1){
            values[index].views += s.views
            if(s.nRating>0){
                values[index].nRating+=s.nRating
                values[index].avgRating = (values[index].avgRating * values[index].nRating + s.avgRating * s.nRating) / values[index].nRating
            }
        }else{
            if(s.nRating==0){
                values.push({id: s._id, views: s.views, avgRating: s.avgRating, nRating: 0})
            }else{
                values.push({id: s._id, views: s.views, avgRating: s.avgRating, nRating: s.nRating})
            }
        }
    })
    return values
}

//get 10 more recordings views
Stats.getMoreRecordingsViews = async () => {
    var rawValues = await User.find()
    rawValues = rawValues.map(u => {return u.stats})
    var values = []
    rawValues.forEach(l => {
        l.forEach(s => {
            var index = values.findIndex(elem => elem.id == s.id)
            if(index != -1){
                values[index].views += s.views
            }else{
                values.push({id: s.id, views: s.views})
            }
        })
    })

    rawValues = await Stat.find()
    rawValues.forEach(s => {
        var index = values.findIndex(elem => elem.id == s._id)
        if(index != -1){
            values[index].views += s.views
        }else{
            values.push({id: s._id, views: s.views})
        }
    })
    var sorted = values.sort((a, b) => {return b.views - a.views})
    return sorted.slice(0,10)
}

//get stats of recording
Stats.getRecordingStats = async (id) => {
    var rawValues = await User.find()
    rawValues = rawValues.map(u => {return u.stats})
    var values = {views: 0, avgRating: 0, nRating: 0}
    rawValues.forEach(l => {
        var index = l.findIndex(elem => elem.id == id)
        if(index != -1){
            values.views += l[index].views
            if(l[index].rating>0){
                values.nRating++
                values.avgRating = (values.avgRating * values.nRating + l[index].rating) / values.nRating
            }
        }
    })

    rawValues = await Stat.find()
    var index = rawValues.findIndex(elem => elem._id == id)
    if(index != -1){
        values.views += rawValues[index].views
        if(rawValues[index].nRating>0){
            values.nRating+=rawValues[index].nRating
            values.avgRating = (values.avgRating * values.nRating + rawValues[index].avgRating * rawValues[index].nRating) / values.nRating
        }
    }
    return values
}
