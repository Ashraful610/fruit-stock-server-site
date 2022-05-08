const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000 ;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middleware
require('dotenv').config()
app.use(cors())
app.use(express.json())


// user :DB_USER_ASSIGNMENT
// pass : tCTRoIBEHEXaURYa

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fs0qb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
        try{
            await client.connect()
            const fruitsCollection = client.db('fruits-stock').collection('fruits')
            
            // get fruits data 
            app.get('/fruits' , async ( req , res) => {
                const query = {}
                const cursor = fruitsCollection.find(query)
                const fruits = await cursor.toArray()
                res.send(fruits)
            })

            // get one fruits data 
            app.get('/fruits/:id', async(req , res) => {
                const id = req.params.id
                const query = {_id:ObjectId(id)}
                const fruit = await fruitsCollection.findOne(query)
                res.send(fruit)
            })

            //  new fruit post 
            app.post('/fruit' , async(req , res) => {
                const fruit = req.body
                const result = await fruitsCollection.insertOne(fruit)
                res.send(result)
            })

            // update fruit quantity
            app.put('/fruits/:id' , async (req , res) => {
                const id = req.params.id
                const newFruit = req.body
                const filter = {_id:ObjectId(id)}
                const options = { upsert: true };
                const updateFruit = {
                    $set:newFruit
                }
                const result = await fruitsCollection.updateOne(filter , updateFruit , options)
                res.send(result)
            })

            // delete a fruit
            app.delete('/fruits/:id' , async(req , res)=> {
                const id = req.params.id
                const query = {_id:ObjectId(id)}
                const fruit = await fruitsCollection.deleteOne(query)
                res.send(fruit)
            })

        }
        finally{

        }
}
run().catch(console.dir)

app.get('/' ,(req , res) => {
    res.send('assignment server site is ok')
})

app.listen(port ,() => {
    console.log('assignment server site is ok')
})