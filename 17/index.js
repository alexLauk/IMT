const fvp = require('./fvp');
const express = require('express');
const bodyParser = require('body-parser');
//const valid = validator();
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/', urlencodedParser, function (request, response) {
    //send file html ;
    response.sendFile(__dirname + '/index.html');
});

app.post('/validation', urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);

    let responseToUser =[];
   //use regexp;
   if(!fvp.validation(request.body.userName, 'name')) responseToUser.push(`<p>Оnly letters, may consist of several words with spaces and contain at least 3 characters</p>`);

   if(!fvp.validation(request.body.userEmail,'email')) responseToUser.push(`<p>Mail (4-10 characters + @ + 4-10 characters +. + at least 2 characters)
   </p>`);

   if(!fvp.validation(request.body.userFhone,'mob')) responseToUser.push(`<p>Enter the phone in the format +380 ___ __ __</p>`);

   if(!fvp.validation(request.body.userPassword,'pass')) responseToUser.push(`<p>Password more than 5 characters,
   contains at least one number, one uppercase letter, one lowercase letter and at least one character that is not alphanumeric</p>`);

   response.send(responseToUser.join(''));
});

app.listen(3000);
