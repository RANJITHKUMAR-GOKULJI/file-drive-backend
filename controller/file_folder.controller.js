const express = require('express');
const fileModel = require('../model/file.model');
const folderModel = require('../model/folder.model');

function File_Folder(){

}

File_Folder.prototype.fileUpload=(req, res)=>{
    console.log(req.file);
    const fileName = req.file.filename;
    const folderName = req.file.destination;
    const fileType = req.file.mimetype;
    console.log({folderName});

    fileModel({fileName,folderName,fileType}).save().then(doc=>{
        res.json({doc});
        console.log('uploaded');
    }).catch(err=>{
        res.json({err});
    })
}

File_Folder.prototype.fileRetrieve=(req, res)=>{
    const fileType = req.query.fileType;
    const folderName = req.query.folderName;
    console.log(folderName)
    fileModel.aggregate([{
        $match:{
            fileType:{
                $regex : new RegExp(fileType, 'i')
            },
            folderName: {
                $regex : new RegExp('./files/'+folderName, 'i')
            }
        }
    }
    ,{
        $project:{
            fileName: 1,
            folderName: 1,
            _id:0
        }        
    }]).then(items=>{
        //res.json({items: items.map(item=> item.fileName)});
        res.json(
            {items: items.map(item=> item.fileName),
            folderName: folderName}
        );
        console.log(
            {items: items.map(item=> item.fileName)},
            {folderName: folderName}
        );        
    }).catch(err=>{
        console.log({err});
    });
    
}

File_Folder.prototype.createFolder=(req,res)=>{
    console.log(req.body);
    const {folderName,creater} = req.body;
    folderModel({folderName,creater}).save().then(doc=>{
        res.json({doc});
        console.log({doc})
    }).catch(err=>{
        res.json({err});
        console.log({err})
    })
}

File_Folder.prototype.folderRetrieve=(req, res)=>{
    const creater = req.query.creater;
    console.log(creater+'retrieve')
    folderModel.aggregate([{
        $match:{
            creater:{
                $regex : new RegExp(creater, 'i')
            }
        }
    }
    ,{
        $project:{
            folderName:1,
            _id:0
        }        
    }]).then(items=>{
        res.json({items: items.map(item=> item.folderName)});
        console.log({items});
    }).catch(err=>{
        console.log({err});
    });
    
}


File_Folder.prototype.folderDelete=(req, res)=>{
    const {creater, delFolderName} = req.query;
    console.log('create'+creater)
    console.log('delfoldername'+delFolderName)
    folderModel.findOneAndDelete({folderName:delFolderName, creater:creater}).then(doc=>{        
        
        folderModel.aggregate([{
            $match:{
                creater:{
                    $regex : new RegExp(creater, 'i')
                }
            }
        }
        ,{
            $project:{
                folderName:1,
                _id:0
            }        
        }]).then(items=>{
            res.json({items: items.map(item=> item.folderName)});
            console.log({items});
        }).catch(err=>{
            console.log({err});
        });

    }).catch(err=>{
        console.log({err});
    });
    
}

module.exports = File_Folder;