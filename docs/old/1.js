const cheerio = require('cheerio');
var rp = require('request-promise');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/topchef');

var Restaurant = require('../models/restaurant');

var count = 0
function getRestName(url){
    var options_rest = {
        uri: url,
        resolveWithFullResponse: true,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    return new Promise((resolve, reject) => {
        rp(options_rest)
            .then(function ($) {
                var name = $('.restaurant_base-breadcrumbs-list').children().last().children().children().text()
                var	address = $('div[itemprop="address"] > div > div > div > div > .thoroughfare').text()
                var	city = $('div[itemprop="address"] > div > div > div > div > .locality').text()
                var	postalCode = $('div[itemprop="address"] > div > div > div > div > .postal-code').text()
                var	priceRange = $('span[itemprop="priceRange"]').text()

                count++
                console.log(count)

                var restaurant = new Restaurant({name: name,
                    address: address + ", " + postalCode + " " + city,
                    priceRange: priceRange
                })

                restaurant.save(function(err, rest){
                    if(err) return console.error(err)
                    resolve()
                })

            })
            .catch(function(err){ //if error, sending the request again
                rp(options_rest)
                    .then(function ($) {
                        var name = $('.restaurant_base-breadcrumbs-list').children().last().children().children().text()
                        var	address = $('div[itemprop="address"] > div > div > div > div > .thoroughfare').text()
                        var	city = $('div[itemprop="address"] > div > div > div > div > .locality').text()
                        var	postalCode = $('div[itemprop="address"] > div > div > div > div > .postal-code').text()
                        var	priceRange = $('span[itemprop="priceRange"]').text()

                        count++
                        console.log(count)

                        var restaurant = new Restaurant({name: name,
                            address: address + ", " + postalCode + " " + city,
                            priceRange: priceRange
                        })

                        restaurant.save(function(err, rest){
                            if(err) return console.error(err)
                            resolve()
                        })

                    })
                    .catch(function(err){
                        console.error(err)
                        reject(err)
                    })
            })
    })
}