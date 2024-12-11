import express from 'express';
import cors from 'cors';
import mongodb from 'mongodb';

const app = express();
const port = 3001;

const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "projects";

let db;

MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        console.log("Database connected!");
        db = client.db(dbName);
    })
    .catch(err => {
        console.error("Error connection to MongoDB:", err);
    })

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());

app.get('/api/data', async (req, res) => {
    if (!db) {
        return res.status(500).send({ error: "Database not initialized" });
    }
    try {
        const collection = db.collection("users");
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send({ error: "Error fetching data" });
    }
});

app.get('/api/data/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const collection = db.collection("users");
        const user = await collection.findOne({ _id: new mongodb.ObjectId(id) });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/api/data', async (req, res) => {
    if (!db) {
        return res.status(500).send({ error: "Database not initialized" });
    }
    try {
        const collection = db.collection("users");
        const newData = req.body;

        const result = await collection.insertOne(newData);
        res.status(201).json({
            message: "User added successfully",
            data: {
                ...newData,
                insertedId: result.insertedId
            }
        });
    } catch (error) {
        console.error("Error addding data:", error);
        res.status(500).send({ error: "Error adding user" });
    }
});

app.put('/api/data/:id', async(req, res) => {
    if (!db) {
        return res.status(500).send({ error: "Database not initialized" });
    }

    try {
        const { id } = req.params;
        const updatedData = req.body;
        if (!mongodb.ObjectId.isValid(id)) {
            return res.status(400).send({ error: "Invalid ID format" });
        }

        const collection = db.collection("users");
        const result = await collection.updateOne(
            { _id: new mongodb.ObjectId(id) },
            { $set: updatedData } 
        );

        if (result.matchedCount === 0) {
            return res.status(404).send({ error: "User not found" });
        }

        res.json({
            message: "User updated successfully",
            updatedCount: result.modifiedCount,
        });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).send({ error: "Error updating user" });
    }
})
app.delete('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongodb.ObjectId.isValid(id)) {
        return res.status(400).send({ error: "ID no válido" });
    }

    try {
        const collection = db.collection("users");
        const result = await collection.deleteOne({ _id: new mongodb.ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).send({ error: "Usuario no encontrado" });
        }

        res.status(200).send({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error("Error eliminando usuario:", error);
        res.status(500).send({ error: "Error eliminando usuario" });
    }
});





app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Inicio del servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});