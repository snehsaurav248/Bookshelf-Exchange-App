const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;
const uri = "mongodb+srv://BookShelf:MYNAMEis30@sneh.cmhubpu.mongodb.net/BookInventory?retryWrites=true&w=majority";

// Middleware
app.use(cors());
app.use(express.json());

// Initialize MongoDB client
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Connect to MongoDB once during server initialization
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1); // Exit process if connection fails
    }
}

// Collection reference
let bookCollection;

connectToMongoDB().then(() => {
    bookCollection = client.db("BookInventory").collection("Books");

    // POST: Insert a book to the DB
    app.post("/upload-book", async (req, res) => {
        try {
            const result = await bookCollection.insertOne(req.body);
            res.status(201).json(result);
        } catch (error) {
            console.error("Error inserting book:", error);
            res.status(500).json({ message: "Failed to insert book." });
        }
    });

    // PATCH: Update book data
    app.patch("/book/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = { $set: updateData };
            
            const result = await bookCollection.updateOne(filter, updateDoc, { upsert: true });
            res.json(result);
        } catch (error) {
            console.error("Error updating book:", error);
            res.status(500).json({ message: "Failed to update book." });
        }
    });

    // DELETE: Remove a book
    app.delete("/book/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const result = await bookCollection.deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 1) {
                res.json({ message: "Book successfully deleted" });
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error) {
            console.error("Error deleting book:", error);
            res.status(500).json({ message: "Failed to delete book." });
        }
    });

    // GET: Retrieve all books or books by category
    app.get("/all-books", async (req, res) => {
        try {
            const query = req.query.category ? { category: req.query.category } : {};
            const books = await bookCollection.find(query).toArray();
            res.json(books);
        } catch (error) {
            console.error("Error fetching books:", error);
            res.status(500).json({ message: "Failed to fetch books." });
        }
    });

    // GET: Retrieve a single book by ID
    app.get("/book/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const book = await bookCollection.findOne({ _id: new ObjectId(id) });
            if (book) {
                res.json(book);
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error) {
            console.error("Error fetching book:", error);
            res.status(500).json({ message: "Failed to fetch book." });
        }
    });

    // Start the server after the database connection is established
    app.listen(port, () => {
        console.log(`App is running on http://localhost:${port}`);
    });

    // Ping MongoDB to verify connection
    client.db("admin").command({ ping: 1 }).then(() => {
        console.log("Pinged MongoDB successfully!");
    }).catch(console.error);

}).catch(console.error);
