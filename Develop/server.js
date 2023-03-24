//dependencies
const express = require('express')
const path = require('path')
const fs = require('fs')
//port
const PORT = 3001
//express()
const app = express()
//middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', async(req, res) => {
    const dbPath = path.join(__dirname, 'db/db.json');
    fs.readFile(dbPath, 'utf8', (data, err) => {
        const notes = JSON.parse(data);
    })
    res.json(notes);
})

app.post('/notes', async (req, res) => {
    try{
        res.status(200).json(req.body)
    } catch{
        res.status(400).json(err)
    }
})


app.listen(PORT, () =>
console.log(`Serving static asset routes at http://localhost:${PORT}!`)
)