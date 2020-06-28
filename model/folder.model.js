const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    folderName:{
        type:String,
        required: true
    },
    creater:{
        type: String,
        required: true
    }
})

const folderModel = mongoose.model('folders',folderSchema);
module.exports= folderModel;