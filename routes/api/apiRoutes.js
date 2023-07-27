const fs = require('fs');
const router = require('express').Router();
let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

// Function to read the db.json file and return a promise
function readDbFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
}

// Route to get all notes
router.get('/notes', async (req, res) => {
  try {
    const notes = await readDbFile();
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to add a note
router.post('/notes', async (req, res) => {
  try {
    const notes = await readDbFile();
    const newNote = { ...req.body, id: Date.now().toString() }; // Generate ID
    notes.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.status(200).json(newNote);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a note
router.delete('/notes/:id', async (req, res) => {  // <-- change '/api/notes/:id' to '/notes/:id'
  let noteId = req.params.id;
  try {
    const notes = await readDbFile();
    const updatedNotes = notes.filter((note) => note.id != noteId);
    fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), (err) => {
      if (err) throw err;
      console.log(`Your note, ID: ${noteId}, has been successfully deleted!`);
      res.status(200).json(updatedNotes);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
