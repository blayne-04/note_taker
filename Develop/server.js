//dependencies
const express = require('express')
const path = require('path')
const dbPath = path.join(__dirname, 'db/db.json');
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

app.get('/api/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.status(200).json(notes)
    })
})

app.post('/api/notes', async (req, res) => {
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if(err){
                console.error(err);
                res.status(500).send("Invalid Data")
            }else{
                const notes = JSON.parse(data)
                notes.push(req.body)
                fs.writeFile(dbPath, JSON.stringify(notes, null, 4), (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Error writing to file');
                    } else {
                        console.log('Data updated');
                        res.status(200).send('\n Data updated');
                    }
                });
            }
        });
});

app.listen(PORT, () =>
console.log(`Serving static asset routes at http://localhost:${PORT}!`)
)