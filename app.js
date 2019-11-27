const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//import routes
const userRoutes = require('./routes/user')

//app
const app = express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('DB connected')
})

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//routes middleware
app.use('/api',userRoutes)

const port = process.env.PORT || 8000;

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
});