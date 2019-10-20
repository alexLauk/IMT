const validator = require('./validator');
const express = require('express');
const bodyParser = require('body-parser');
//const valid = validator();
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/', urlencodedParser, function (request, response) {
    //send file html ;
    response.sendFile(__dirname + '/index.html');
});

app.post('/validate', urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);

    let responseToUser =[];
   //use regexp;
   if(!validator.name(request.body.userName)) responseToUser.push(`<p>Оnly letters, may consist of several words with spaces and contain at least 3 characters</p>`);

   if(!validator.email(request.body.userEmail)) responseToUser.push(`<p>Mail (4-10 characters + @ + 4-10 characters +. + at least 2 characters)
   </p>`);

   if(!validator.mob(request.body.userFhone)) responseToUser.push(`<p>Enter the phone in the format +380 ___ __ __</p>`);

   if(!validator.pass(request.body.userPassword)) responseToUser.push(`<p>Password more than 5 characters,
   contains at least one number, one uppercase letter, one lowercase letter and at least one character that is not alphanumeric</p>`);

   response.send(responseToUser.join(''));
});

app.listen(3000);
