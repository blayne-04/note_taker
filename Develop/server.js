const express = require('express')
const path = require("path")
const landingPage = require('./public/index.html')
const PORT = 3001

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());