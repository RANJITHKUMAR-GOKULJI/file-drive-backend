const multer = require('multer');
const fileModel = require('../model/file.model');
const fs = require('fs');

var storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        const folder = (req.body.folder)
        const dir = './files/'+folder;
        console.log(dir)
        try{
            if(!fs.existsSync(dir)){
                fs.mkdirSync(dir)
            }
                cb(null, dir);
        }
        catch(err){
            console.log(err)
        }        
    },
    filename:(req, file, cb)=>{
        console.log('creat file name')
        var originalname = file.originalname;
        var filePath = './files/'+req.body.folder;
        console.log('create file name'+filePath)

        fs.readdir(filePath,(err, files) => {
            console.log('length'+files);            
            if(!files){
                var fileName = file.originalname.toLowerCase().split(' ').join('-');                        
                cb(null,  fileName)
            }
            else{
                const fileCount = (files.length)++;
                originalname =  originalname;
                            
                var fileName = originalname.toLowerCase().split(' ').join('_');                        
                console.log(originalname);
                cb(null,  fileName)
            }
        });        
    }
});

var multerFile = multer({
    storage:storage
});

module.exports = multerFile;