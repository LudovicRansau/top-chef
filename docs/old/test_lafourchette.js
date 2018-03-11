var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var nbPage = 15;
var onVaCompterEnsemble = 0;

function restaurants(cpt) {

    return new Promise(function (setFullFilled, setRejected)
    {
        console.log(cpt);
        const url = "https://www.lafourchette.com/restaurant+paris#sort=QUALITY_DESC&page=" + cpt;

        const options = {
            url: "https://www.lafourchette.com/restaurant+paris#sort=QUALITY_DESC&page=" + cpt,
            headers: {
                'User-Agent': '\\ "Mozilla/5.0 (Windows NT 10.0; WOW64) ' +
                'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\\"',
                Cookie: '\\"datadome=AHrlqAAAAAMAwVzDpbiWd78ALtotww==\\"'
            }
        }

        request(options, function (error, response, html) {
            if (!error) {

                var $ = cheerio.load(html);

                var json = {name: ""};

                $(".list-unstyled").find(".resultItem").find(".resultItem-name").each(function (index, element) {

                    var name = $(element);
                    var a = $(element);
                    console.log(a.text().trim());
                    name = name.text().trim();
                    json.name = name;
                });

                $(".list-unstyled").find(".resultItem").find(".resultItem-address").filter(function () {
                    var data = $(this);
                    address = data.text().trim();
                    console.log(data.text().trim());
                    json.address = address;
                });

                $(".pagination").find("ul").find("li:nth-last-child(2)").filter(function () {
                    var data = $(this);
                    nbPage = data.text().trim();
                    console.log(data.text().trim());
                    console.log(nbPage);
                    json.nbPage = nbPage;
                });

                $(".resultItem-information").find(".resultItem-saleType").each(function (index, element) {
                    var a = $(element);
                    console.log(a.text().trim())
                });
                fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
                    console.log('File successfully written! - Check your project directory for the output.json file');

                });
            } else {
                console.log("Error");
                console.log(response.statusCode);
            }
        });
    });
};

var cpt = 1;
restaurants(cpt);
for( cpt = 1; cpt <= 10; cpt++)
{
    .then(restaurants(cpt));
}