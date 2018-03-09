var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var nbPage;
var onVaCompterEnsemble = 0;
//setInterval(function() {
        do{

            onVaCompterEnsemble += 1;

            app.get('/scrape', function(req, res){
                // Let's scrape Anchorman 2
                //https://www.lafourchette.com/tous-les-restaurants?page=
                const url = "https://www.lafourchette.com/restaurant+paris#sort=QUALITY_DESC&page=" + onVaCompterEnsemble;

                const options = {
                    url: "https://www.lafourchette.com/restaurant+paris#sort=QUALITY_DESC&page=" + onVaCompterEnsemble,
                    headers: {
                        'User-Agent': '\\ "Mozilla/5.0 (Windows NT 10.0; WOW64) ' +
                        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\\"',
                        Cookie: '\\"datadome=AHrlqAAAAAMAwVzDpbiWd78ALtotww==\\"'
                    }
                }
                /*
                function restaurants(nbPage) {
                    const url = "https://www.lafourchette.com/restaurant+paris#sort=QUALITY_DESC&page=10" + nbPage;

                    const options = {
                        url: "https://www.lafourchette.com/restaurant+paris#sort=QUALITY_DESC&page=10" + nbPage,
                        headers: {
                            'User-Agent': '\\ "Mozilla/5.0 (Windows NT 10.0; WOW64) ' +
                            'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\\"',
                            Cookie: '\\"datadome=AHrlqAAAAAMAwVzDpbiWd78ALtotww==\\"'
                        }
                    }
                };
        */
                request(options, function(error, response, html) {
                    if (!error) {

                        var $ = cheerio.load(html);

                        var json = {name: ""};

                        $(".list-unstyled").find(".resultItem").find(".resultItem-name").each(function (index, element) {

                            var name = $(element);
                            var a = $(element);
                            console.log("coucou");
                            console.log(a.text().trim());
                            name = name.text().trim();
                            json.name = name;
                        });

                        $(".list-unstyled").find(".resultItem").find(".resultItem-address").filter(function(){
                            var data = $(this);
                            address = data.text().trim();
                            console.log(data.text().trim());
                            json.address = address;
                        });

                        $(".pagination").find("ul").find("li:nth-last-child(2)").filter(function(){
                            var data = $(this);
                            nbPage = data.text().trim();
                            console.log(data.text().trim());
                            json.nbPage = nbPage;
                        });

                        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
                            console.log('File successfully written! - Check your project directory for the output.json file');
                        });

                        res.send('Check your console!')

                    } else {
                        console.log("Error");
                        console.log(response.statusCode);
                    }
                });
            })

        }while(onVaCompterEnsemble < nbPage);
//}, 100);


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;