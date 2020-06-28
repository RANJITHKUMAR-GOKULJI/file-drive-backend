const express = require('express');
require('./db/config');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(cors());

const authRoutes = require('./routes/auth.routes')
const fileRoutes = require('./routes/file.routes');

app.use('/user',authRoutes);
app.use('/file',fileRoutes);


app.use(express.static('./files/'));

app.listen(4001,function(){
    console.log('Port running successfully')
})