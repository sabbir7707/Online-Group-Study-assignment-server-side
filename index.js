const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json());


console.log(process.env.DB_USER);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ey6olt5.mongodb.net/?retryWrites=true&w=majority`;


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
    const addCollection = client.db('assignment').collection('addassignment');


    app.get('/app/v1/allassignment', async (req, res) => {
      console.log('paginatin  quarry ', req.query);
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      console.log('pagination query', page, size);
      const result = await assignmentCollection.find()
      .skip(page * size)
      .limit(size)
      .toArray();

      res.send(result);
    })

    app.get('/app/v1/allassignment', async (req, res) => {
      const cursor = assignmentCollection.find();
      const result = await cursor.toArray()
      res.send(result)
    })


    //


    //client user thake add korba   assignment gula 
    app.post('/app/v1/allassignment', async (req, res) => {
      const add_asg = req.body;
      const result = await assignmentCollection.insertOne(add_asg)
      res.send(result)
    })

    //update assignment 
    app.get('/app/v1/allassignment/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await assignmentCollection.findOne(query)
      res.send(result);

    })
    app.put('/app/v1/allassignment/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };

      const updateproduct = req.body;
      const product = {
        $set: {
          title: updateproduct.title,
          Description: updateproduct.Description,
          marks: updateproduct.marks,
          due_date: updateproduct.due_date,
          thumbnail_url: updateproduct.thumbnail_url,
          difficulty_level: updateproduct.difficulty_level,

        }

      }
      const result = await assignmentCollection.updateOne(filter, product, options)
      res.send(result);

    })
    // submitaded assignment
    app.get('/app/v1/task', async (req, res) => {
      const mail=req.query.email
     console.log(mail);
      const cursor = addCollection.find({email:mail});
      const result = await cursor.toArray()
      console.log(result);
      res.send(result)
    })
    app.get('/app/v1/submited', async (req, res) => {
    
     
      const cursor = addCollection.find();
      const result = await cursor.toArray()
      console.log(result);
      res.send(result)
    })



    app.post('/app/v1/addassignment', async (req, res) => {
      const add_asg = req.body;
      const result = await addCollection.insertOne(add_asg)
      res.send(result)
    })


    app.delete('/app/v1/allassignment/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await assignmentCollection.deleteOne(query)
      res.send(result);

    })

    // paigination
    app.get('/app/v1/pgassignment', async (req, res) => {
      const count = await assignmentCollection.estimatedDocumentCount();
      res.send({count});
    })





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
