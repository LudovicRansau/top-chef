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

		/*
		Bien que cette fonction soit ASYNCHRONE, les fonctions setFulfilled et setRejected sont exécutées dans le callback de request :
		Le traitement est donc bien effectué AVANT de renvoyer des valeurs à notre chaine de promesse
		*/
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

for(let cpt = 1; cpt <= 10; cpt++)
{
    restaurants(cpt)
	.then(resultat => {
		// Insérer le traitement a faire avec le résultat - correspond à la fonction setFulfilled() définie plus haut
		// Ici resultat correspond au paramètre json retourné plus haut
		fs.writeFile('output.json', JSON.stringify(resultat, null, 4), function (err) {
                    console.log('File successfully written! - Check your project directory for the output.json file');
                });
	});
}




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



// Exécution de ma promesse
maPromesse(1, 3)
	// Chaine exécutée lors du resolve, c'est a dire lorsque notre traitement reussi et après le traitement (param correspond à a+b)
	.then(param => {
		console.log("Ok : " + param);
	});
	
// Exécution d'une promesse qui échoue
maPromesse(1, 1)
	// Action effectuée en cas d'échec du traitement de la promesse (error correspond à "ERROR CODE 321" donné en paramètre lors du reject())
	.catch(error => {
		console.log(error);
	});
	
// Exécution d'une promesse avec plusieurs chaines
maPromesse(1, 3)
	.then(result => {
		console.log("Premiere valeur : " + result);
		return 1066857;
	})
	.then(maValeur => {
		// Affiche 1066857
		console.log("Deuxieme Valeur : " + maValeur);
	});
	
// Exécution de promesses dans des promesses
maPromesse(1, 3)
	.then(result => {
		console.log("Premier résultat : " + result);
		return maPromesse(1, 6);
	})
	.then(deuxiemeResult => {
		// Affiche le résultat de maPromesse(1, 6) - la suite de la promesse imbriquée est bien executée ici vu qu'on a fait return maPromesse(1, 6);
		// Si on avait fait un reject dans maPromesse(1, 6); il aurait fallu ajouter une clause catch à la suite de cette chaine
		console.log("Deuxieme Resultat : " + deuxiemeResult);
		// On pourrait aussi faire comme ça
		maPromesse(deuxiemeResult, 10)
			.then(troisiemeResult => {
				// En cas d'erreur il faudrait mettre le catch a la suite de cette chaine
				console.log("Troisieme result imbriqué : " + troisiemeResult);
			});
	});
	
	
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
	
