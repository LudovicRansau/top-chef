var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
    // Let's scrape Anchorman 2
    url = 'https://www.lafourchette.com/restaurant+paris';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var name, address;
            var json = { name : "", address : ""};

            $('.resultItem-name').filter(function(){
                var data = $(this);
                name = data.children().first().text().trim();
                //release = data.children().last().children().last().text().trim();

                json.name = name;
                //json.release = release;
            })

            $('.resultItem-address').filter(function(){
                var data = $(this);
                address = data.text().trim();

                json.address = address;
            })
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
            console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send('Check your console!')
    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;