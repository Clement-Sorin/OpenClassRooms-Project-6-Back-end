const express = require('express');

const app = express();

app.use((req,res) => {
    res.json({message : "test server"})
})

module.exports = app;