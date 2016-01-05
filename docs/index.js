const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('static'));

app.get('/', (req, res) => {
    fs.readFile('./templates/index.html', (err, html) => {
        if (err) {
            throw err;
        }

        res.writeHeader(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    });
});

console.log('Running docs on  http://127.0.0.1:3337');

app.listen(3337);
