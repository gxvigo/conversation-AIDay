// test object property existence
function checkProperty(obj, prop) {
  var parts = prop.split('.');
  for (var i = 0, l = parts.length; i < l; i++) {
    var part = parts[i];
    if (obj !== null && typeof obj === "object" && part in obj) {
      obj = obj[part];
    } else {
      return false;
    }
  }
  return true;
}



var obj = {
  member: {
    member: {
      value: 42
    }
  }
};
var obj2 = {
  msg: {
    features: {
      sentiment: {
        document: {
          score: 1
        }
      }
    }
  }
};
//console.log(checkProperty(obj2, 'msg.features.sentiment.document.score'));


msg = {
  "_msgid": "3ae30deb.af9962",
  "topic": "",
  "payload": "I am really upset terrible service",
  "error": null,
  "parts": {
    "id": "3ae30deb.af9962",
    "type": "array",
    "count": 2,
    "len": 1,
    "index": 0
  },
  "case_id": "0001",
  "features": {
    "usage": {
      "text_units": 1,
      "text_characters": 34,
      "features": 7
    },
    "sentiment": {
      "document": {
        "score": -0.912124,
        "label": "negative"
      }
    },
    "semantic_roles": [{
      "subject": {
        "text": "I"
      },
      "sentence": "I am really upset terrible service",
      "object": {
        "text": "really upset terrible service",
        "keywords": [{
          "text": "terrible service"
        }]
      },
      "action": {
        "verb": {
          "text": "be",
          "tense": "present"
        },
        "text": "am",
        "normalized": "be"
      }
    }],
    "language": "en",
    "keywords": [{
      "text": "terrible service",
      "sentiment": {
        "score": -0.912124
      },
      "relevance": 0.902721,
      "emotion": {
        "sadness": 0.462285,
        "joy": 0.002207,
        "fear": 0.125395,
        "disgust": 0.17766,
        "anger": 0.575927
      }
    }],
    "entities": [],
    "emotion": {
      "document": {
        "emotion": {
          "sadness": 0.462285,
          "joy": 0.002207,
          "fear": 0.125395,
          "disgust": 0.17766,
          "anger": 0.575927
        }
      }
    },
    "concepts": [],
    "categories": [{
      "score": 0.99946,
      "label": "/health and fitness/disease/headaches and migraines"
    }, {
      "score": 0.0155692,
      "label": "/education/school"
    }, {
      "score": 0.0141217,
      "label": "/family and parenting/children"
    }]
  }
}

console.log(checkProperty(msg, 'features.sentiment.document.label'));
console.log(checkProperty(msg, 'features.sentiment.document.labell') ? msg.features.sentiment.document.label : "NULL");


msg.SENTIMENT = checkProperty(msg, 'features.sentiment.document.label') ? msg.features.sentiment.document.label : "NA";
msg.SENTIMENT_SCORE = checkProperty(msg, 'features.sentiment.document.score') ? msg.features.sentiment.document.score : "NA";
msg.EMOTION_JOY = checkProperty(msg, 'features.emotion.document.emotion.joy') ? msg.features.emotion.document.emotion.joy : "NA";
msg.EMOTION_ANGER = checkProperty(msg, 'features.emotion.document.emotion.anger') ? msg.features.emotion.document.emotion.anger : "NA";
msg.EMOTION_DISGUST = checkProperty(msg, 'features.emotion.document.emotion.disgust') ? msg.features.emotion.document.emotion.disgust : "NA";
msg.EMOTION_SADNESS = checkProperty(msg, 'features.emotion.document.emotion.sadness') ? msg.features.emotion.document.emotion.sadness : "NA";
msg.EMOTION_FEAR = checkProperty(msg, 'features.emotion.document.emotion.fear') ? msg.features.emotion.document.emotion.fear : "NA";
msg.KEYWORD_1 = checkProperty(msg, 'features.keywords.0.text') ? msg.features.keywords[0].text : "NA";
msg.KEYWORD_1_SCORE = checkProperty(msg, 'features.keywords.0.relevance') ? msg.features.keywords[0].relevance : "NA";
msg.KEYWORD_2 = checkProperty(msg, 'features.keywords.1.text') ? msg.features.keywords[1].text : "NA";
msg.KEYWORD_2_SCORE = checkProperty(msg, 'features.keywords.1.relevance') ? msg.features.keywords[1].relevance : "NA";
msg.KEYWORD_3 = checkProperty(msg, 'features.keywords.2.text') ? msg.features.keywords[2].text : "NA";
msg.KEYWORD_3_SCORE = checkProperty(msg, 'features.keywords.2.relevance') ? msg.features.keywords[2].relevance : "NA";
msg.ENTITY_1_Name = checkProperty(msg, 'features.entities.0.text') ? msg.features.entities[0].text : "NA";
msg.entity_1_type = checkProperty(msg, 'features.entities.0.type') ? msg.features.entities[0].type : "NA";
msg.entity_1_score = checkProperty(msg, 'features.entities.0.relevance') ? msg.features.entities[0].relevance : "NA";
msg.ENTITY_2_Name = checkProperty(msg, 'features.entities.1.text') ? msg.features.entities[1].text : "NA";
msg.entity_2_type = checkProperty(msg, 'features.entities.1.type') ? msg.features.entities[1].type : "NA";
msg.entity_2_score = checkProperty(msg, 'features.entities.1.relevance') ? msg.features.entities[1].relevance : "NA";
msg.ENTITY_3_Name = checkProperty(msg, 'features.entities.2.text') ? msg.features.entities[2].text : "NA";
msg.entity_3_type = checkProperty(msg, 'features.entities.2.type') ? msg.features.entities[2].type : "NA";
msg.entity_3_score = checkProperty(msg, 'features.entities.2.relevance') ? msg.features.entities[2].relevance : "NA";
msg.categories_hierarchy = checkProperty(msg, 'features.categories.0.label') ? msg.features.categories[0].label : "NA";
msg.categories_score = checkProperty(msg, 'features.categories.0.score') ? msg.features.categories[0].score : "NA";
msg.concept_1 = checkProperty(msg, 'features.concepts.0.text') ? msg.features.concepts[0].text : "NA";
msg.concept_1_score = checkProperty(msg, 'features.concepts.0.relevance') ? msg.features.concepts[0].relevance : "NA";
msg.concept_2 = checkProperty(msg, 'features.concepts.1.text') ? msg.features.concepts[1].text : "NA";
msg.concept_2_score = checkProperty(msg, 'features.concepts.1.relevance') ? msg.features.concepts[1].relevance : "NA";
msg.concept_3 = checkProperty(msg, 'features.concepts.2.relevance') ? msg.features.concepts[2].relevance : "NA";
msg.concept_3_score = checkProperty(msg, 'features.concepts.2.relevance') ? msg.features.concepts[2].relevance : "NA";







console.log(msg);
return msg;