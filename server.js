const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// ... hosting
const path = require("path");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
// ... hosting
app.use(express.static(path.join(__dirname, "client", "build")))

// const uri = process.env.ATLAS_URI;
const uri = process.env.MONGOLAB_CRIMSON_URI;
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB database connection established successfully');
});

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const categoriesRouter = require('./routes/categories');

app.use('/users', usersRouter );
app.use('/posts', postsRouter );
app.use('/categories', categoriesRouter );

// ... hosting
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
})