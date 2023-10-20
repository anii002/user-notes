const express = require("express");
// import express from "express";
const mongoose = require("mongoose");
const path = require("path")
const cors = require("cors");
require("dotenv").config();
// set up express
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
// set up mongoose
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established");
    }
);
if (Number(process.env.PRODUCTION)) {
    console.log("wfee")
    app.use(express.static('../frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}
// set up routes
app.use("/users", require("./routes/user"));
app.use("/notes", require("./routes/notes"));