var Newman = require('newman');
var JSON5 = require('json5');
var fs = require('fs');

// read the collectionjson file
var collectionJson = JSON5.parse(fs.readFileSync("collection.json", 'utf8'));

// define Newman options
newmanOptions = {
    envJson: JSON5.parse(fs.readFileSync("envjson.json", "utf-8")), // environment file (in parsed json format)
    dataFile: data.csv,                    // data file if required
    iterationCount: 10,                    // define the number of times the runner should run
    outputFile: "outfile.json",            // the file to export to
    responseHandler: "TestResponseHandler", // the response handler to use
    asLibrary: true,         				// this makes sure the exit code is returned as an argument to the callback function
    stopOnError: true
}

// Optional Callback function which will be executed once Newman is done executing all its tasks.
Newman.execute(collectionJson, newmanOptions, function(res){
    console.log(res);
});

