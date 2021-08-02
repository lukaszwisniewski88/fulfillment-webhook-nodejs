// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Dialogflow fulfillment getting started guide:
// https://dialogflow.com/docs/how-tos/getting-started-fulfillment

"use strict";

const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");

const polishRhymes = [
  {
    trigger: "heja",
    rhymedResponse: "jest na statku mała keja",
  },
  {
    trigger: "hej",
    rhymedResponse: "kup sobie klej",
  },
  {
    trigger: "cześć",
    rhymedResponse: "kucharek sześć",
  },
  {
    trigger: "czesc",
    shouldNotRepeatUser: true,
    rhymedResponse: "Cześć, kucharek sześć",
  },
  {
    trigger: "miły dzień",
    rhymedResponse: "Niech nie spotka Ciebie leń!",
  },
  {
    trigger: "uszanowanie",
    rhymedResponse: "witam Ciebie miły Panie",
  },
  {
    trigger: "tam",
    shouldNotRepeatUser: true,
    rhymedResponse: "co tam co tam, wita Ciebie hipopotam",
  },
];
/**
 * Normalizes the incoming message from the client. Switching it to lower case so it would be findable in our map
 * @param {string} userQuery
 * @returns lower case trimmed user query
 */
function normalizeQuery(userQuery) {
  return userQuery.toLowerCase().trim();
}
/**
 * Searches the map of predefined rhymed responses, if query doesn't fit ir returns fallback message.
 * @param {string} userQuery
 * @returns Polish Rhymed message relevant to the query
 */
function getRhymedResponse(userQuery) {
  const normalizedQuery = normalizeQuery(userQuery);
  const responseRhyme = polishRhymes.find((element) => normalizedQuery.includes(element.trigger));
  if (responseRhyme) {
    return `${responseRhyme.shouldNotRepeatUser ? "" : userQuery + ", "}${responseRhyme.rhymedResponse}`;
  } else return "Witam serdecznie!";
}

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log("Dialogflow Request headers: " + JSON.stringify(request.headers));
  console.log("Dialogflow Request body: " + JSON.stringify(request.body));

  function welcome(agent) {
    const response = getRhymedResponse(agent.query);
    agent.add(response);
  }

  function fallback(agent) {
    agent.add(`Nie rozumiem`);
    agent.add(`Przepraszam, możesz powtórzyć?`);
  }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  agent.handleRequest(intentMap);
});

//export only for unit test
exports.getRhymedResponse = getRhymedResponse;
