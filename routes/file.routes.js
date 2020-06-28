const express = require('express');

const fileRouter = express.Router();

const multerFile = require('../multer/multer');
var File_Folder = require('../controller/file_folder.controller');

File_Folder = new File_Folder();

fileRouter.post('/upload',multerFile.single('file'),File_Folder.fileUpload);
fileRouter.get('/fileRetrieve',File_Folder.fileRetrieve);
fileRouter.post('/createNew',File_Folder.createFolder);
fileRouter.get('/folderRetrieve',File_Folder.folderRetrieve);
fileRouter.get('/folderDelete',File_Folder.folderDelete);


module.exports = fileRouter;