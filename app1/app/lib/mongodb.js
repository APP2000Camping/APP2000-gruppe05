require('dotenv').config({ path: '.env.local' });

//node app/lib/mongodb.js  for å teste om han greier å koble til mongodb (når du er i cd app1)  
const { MongoClient, ServerApiVersion } = require('mongodb');

// Bruk URI fra miljøvariabler
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
