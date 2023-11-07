const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json());


const uri ='mongodb+srv://online-group-study:SBSXE00VI6u9dvkR@cluster0.ey6olt5.mongodb.net/?retryWrites=true&w=majority';
/// kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();

    const assignmentCollection = client.db('assignment').collection('allassignment');
  /*    const addCollection = client.db('assignment').collection('addassignment');  */

      app.get('/app/v1/allassignment', async (req ,res)=>{
      const cursor = assignmentCollection.find();
      const result =await cursor.toArray()
      res.send(result)
     }) 

 /*     //client user thake add korba   assignment gula 
     app.post('/app/v1/allassignment', async (req ,res)=>{
       const add_asg = req.body;
       const result =  await assignmentCollection .insertOne(add_asg)
     res.send(result)
     }) */



     //delete korar kage 
     
 /*     app.delete('/app/v1/user/addassignment', async (req ,res)=>{
       const add_asg = req.body;
       const result =  await addCollection.insertOne(add_asg)
     res.send(result)
     })
 */


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send(' online grope study  ')
})

app.listen(port, () => {
    console.log(` group study  Server is running on port : ${port}`);
})
