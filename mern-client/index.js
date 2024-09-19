const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

// Middleware to connect to the frontend side
app.use(cors());
app.use(express.json());

// MongoDB configuration
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Use the correct and URL-encoded MongoDB URI
const uri = "mongodb+srv://BookShelf:MYNAMEis30@sneh.cmhubpu.mongodb.net/BookInventory?retryWrites=true&w=majority";

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
        // Connect the client to the server
        await client.connect();
        console.log("Connected to MongoDB!");

        // Create a collection of documents
        const bookCollection = client.db("BookInventory").collection("Books");

        // Insert a book to the DB: POST method
        app.post("/upload-book", async (req, res) => {
            try {
                const data = req.body;
                const result = await bookCollection.insertOne(data);
                res.status(201).send(result); // Respond with 201 status code for creation
            } catch (error) {
                console.error("Error inserting book:", error);
                res.status(500).send({ message: "Failed to insert book." });
            }
        });

        // Update a book data: PATCH method
        app.patch("/book/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const updateBookData = req.body;
                const filter = { _id: new ObjectId(id) };
                const options = { upsert: true };
                
                const updateDoc = {
                    $set: {
                        ...updateBookData
                    }
                };
                
                const result = await bookCollection.updateOne(filter, updateDoc, options);
                res.send(result);
            } catch (error) {
                console.error("Error updating book:", error);
                res.status(500).send({ message: "Failed to update book." });
            }
        });

        // Delete a book data: DELETE method
        app.delete("/book/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const filter = { _id: new ObjectId(id) };
                const result = await bookCollection.deleteOne(filter);
                if (result.deletedCount === 1) {
                    res.send({ message: "Book successfully deleted" });
                } else {
                    res.status(404).send({ message: "Book not found" });
                }
            } catch (error) {
                console.error("Error deleting book:", error);
                res.status(500).send({ message: "Failed to delete book." });
            }
        });

        // Find books by category or get all books: GET method
        app.get("/all-books", async (req, res) => {
            try {
                let query = {};
                if (req.query?.category) {
                    query = { category: req.query.category };
                }
                const result = await bookCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                console.error("Error fetching books:", error);
                res.status(500).send({ message: "Failed to fetch books." });
            }
        });

        // Get a single book data: GET method
        app.get("/book/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const filter = { _id: new ObjectId(id) };
                const result = await bookCollection.findOne(filter);
                if (result) {
                    res.send(result);
                } else {
                    res.status(404).send({ message: "Book not found" });
                }
            } catch (error) {
                console.error("Error fetching book:", error);
                res.status(500).send({ message: "Failed to fetch book." });
            }
        });

        // Ping MongoDB to ensure the connection works
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error("Connection to MongoDB failed:", err);
    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});
