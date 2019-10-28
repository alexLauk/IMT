const express = require('express');
const router = express.Router();
//const fvp = require('./fvp');
const db = require('../data/db');
//const connect = db.connection();


router.get('/register', function(req, res) {
    res.render('register', {
      title: 'Register'
    });
  });

router.post("/register", function(req, res) {
    let user = [
      req.body.userName,
      req.body.userEmail,
      req.body.userPass
  ];


const sql = "INSERT INTO users(name, email, pass) VALUES(?,?,?)";

  db.query(sql, user)
    .then(result =>{
    console.log(result[0]);
    })
    .catch(err =>{
    console.log(err);
    });

  db.end();

    /*
    if(!fvp.validation(user.name, 'name')) responseToUser.push(`<p>Оnly letters, may consist of several words with spaces and contain at least 3 characters</p>`);

   if(!fvp.validation(user.email,'email')) responseToUser.push(`<p>Mail (4-10 characters + @ + 4-10 characters +. + at least 2 characters)
   </p>`);

   if(!fvp.validation(user.pass,'pass')) responseToUser.push(`<p>Password more than 5 characters,
   contains at least one number, one uppercase letter, one lowercase letter and at least one character that is not alphanumeric</p>`);
   console.log(user);
*/
    res.redirect('/');
});

module.exports = router;
