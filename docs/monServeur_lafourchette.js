var request = require('request');
var cheerio = require('cheerio');

var nbPage = 15;

app.get('/scrape', function (req, res) {

    let urls = [];
    for (let y = 0; y < 10; y++) {
        urls.push('http://example.com' + y + '/person.html');
    }

    Promise.all(urls.map(function (url) {
        /*
        return new Promise(resolve, reject) {
            request(url, function (err, resp, body) {
                if (err) {return reject(err);}
                let $ = cheerio.load(body);
                let links = $('#container');
                let name = links.find('span[itemprop="name"]').html(); // name
                resolve({name: name, links: links, url: url});
            })
        }*/
    }).then(function (result) {
        result.forEach(function (obj) {
            if (obj.name == null) {
                console.log(obj.url, "returned null");
            } else {
                console.log(obj.url, obj.name);
            }
        });
    }).catch(function (err) {
    console.log(err);
    })
};
  /*
})

    Promise.all(urls.map(function (url) {
        return new Promise(resolve, reject) {
            request(url, function (err, resp, body) {
                if (err) {return reject(err);}
                let $ = cheerio.load(body);
                let links = $('#container');
                let name = links.find('span[itemprop="name"]').html(); // name
                resolve({name: name, links: links, url: url});
            });
        });
    }).then(function (result) {
    result.forEach(function (obj) {
        if (obj.name == null) {
            console.log(obj.url, "returned null");
        } else {
            console.log(obj.url, obj.name);
            }
        });
    }).catch(function (err) {
    console.log(err);
    }));
})



/*

function scrapePage(){
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
        }
    });
}

function foo(a, b) {

    return new Promise(function (resolve, reject) {
        if (a !== b) {
            const options = {
                url: "https://www.lafourchette.com/restaurant+paris#sort=QUALITY_DESC&page=10",
                headers: {
                    'User-Agent': '\\ "Mozilla/5.0 (Windows NT 10.0; WOW64) ' +
                    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36\\"',
                    Cookie: '\\"datadome=AHrlqAAAAAMAwVzDpbiWd78ALtotww==\\"'
                }
            }
            resolve(request(options, function (error, response, html) {
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
                    })

                    a + b;
                }
            }))
        } else {
            reject("ERROR CODE 321");
        }
    });
};

// Exemple simple de promises
function maPromesse(a, b){
    // Notre fonction retourne une promesse
    return new Promise(function(resolve, reject){
        if(a !== b){
            // Si a est différent de b alors on exécute la fonction "resolve" - on est dans un cas ou on veut
            // indiquer a notre chaine de promesse que le traitement a reussi et éxécuter une fonction en conséquence
            // Dans la chaine, le code executé correspond a .then
            resolve(a+b);
        }
        else {
            // Ici on est dans un cas non désiré ou on va indiquer à notre chaine de promesse que le traitement a échoué
            // Dans la chaine, le traitement effectué correspond a .catch() (comme un try catch)
            reject("ERROR CODE 321");
        }
    });
};

for(let i = 0; i < 10; i++){
    // Exécution de promesses avec un catch et des chainons
    let maConstante = 6;
    maPromesse(i, maConstante)
        .then(result => {
            console.log("RESULT : " + result);
        })
        .catch(error => {
            console.log("ERROR : " + error);
        });
}

for(let i = 0; i < 10; i++){
    // Exécution de promesses avec un catch et des chainons
    let maConstante = 1;
    foo(i, maConstante)
        .then(result => {
            console.log("RESULT : " + result);
        })
        .catch(error => {
            console.log("ERROR : " + error);
        });
}

/*
function restaurants(cpt) {

    return new Promise(function (setFullFilled, setRejected)
    {
        console.log(cpt);
        const url = "https://www.lafourchette.com/restaurant+paris#sort=QUALITY_DESC&page=1";

        const options = {
            url: "https://www.lafourchette.com/restaurant+paris#sort=QUALITY_DESC&page=1",
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

                // Execution de la premiere fonction setFulfilled puisque le traitement s'est bien déroulé
                // Ici on passe la variable json en paramètre de la fonction
                setFullFilled(json);
            } else {
                console.log("Error");
                console.log(response.statusCode);
                // Exécution de la fonction setRejected puisque le traitement s'est mal déroulé
            }
        });
    });
};
*/