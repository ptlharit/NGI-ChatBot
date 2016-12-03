'use strict'
var express = require("express");
var router = express.Router();

var wit = require("node-wit").Wit;
var interactive = require("node-wit").interactive;
var globalResponse;
var name;
var business_type;

//const client = new wit({accessToken: "UIUUGL6JDN22IOMDXX6YSFKGO7K732OS"});
const client = new wit({
    accessToken: "UIUUGL6JDN22IOMDXX6YSFKGO7K732OS",
    actions: {
        send(request, response) {
            return new Promise(function(resolve, reject) {
                console.log('sending...', JSON.stringify(response));
                globalResponse = response;
                return resolve();
            })
        },
        storeContact({
            sessionId,
            context,
            text,
            entities
        }) {
            // console.log(`Session ${sessionId} received ${text}`);
            // console.log(`The current context is ${JSON.stringify(context)}`);
            // console.log(`Wit extracted ${JSON.stringify(entities)}`);
            name = text
            return Promise.resolve(context);
        }
        // storeBusinessType({sessionId, context, text, entities}) {
        //   business_type = text
        //   return Promise.resolve(context);
        // }
    }
});

router.get('/userMessage/:message', function(req, res, next) {
    console.log(req.params.message);

    client.runActions('my-user-session-42', req.params.message, {})
        .then((context1) => {
            console.log('The session state is: ' + JSON.stringify(context1));
            res.status(200).send(globalResponse.text)
            return client.runActions('my-user-session-42', req.params.message, {});
        })
        .catch((e) => {
            console.log('Oops! Got an error: ' + e);
            res.status(200).send("I am sorry, I did not quite catch that.")
        });
    // client.send(req.params.message, function (text, quickreplies) {
    //   console.log(text)
    // }), myAction("","",req.params.message,"");
    /*
      client.message(req.params.message, {})
      .then((data) => {
        console.log(data);
        // console.log("");
        //console.log(data.entities.intent[0])  //Retrieves the value after the user inputs name
        if(data.entities.contact != undefined) {
          console.log("Do contact storage here");
          console.log(data.entities.contact[0])


        }

        else if (data.entities.intent != undefined) {
          console.log("do intent storage here")
          console.log(data.entities.intent[0])

          if(data.entities.intent[0].value == "loan") {
            console.log("LOAN SHIT HERE")
          } else if (data.entities.intent[0].value == "business_plan") {

            console.log("Business plan crap here")
            console.log(data.entities.intent[0].value)
          } else if (data.entities.intent[0].value == "start_business") {
            console.log("Starting business bullshit here")
          } else {
            console.log("wtf is even happening anymore")
          }
        }

        else {
          console.log("Some random nonsense happened")
        }

      })

      .catch(console.error);
      */
})
interactive(client)

module.exports = router;
