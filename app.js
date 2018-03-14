/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'); // app server
var bodyParser = require('body-parser'); // parser for post requests
var Conversation = require('watson-developer-cloud/conversation/v1'); // watson sdk

var getTweetsCloudant = require('./cloudantDS').getTweetsCloudant;  // my module to retrieve Cloudants objects

var app = express();

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());

// Create the service wrapper
var conversation = new Conversation({
    // If unspecified here, the CONVERSATION_USERNAME and CONVERSATION_PASSWORD env properties will be checked
    // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
    //'username': process.env.CONVERSATION_USERNAME,
    //'password': process.env.CONVERSATION_PASSWORD,
    'version_date': '2017-05-26'
});

// Endpoint to be call from the client side
app.post('/api/message', function (req, res) {
    var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
    if (!workspace || workspace === '<workspace-id>') {
        return res.json({
            'output': {
                'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
            }
        });
    }
    var payload = {
        workspace_id: workspace
        , context: req.body.context || {}
        , input: req.body.input || {}
    };

    // Send the input to the conversation service
    conversation.message(payload, function (err, data) {
        if (err) {
            res.status(err.code || 500).json(err);
        }
        updateMessage(payload, data, res);
    });
});

/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */
function updateMessage(input, response, res) {
    console.log('### in updateMessage - response: ' + JSON.stringify(response));
    var responseText = null;
    if (!response.output) {
        response.output = {};
    } else {
        if (response.context.system.dialog_request_counter > 1 && response.intents[0].intent === "socialMediaFeed") {
            
            
            var tweetsString = '';
            getTweetsCloudant('something', function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('### in updateMessage - result: ' + JSON.stringify(result));
                    console.log('### in updateMessage - result.lenght: ' + result.length);
//                    for (var i = 0; i < result.length; i++) {
//                        tweetsString += '<p>' + result[i].text + '</p>';
//                    }
                
                    result.forEach( function (tweet) {
                        tweetsString += '<p>' + tweet.text + '</p>';
                    });
                    ('### in updateMessage - tweetSring: ' + tweetsString);
                    
                    response.output.text = tweetsString;
                    res.json(response);
                }
            });
                       
        } else {
            console.log('### in updateMessage - response from conversation');
            res.json(response);
        }
//        return response;
    }
}


module.exports = app;