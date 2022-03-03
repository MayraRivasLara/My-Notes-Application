const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const id = require('uuid');

const dbPath = path.join(__dirname,'..', 'db', 'db.json');

// jsDoc to get auto complete - nice way to specify the return type.
/**
 * 
 * @returns {Array}
 */


function getNotes(){
    return JSON.parse(fs.readFileSync(dbPath,'utf-8') || '[]' );

};

function saveNotes(notes){
    fs.writeFileSync(dbPath, JSON.stringify(notes),'utf-8');
};


router.get('/notes', (req, res) => {
    
    // get the data contained in db.json
    
    const notes = getNotes();
    console.log(notes);

    // send them back 
    res.json(notes);

});

router.post('/notes', (req, res) => {
    
    // get the request body - meaning the information that the user is adding to the notes
    const {title, text} = req.body;

    console.log(title, text);

    // create a new note in db.jason
    const newNote = {
        id: id.v4(),
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
        return res.status(400).json({
            error: 'Not found!'
        });
    };

    // update it

    const updatedNote = notes[notesFound]
    notes[notesFound].title = req.body.title || updatedNote.title;
    notes[notesFound].text = req.body.text || updatedNote.text;
    
    // re-save
    saveNotes(notes);

    res.json(updatedNote);
});

// getting a specific note
router.get('/notes/:id', (req, res) => {
    
    // get all notes
    const notes = getNotes();

    //get the note with matching id
    const found = notes.find((note) => note.id === req.params.id);

    if(!found){
        res.status(400).json({
            error:'Note not found!'
        });
    } else {
        // send back note 
        res.json(found);
    }
});

//delete selected note
router.delete('/notes/:id', (req, res) =>{
    
    //get all notes
    const notes = getNotes();

    // delete targeted note using id
    const filtered = notes.filter((note) => note.id !== req.params.id);

    //re-save
    saveNotes(filtered);
    
    // send res back
    res.json({
        data: "ok",
    })
});


module.exports = router;
