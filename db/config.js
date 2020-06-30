const mongoose = require('mongoose');

//mongoose.connect("mongodb://localhost:27017/driveDb", {useNewUrlParser: true})
const db = 'driveDb';
const userName= 'Ranjith_admin';

const uri = "mongodb+srv://Ranjith_admin:9pCDRS40Pbb9yBa5@userdb-gn3kq.mongodb.net/driveDb?retryWrites=true&w=majority";
//const uri = "mongodb+srv://userdb-gn3kq.mongodb.net/authSource=driveDb&9pCDRS40Pbb9yBa5";
mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
    console.log('Db connected successfully')
}).catch(err=>{
    console.log(err);
});

module.exports = mongoose;