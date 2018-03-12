Skip to content
This repository
Search
Pull requests
Issues
Marketplace
Explore
@LudovicRansau
Sign out
0
0 117 valbronx/top-chef
forked from 92bondstreet/top-chef
Code  Pull requests 0  Projects 0  Wiki  Insights
top-chef/top-chef/lafourchette.js
2b86cf7  7 days ago
@valbronx valbronx final

82 lines (52 sloc)  1.96 KB
var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var $ = require('jQuery');


const deasync = require("deasync")
const request_sync = require('sync-request')
var getJSON = require('get-json')
var app     = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
app.get('/lafourchette', function(req, res){
    // Let's scrape Anchorman 2
    console.log("dwf1");


//data =readTextFile(file);
//    console.log(data);
    //var data='[{"title": "Hostellerie du Rosenmeer","rating": ""}]';
//var mydata = JSON.parse(fs.readFileSync("output.json"));
//console.log(mydata[10].title);





    function fourchette(){

        var mydata = JSON.parse(fs.readFileSync("outputok.json"));

        for(i = 0; i< 10; i++){
            console.log(i);
            request({
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
                    'Cookie': 'datadome=AHrlqAAAAAMANf9R81nlg8EALtotww==;'
                },
                uri: 'https://www.lafourchette.com/search-refine/' +String(mydata[i].title),
                method: 'GET'
            }, function (err, res, body) {
                $ = cheerio.load(body);

                $('.resultItem').each(function(i, elem) {
                    //console.log($('.resultItem-name' ,this).text().trim() + ':' + mydata[i].title);
                    if($('.resultItem-name' ,this).text().trim() == mydata[i].title){
                        console.log('ok');
                    }
                    //console.log($('.resultItem-name' ,this).text());
                    //console.log($('.resultItem-address' ,this).text());
                });
                $('.resultItem-saleType').each(function(i, elem) {
                    console.log("Il y a une reduction pour " + ':' + mydata[i].title);

                    //console.log($('.resultItem-address' ,this).text());
                });


            });


        }

    }


    fourchette();








    res.send('Check your console!')

})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
© 2018 GitHub, Inc.
    Terms
Privacy
Security
Status
Help
Contact GitHub
API
Training
Shop
Blog
About