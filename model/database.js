const mongoose = require("mongoose");
const { stringify } = require("uuid");


const userModel = mongoose.Schema({

    // we can pass any value here this is a type of schema 
    // where we can save the data coming from website directly into our database
    title:String,
    author:String,
    image:String,
    date:{
        type:Date,
        default:Date.now
    }
})

const galleryDetail = mongoose.model('galleryDetail',userModel);

module.exports = galleryDetail;