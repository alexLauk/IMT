const express = require('express');
const router = express.Router();

router.get('/courses', function(req, res) {
    res.render('courses', {
      title: 'Courses',
      courses: courses
    });
  });

  module.exports = router;
