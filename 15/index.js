const express = require("express");
const bodyParser = require("body-parser");
const Emitter = require("events");
const fs = require("fs");
const chokidar = require('chokidar');
const eol = require('os').EOL;

const app = express();
const emitter = new Emitter();
const file = 'logger.log';

// Something to use when events are received.
const log = console.log.bind(console);

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

// Initialize watcher
const watcher = chokidar.watch('./', { // current directory
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    ignoreInitial: true,
    depth: 10, // limit the scan depth to 10 levels
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100 // File size polling interval
    },
  })


// Add event listeners.
watcher.on('all', (event, path) => {
    log(`New event: ${event}, ${path}`)
  })

// Add event writeToFile
emitter.on('writeToFile', function(data){
    // Check if the file exists in the current directory
    fs.access(file, fs.constants.F_OK, function(error){
        if (error) {
            //if file does not exists, create and write the data to file
            fs.writeFileSync(file, data, function(error){
                if(error) throw error;
            })

        } else {
            // if file does not empty add data to the file from a new line
            fs.appendFileSync(file, eol+data, function(error){
                if(error) throw error;
            });
        }
    });
});

app.get("/", urlencodedParser, function (request, response) {
    //send file html ;
    response.sendFile(__dirname + "/register.html");
});


app.post("/login", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    //call the event and transfer request.body
    emitter.emit('writeToFile','Name: ' + request.body.userName + ', ' + 'Age: ' + request.body.userAge);
   //send message for user;
    response.send(`Data has been transferred on processing`);
});

app.listen(3000);
