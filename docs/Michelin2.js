var request = require('request');
var cheerio = require('cheerio');


function restaurants(nbPage) {
 var url = "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-"+nbPage;

   var options = {
    //url : "https://www.lafourchette.com/search-refine/"+listresto+"?page="+nbPage,
    //url :"https://www.lafourchette.com/search-refine/le cap?page="+nbPage,
    headers: {
   'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36'
    }
};

  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      /*
      $(".resultItem-name").each(function(index, element){
        var a = $(element);
        var CurrentRestaurant = {};
        CurrentRestaurant.name = a.text().trim();
        listresto2.push(CurrentRestaurant);
      });
*/
        $(".poi_card-display-title").filter(function(){
            var a = $(this);
            console.log(a.text().trim())
            console.log(nbPage);
        });

        /*
      $(".resultItem-information").find(".resultItem-saleType").each(function(index, element){
        var a = $(element);
        console.log(a.text().trim())
      });
      */
    }
  });
}

///var result;
for (var i = 0; i < 391; i++) {
  restaurants(i);
}
