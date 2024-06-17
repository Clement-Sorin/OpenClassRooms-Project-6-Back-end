const express = require('express');

const app = express();

app.use((req,res) => {
    res.json({message : "test server port 3100"})
})

module.exports = app;