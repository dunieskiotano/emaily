const express = require('express');
//import express from "express";

const app = express();

app.get('/', (req, res) => {
  //res.send({ hi: 'there' });
  res.send('Te amo, mami linda')
});

// This gets a dynamic port used by Heroku (prod) or use port 5000 (dev)
const PORT = process.env.PORT || 5000;

app.listen(PORT);
