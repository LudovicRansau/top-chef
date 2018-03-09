var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

console.log("cest parti");

function get_infos() {
    console.log("coucou1");
    const url = "https://www.lafourchette.com/restaurant+paris#sort=QUALITY_DESC&page=10";

    const options = {
        url: "https://www.lafourchette.com/restaurant+paris#sort=QUALITY_DESC&page=10",
        headers: {
            'User-Agent': '\\ "Mozilla/5.0 (Windows NT 10.0; WOW64) ' +
            'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\\"',
            Cookie: '\\"datadome=AHrlqAAAAAMAwVzDpbiWd78ALtotww==\\"'
        }
    }

    request(url, function (error, response, html) {
        if (!error) {

            var $ = cheerio.load(html);

            var name, address, zipcode, star, offer;

            $(".list-unstyled").find(".resultItem").find(".resultItem-name").each(function (index, element) {
                name = $(element);
                name = name.text().trim();
                console.log(name);
            });

            $(".list-unstyled").find(".resultItem").find(".resultItem-address").filter(function () {
                address = $(this);
                address = data.text().trim();
                console.log(address);
            });

            $(".addressfield-container-inline").find(".postal-code").filter(function(){
                zipcode = $(this);
                zipcode = data.text().trim();
                console.log(zipcode);
            })

            $(".resultItem-information").find(".resultItem-saleType").each(function (index, element) {
                offer = $(element);
                offer = data.text().trim();
                console.log(offer);
            });

            var restaurant = {
                name: name,
                address: address,
                zipcode: zipcode,
                star: star,
                offer: offer
            };

            callback(restaurant);
        }
    });
}
console.log("fin coucou1");
function get() {
    console.log("coucou2");
    for(let i = 1; i<=30; i++) {
        get_infos( function (restaurant) {
            json.push(restaurant);
            fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
                console.log('File successfully written! - Check your project directory for the output.json file');
            })
        });
    }
}
console.log("fin coucou2");
get();

module.exports.get = get;