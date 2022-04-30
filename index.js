const express = require('express');
const app = express()
const port = process.env.PORT || 5000 ;

//middleware
const cors = require('cors');

app.use(cors())
app.use(express.json())

app.get('/' , async(req , res) => {
    res.send('assignment server site is ok')
})

app.listen(port ,() => {
    console.log('assignment server site is ok')
})