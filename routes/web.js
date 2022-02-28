const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    
    const htmlFilePath = path.join(__dirname, '..', 'public', 'index.html');
    res.sendFile(htmlFilePath);
});

router.get('/notes',(req, res) => {
    const htmlFilePath = path.join(__dirname, '..', 'public', 'notes.html');
    res.sendFile(htmlFilePath);
});

module.exports = router;