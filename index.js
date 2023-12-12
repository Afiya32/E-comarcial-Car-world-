const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

// car-server
// KJ97kjpoUpUjSeMT

// connection to mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fffaqtl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
// getting card data
const cardCollection =client.db('cardDB').collection('mycard');
// my card read
app.get('/mycards',async(req,res)=>{
  const cursor = cardCollection.find();
  const result = await cursor.toArray();
  res.send(result);
})
// my card posting
app.post('/mycards',async(req,res)=>{
    const brand = req.body;
    console.log(brand);
    const result = await cardCollection.insertOne(brand);
    res.send(result);
});
// getting brand data
const brandCollection =client.db('brandBD').collection('brand');
// brand data read
app.get('/brand',async(req,res)=>{
  const cursor = brandCollection.find();
  const result = await cursor.toArray();
  res.send(result);
})
// brand data posting
app.post('/brand',async(req,res)=>{
    const newBrand = req.body;
    console.log(newBrand);
    const result = await brandCollection.insertOne(newBrand);
    res.send(result);
});


// getting product data
const productCollection =client.db('productBD').collection('product');
// product data read
app.get('/products',async(req,res)=>{
  const cursor = productCollection.find();
  const result = await cursor.toArray();
  res.send(result);
})
app.get('/products/:brand', async (req, res) => {
  const brand = req.params.brand;

  try {
    const cursor = productCollection.find({ brand: brand });
    const result = await cursor.toArray();
    res.json(result);
  } catch (err) {
    console.error("Error querying the collection:", err);
    res.status(500).send("Internal Server Error");
  }
});

// products data posting
app.post('/products',async(req,res)=>{
    const newProduct = req.body;
    console.log(newProduct);
    const result = await productCollection.insertOne(newProduct);
    res.send(result);
});




  await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);









// root
app.get('/', (req, res)=>{
    res.send('CarWorld server is running');
})
app.listen(port,()=>{
    console.log(`CarWorld Server is running on port ${port}`);
});