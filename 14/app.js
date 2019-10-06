const http = require('http');
const fs = require('fs');
const request = require('request');
const currUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3&fbclid=IwAR28vaK18w5_ZDwhGTzyv4PCL0qA58u3ISu6Na5ntYWFA788MHC0cp3fkww'

http.createServer(function(req, res){

    res.setHeader('Content-Type', 'text/html; charset=utf-8;');

    if(req.url === '/home' || req.url === '/'){
        res.write('<h2>Hello World</h2>');
        res.end();
    }
    else if(req.url ==='/about'){
        res.write('<h2>About<h2>')
        res.write('Url: ' + req.url);
        res.write('Type of request: ' + req.method);
        res.write('User-Agent: ' + req.headers['user-agent']);
        res.end();
    }
    else if(req.url === '/currency'){

        request({
            method: 'GET',
            url: currUrl,
            qs: {
              param: 'edit',
              value: 100
            }
            }, function (error, response, body) {

            if (!error && response.statusCode == 200) {

                fs.readFile('index.html', 'utf8', function(err, data){

                    if(err){
                        res.statusCode = 404;
                        res.end('File not found!');
                    }
                    else{
                        curr = JSON.parse(body);

                        let currency =[];

                        for(let i=0; i<curr.length; i++){

                             currency.push('<p>Currency: ' + curr[i].ccy + ' - UAH<p>'+'\n<p>Buy: ' + curr[i].buy + '<p>'+'\n<p>Sale: ' + curr[i].sale + '<p>');
                        }
                        data = data.replace('{Currency}', currency.join(''));

                        res.end(data);
                    }
                });
           }
        });
    }
    else{
        res.write('<h2>Not found</h2>');
        res.end();
    }
}).listen(3000);
