var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


function restaurants(nbPage) {
    var url = "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-"+nbPage;

    var options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36'
        }
    };

    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {

            var $ = cheerio.load(html);

            var name;
            var json = {name: ""};

            $(".poi_card-display-title").filter(function(){
                name = $(this)
                 name =  name.text().trim();
                console.log($(this).text().trim());
                json.name = name;
            });

            fs.appendFile('liste_restaurant.json', JSON.stringify(json, null, 4), function (err) {
                console.log('File successfully written! - Check your project directory for the output.json file');

            });
        }
    });
}

///var result;
for (var i = 0; i < 200; i++) {
    restaurants(i);
}