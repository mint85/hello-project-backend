const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

require("dotenv").config();

const { PORT, MONGODB_URL } = process.env;

mongoose.connect(MONGODB_URL);

const db = mongoose.connection;

db
.on('connected', () => console.log('Connected to MongoDB'))
.on('disconnected', () => console.log('Disconnected from MongoDB'))
.on('error', (err) => console.log('MongoDB Error: ' + err.message))


const ideasSchema = new mongoose.Schema({
    name: String,
    img: String
}, { timestamps: true});

const Ideas = mongoose.model("Ideas", ideasSchema)
;
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello Project");
});

app.get("/ideas", async (req, res) => {
    try {
        res.json(await Ideas.find({}))
    } catch (error) {
        res.status(400).json(error)
    };
});

app.post("/ideas", async (req, res) => {
    try {
        res.json(await Ideas.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    };
});

app.put("/ideas/:id", async (req, res) => {
    try {
        res.json(await Ideas.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        ));
    } catch (error) {
        res.status(400).json(error)
    }
})

app.listen(PORT || 3000, () => console.log(`Server is listening on ${PORT}`));