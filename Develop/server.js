//dependencies
const express = require('express')
const path = require('path')
const dbPath = path.join(__dirname, 'db/db.json');
const fs = require('fs')
const uniqid = require('uniqid')
//port
const PORT = 3001
//express()
const app = express()
//middleware
app.use(express.static('public'));
app.use(express.json());
//get request for http://localhost:3001/
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
//get request for http://localhost:3001/notes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
//get request for http://localhost:3001/api/notes
app.get('/api/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.status(200).json(notes);
    });
});
//delete request for http://localhost:3001/api/notes/:id
app.delete('/api/notes/:id', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})
//post request for /api/notes
app.post('/api/notes', (req, res) => {
//reads contents of db
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if(err){
                console.error(err);
                res.status(500).send("Invalid Data")
            }else{
//adds data from the read file to a const called notes
                const notes = JSON.parse(data)
//pushes new user data from the post request to the data in notes
                const newNote = {
                    ...req.body,
//assigns a unique id for every new note
                    id: uniqid()
                }
                notes.push(newNote)
//overwrites db with the above content
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