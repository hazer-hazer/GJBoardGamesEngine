const express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

global.appRoot = path.resolve(__dirname);

app.use(express.static(path.join(appRoot, 'public')));

// Body Parser
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
	res.sendFile(path.join(appRoot, 'index.html'));
});

app.post('/game/:id', (req, res) => {
	res.json( fs.readFileSync('game.json', { encoding: 'utf8' }) );
});

app.listen(8080, () => {
	console.log('Server listen on port', 8080);
});