const express = require("express")
const cors = require("cors");

const app = express();

require("dotenv").config();

const { PORT } = process.env;

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello Project");
});

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));