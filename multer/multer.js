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
        console.log('creat file name'+file)
        var originalname = file.originalname;
        var filePath = './files/'+req.body.folder;
        console.log('create file name'+filePath)

        
        fs.readdir(filePath,(err, files) => {
            console.log('length'+files);
            var fileName = file.originalname.toLowerCase().split(' ').join('-');                                       
            const newRegex = new RegExp(fileName.split('.')[0]+'\\([0-9]+\\).'+fileName.split('.')[1]+'|'+fileName);
            console.log(newRegex);
            const fileCount = files.filter(file=> newRegex.test(file))
            console.log(fileCount.length);

            if(fileCount.length == 0){
                cb(null,  fileName)
            }
            else{                
                //var newFileCount = (fileCount.length);
                var fileName = fileName.split('.').join('('+fileCount.length+').');                        
                console.log(fileName);
                cb(null,  fileName)
            }
        });        
    }
});

var multerFile = multer({
    storage:storage
});

module.exports = multerFile;