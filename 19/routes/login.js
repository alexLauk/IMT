const express = require('express');
const router = express.Router();
//const fvp = require('./fvp');
const db = require('../data/db');
//const connect = db.connection();


router.get('/login', function(req, res) {
    res.render('login', {
      title: 'Login'
    });
  });

router.post("/login", function(req, res) {
    let user = [
      req.body.userEmail,
      req.body.userPass
  ];


const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, user, function(err, results) {
    if(err) console.log(err);
    console.log(results);
    if(results.length !== 0){
        console.log('User has already exists');

      if(results[0].pass === user[1]){
        console.log('Pass is confirm');
      } else {
        console.log('Pass no matching');
      }
    } else {
        console.log('User has not found');
    }
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
