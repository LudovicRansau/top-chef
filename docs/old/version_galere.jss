var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var restaurant;

const url = "https://www.lafourchette.com/restaurant+paris#sort=QUALITY_DESC&page=10";

const options = {
    url: "https://www.lafourchette.com/restaurant+paris#sort=QUALITY_DESC&page="+compteur,
    headers: {
        'User-Agent': '\\ "Mozilla/5.0 (Windows NT 10.0; WOW64) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\\"',
        Cookie: '\\"datadome=AHrlqAAAAAMAwVzDpbiWd78ALtotww==\\"'
    }
}

function request( options, error, response, html) {
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

        restaurant = {
            name: name,
            address: address,
            zipcode: zipcode,
            star: star,
            offer: offer
        };

        callback(restaurant);
    }
}

function get() {
    console.log("coucou2");
    for(let i = 1; i<=30; i++) {
        get_infos( function (restaurant) {
            json.push(restaurant);
            fs.writeFile('output.json', JSON.stringify(restaurant, null, 4), function(err){
                console.log('File successfully written! - Check your project directory for the output.json file');
            })
        });
    }
}

var resto = function(options){
    return new Promise(function (resolve, reject){
        resolve(request(options, function(error, response, html) {

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
                    address = address.text().trim();
                    console.log(address);
                });

                $(".addressfield-container-inline").find(".postal-code").filter(function(){
                    zipcode = $(this);
                    zipcode = zipcode.text().trim();
                    console.log(zipcode);
                })

                $(".resultItem-information").find(".resultItem-saleType").each(function (index, element) {
                    offer = $(element);
                    offer = offer.text().trim();
                    console.log(offer);
                });

                restaurant = {
                    name: name,
                    address: address,
                    zipcode: zipcode,
                    star: star,
                    offer: offer
                };

                //callback(restaurant);
            }

            fs.writeFile('liste.json', JSON.stringify(restaurant, null, 4), function(err){
                console.log('File successfully written! - Check your project directory for the output.json file');
                });
        }));
    });
}

var sum1 = function ( a,b, callback) {
    callback(a+b);
};

sum1(8,2, function(sum){
    console.log(4 + sum);
});

var add = function ( a,b ) {
    return new Promise(function (resolve, reject){
        resolve(a+b);
    });
}

var compteur = 1;
for(compteur = 1; compteur < 10; compteur++)
{
    resto(options)
}
console.log(add(5,8));