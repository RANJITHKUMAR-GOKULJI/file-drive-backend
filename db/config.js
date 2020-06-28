const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/driveDb", {useNewUrlParser: true}).then(()=>{
    console.log('Db connected successfully')
}).catch(err=>{
    console.log(err);
});

module.exports = mongoose;