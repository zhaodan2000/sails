var Newman = require('xdnewman');
var JSON5 = require('json5');
var fs = require('fs');

// read the collectionjson file
var collectionJson = JSON5.parse(fs.readFileSync("test.postman_collection", 'utf8'));
var data = 'data.csv';

console.log(collectionJson);
// console.log(envjson);
console.log(data);

// define Newman options
var newmanOptions = {
    // envJson: envjson, // environment file (in parsed json format)
    // dataFile: data,                    // data file if required
    iterationCount: 1,                    // define the number of times the runner should run
    outputFile: null,            // the file to export to
    responseHandler: "TestResponseHandler", // the response handler to use
    asLibrary: true,         				// this makes sure the exit code is returned as an argument to the callback function
    stopOnError: true
}

// Optional Callback function which will be executed once Newman is done executing all its tasks.
Newman.execute(collectionJson, newmanOptions, function(exitCode, results){
    console.log("exitCode is " + exitCode);
    console.log(results);
});
