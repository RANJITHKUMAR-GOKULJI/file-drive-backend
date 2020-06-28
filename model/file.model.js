const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fileName:{
        type:String,
        required:true,
    },
    folderName:{
        type:String,
        required:true,
    },
    fileType:{
        type:String,
        required:true,
    },
})


const fileModel = mongoose.model('files',fileSchema);
module.exports= fileModel;