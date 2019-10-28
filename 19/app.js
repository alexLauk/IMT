const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const courses = require("./data/courses.json");


const indexRouter = require('./routes/index');
const coursesRouter = require('./routes/courses');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');


app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // делаем папку публучной
app.use(express.static(__dirname + "/node_modules/bootstrap/dist")); // делаем папку публучной

app.get('/', indexRouter);

app.get('/courses', coursesRouter);

app.get('/register', registerRouter);

app.post('/register', registerRouter);

app.get('/login', loginRouter);

app.post('/login', loginRouter);

app.get("/courses/add", function(req, res) {
  res.render("add");
});

app.post("/courses/add", function(req, res) {
  var course = {
    name: req.body.name,
    id: Date.now()
  };

  courses.push(course);

  res.redirect("/courses");
});

app.get("/courses/edit:id", function(req, res) {
  var course = courses.find(function(course) {
    return course.id === parseInt(req.params.id);
  });

  if (!course) {
    res.sendStatus(404);
    return;
  }

  res.render("edit", { course: course });
});

app.post("/courses/edit:id", function(req, res) {
  var course = courses.find(function(course) {
    return course.id === parseInt(req.params.id);
  });

  if (!course) {
    res.sendStatus(404);
    return;
  }

  course.name = req.body.name;

  res.redirect("/courses");
});

app.get("/courses/delete:id", function(req, res) {
  courses = courses.filter(function(course) {
    return course.id !== parseInt(req.params.id);
  });

  res.redirect("/courses");
});

app.listen(3000, function(){})
