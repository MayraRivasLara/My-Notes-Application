// requesting required modules and files
const express = require('express');
const fs = require('fs');

// initializing express app
const app = express();

const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const path = require('path');


// define port to be used by heroku on deployment.
const PORT = process.env.PORT || 3001;


// to be able to grab the index.js folder
app.use(express.static('public'));

// teaching express to understand JSON - middleware.
app.use(express.json());
app.use(express.urlencoded({extended: true})); // form data

// web route to be able to serve html files 
app.use(webRoutes);

// api route to be able to serve to serve json
app.use('/api',apiRoutes);

//404 html page reference
app.get('*', (req, res) => {
    const errorPage = path.join(__dirname, 'public', '404.html');
    res.status(404).sendFile(errorPage);
});

app.listen(PORT,() => {
    console.log(`Your awesome APP is running on http://localhost:${PORT}`);
});
