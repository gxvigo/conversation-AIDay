'use strict';


var Cloudant = require('cloudant');

var cloudantCredentials = {
    account: '750b9b9f-075e-4289-99e7-c13374d82fc0-bluemix',
    key: 'ctselontiandedivenctedgd',
    pwd: '3882d898e259e7ae986d6764c4adf2529fa4a519'
}

var cloudant = Cloudant({account: cloudantCredentials.account, key: cloudantCredentials.key, password: cloudantCredentials.pwd});

var db = cloudant.db.use('eventtweets');


exports.getTweetsCloudant = function(key, next) {

    db.find({
        selector: {
            emotion: 'joy'
        }
        , fields: ['emotion', 'text']
        , sort: []
        , limit: 5
    }, function (er, result) {
        if (er) {
            next(er);
        }
        
//        console.log('Found %d documents with emotion joy', result.docs.length);
//        console.log('result: ' + JSON.stringify(result));
        
        next(null, result.docs)
    });
}

//getTweetsCloudant('something', function(err, result){
//  if(err) { console.log(err) } else { console.log(result) }
//})