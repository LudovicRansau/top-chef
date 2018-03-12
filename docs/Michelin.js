var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');


function restaurants(nbPage) {
 var url = "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-"+nbPage;

   var options = {
       headers: {
           'User-Agent': '\\ "Mozilla/5.0 (Windows NT 10.0; WOW64) ' +
           'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\\"',
           Cookie: '\\"datadome=AHrlqAAAAAMAwVzDpbiWd78ALtotww==\\"'
       }
};

  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
        /*
        $(".poi_card-display-title").filter(function(){
            var a = $(this);
            console.log(a.text().trim())
            console.log(nbPage);
        });
        */
        var liste_restaurant = [];
        var json = {name:""};
        var name;

        $('[attr-gtm-type="poi"]').each(function(){
            var data = $(this);
            name = $(this).attr('attr-gtm-title');
            var json = {name: ""};
            json.name = name;
            liste_restaurant.push(json)
        })

        fs.appendFile('liste_restaurants_michelin.json', JSON.stringify(liste_restaurant, null, 4), function(err){
            console.log('File successfully written! - Check your project directory for the final.json file');
        });
    }
  });
}

///var result;
for (var i = 0; i < 35; i++) {
  restaurants(i);
}