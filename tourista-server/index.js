const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Starts Here
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.5rezh0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    // Create Collections
    const countriesCollection = client.db("touristaDB").collection("countries");
    const spotsCollection = client.db("touristaDB").collection("spots");

    // Operation Starts Here

    // Get All Countries
    app.get("/countries", async (req, res) => {
      const cursor = countriesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Add Spot
    app.post("/spots", async (req, res) => {
      const newSpot = req.body;
      const result = await spotsCollection.insertOne(newSpot);
      res.send(result);
    });

    // View All Spots
    app.get("/spots", async (req, res) => {
      const { sort } = req.query;
      let sortOrder = {};

      // Low to High or High to Low sorting
      if (sort === "lowToHigh") {
        sortOrder = { spot_average_cost: 1 }; // Ascending order
      } else if (sort === "highToLow") {
        sortOrder = { spot_average_cost: -1 }; // Descending order
      }

      const cursor = spotsCollection.find().sort(sortOrder);
      const result = await cursor.toArray();
      res.send(result);
    });

    // View A Spot Detail By ID
    app.get("/spots/:id", async (req, res) => {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }
      const query = { _id: new ObjectId(id) };
      const result = await spotsCollection.findOne(query);
      res.send(result);
    });

    // View Spots By Email
    app.get("/tourSpots/:email", async (req, res) => {
      const email = req.params.email;
      const query = { spot_creator_email: email };
      const cursor = spotsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // Delete A Spot
    app.delete("/spots/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await spotsCollection.deleteOne(query);
      res.send(result);
    });

    // Operation Ends Here

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// MongoDB Ends Here

app.get("/", (req, res) => {
  res.send("Server Is Running!");
});

app.listen(port, () => {
  console.log(`Port : ${port}`);
});
