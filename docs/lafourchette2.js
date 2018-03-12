var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');

var contents = fs.readFileSync("./liste_restaurants_michelin.json");
var lines = String(contents).split(/\n/);
var storage;

fs.readFile('liste_restaurants_michelin.json', function (err, data) {
    if (data) {
        //console.log("Read JSON file: " + data);
        data = data.toString().trim();
        data = JSON.parse(JSON.stringify(data.toString().trim()));
        storage = JSON.parse(data);
        console.log(storage);
    }});