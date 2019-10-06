const http = require('http');
const fs = require('fs');
const request = require('request');

http.createServer(function(req, res){

    res.setHeader('Content-Type', 'text/html; charset=utf-8;');

    if(req.url === '/home' || req.url === '/'){
        res.write('<h2>Hello World</h2>');
        res.end();
    }
    else if(req.url ==='/about'){
        //res.write('<h2>About<h2>')
        res.write('<p>Url: ' + req.url +'</p>');
        res.write('<p>Type of request: ' + req.method +'</p>');
        res.write('<p>User-Agent: ' + req.headers['user-agent'] +'</p>');
        res.end();
    }
    else if(req.url === '/currency'){

        // cоздаем GET запрос
        request({
            method: 'GET',
            url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3&fbclid=IwAR28vaK18w5_ZDwhGTzyv4PCL0qA58u3ISu6Na5ntYWFA788MHC0cp3fkww'
            },

            function (error, response, body) {

            // анализируем HTTP-статус ответа
            if (!error && response.statusCode == 200) {

                // если всё ОК, получаем содержимое файла
                fs.readFile('index.html', 'utf8', function(err, data){

                    if(err){
                        res.statusCode = 404;
                        res.end('File not found!');
                    }
                    else{
                        // если всё ОК, парсим полученный ответ
                        curr = JSON.parse(body);

                        let currency =[];

                        // меняем плейсхолдер из файла на полученные данные из response с помощью метода data.replace().
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
