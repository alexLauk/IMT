var express = require("express");
var bodyParser = require("body-parser");
var courses = require("./data/courses.json");
var app = express();

app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // делаем папку публучной
app.use(express.static(__dirname + "/node_modules/bootstrap/dist")); // делаем папку публучной

app.get("/", function(req, res) {
  res.render("index", { title: "CRUD Demo" });
});

app.get("/courses", function(req, res) {
  res.render("courses", {
    title: "CRUD  Курсы",
    courses: courses
  });
});

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

app.get("/courses/edit/:id", function(req, res) {
  var course = courses.find(function(course) {
    return course.id === parseInt(req.params.id);
  });

  if (!course) {
    res.sendStatus(404);
    return;
  }

  res.render("edit", { course: course });
});

app.post("/courses/edit/:id", function(req, res) {
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

app.get("/courses/delete/:id", function(req, res) {
  courses = courses.filter(function(course) {
    return course.id !== parseInt(req.params.id);
  });

  res.redirect("/courses");
});

app.listen(3000, function(){})
