const express = require('express')
const { dbConnection } = require('./database/config')
var cors = require('cors')
require('dotenv').config()
const path = require('path');

const app = express()

//CORS with headers
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500','http://localhost:5173'],
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ]
}))

//DB config
dbConnection();

//Public Directory
app.use(express.static('public'))

//Reading and body parsing
app.use(express.json())

//Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/event'))


app.use('*',(req,res)=>{
res.sendFile(path.join(__dirname,'public/index.html'));
})

//Auth

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})
