'use strict';

var getTweetsCloudant = require('./cloudantDS').getTweetsCloudant;


console.log(getTweetsCloudant('something', function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log('### in cloudantDS-client - result: ' + JSON.stringify(result));
    }
}));