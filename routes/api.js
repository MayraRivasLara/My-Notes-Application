const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const id = require('uuid');

const dbPath = path.join(__dirname,'..', 'db', 'db.json')

/**
 * 
 * @returns {Array}
 */


function getNotes(){
    return JSON.parse(fs.readFileSync(dbPath,'utf-8') || '[]' );

};

function saveNotes(notes){
    fs.writeFileSync(dbPath, JSON.stringify(notes),'utf-8');
}

router.get('/notes', (req, res) => {
    
    // get the data contained in db.json
    
    const notes = getNotes();
    console.log(notes);

    // send them back 
    res.json(notes);

    const htmlFilePath = path.join(__dirname, '..', 'public', 'index.html');
    res.sendFile(htmlFilePath);
});

router.post('/notes', (req, res) => {
    
    // get the request body - meaning the information that the user is adding to the notes
    const {title, text} = req.body;

    console.log(title, text);

    // create a new note in db.jason
    const newNote = {
        id,
        title,
        text,
    };

    // grab all the existing notes in db.jason
    const previousNotes = getNotes();

    // add the new note to the previous saved notes and 
    previousNotes.push(newNote);
        
    // create note / save
    saveNotes(previousNotes);

    // send back a response to the client = new note in the res body
    res.json(newNote);
});
  
// update
router.put('/notes/:id', (req, res) => {
    
    // Get all the notes
    const notes = getNotes();
    
    // find the note 
    const notesFound = notes.findIndex((note) => note.id === req.params.id);
    if(notesFound === -1) {
        return res.status(404).json({
            error: 'Not found!'
        });
    };

    // update it
    
    // re-save
});

// getting a specific note
router.get('/notes/:id', (req, res) => {
    
    // get all notes
    const notes = getNotes();

    //get the note with matching id
    const found = notes.find((note) => note.id === req.params.id);

    if(!found){
        res.status(404).json({
            error:'Note not found!'
        });
    } else {
        res.json(found);
    }

    // send back note 


});

//delete selected note
router.delete('/notes/:id', (req, res) =>{
    
    //get all notes
    const allNotes = getNotes();

    // delete targeted note using id
    const filtered = allNotes.filter((note) => note.id !== req.params.id);

    //re-save
    saveNotes(filtered);
    
    // send res back
    res.json({
        data: "ok",
    });
});

module.exports = router;
