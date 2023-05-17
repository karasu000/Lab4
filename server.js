const express = require('express'),
    app = express(),
    fs = require('fs'),
    request = require('request'),
    prompt = require("prompt-sync")();

const host = '127.0.0.1';
const port =  prompt("input port: ");

app.set("view engine", "hbs");
app.set("views", "src"); 

app.use(express.static(`${__dirname}/src`));

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/server', (req, res) => {
    res.render("lab1");
});
app.get('/api', (req, res) => {
    let start = req.query.starttime;
    let end = req.query.endtime;
    request(
        `https://earthquake.usgs.gov/fdsnws/event/1/count?starttime=${start}&endtime=${end}`,
        (err, response, body) => {
            if (err)
                return res
                    .status(500)
                    .send({ message: err });

            return res.send('there was ' + body + ' earthquakes.');
        }
    );
});


app.get('/script-js', (req, res) => {
    res.set('Content-Type', 'text/plain');
    fs.readFile('src/script.js', 'utf8', (err, data) => {
        if (err) throw err;

        res.send(data);
    });
});

app.get('/styles-css', (req, res) => {
    res.set('Content-Type', 'text/plain');
    fs.readFile('src/styles.css', 'utf8', (err, data) => {
        if (err) throw err;

        res.send(data);
    });
});


app.use((req, res, next) => {
    res.send('Not found');
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});