const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const socketio = require('socket.io')
const dialogflow = require("@google-cloud/dialogflow")
const uuid = require("uuid");

dotenv.config({path: "./config/config.env"});

const app = express();
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 3000;

const server = app.listen(
    PORT,
    console.log(
        `Server is running on ${process.env.NODE_ENV} at port: ${process.env.PORT}`.yellow.bold
    )
);

const io = socketio(server);
io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('chat message', (message) => {
        console.log(message);

        const callapibot = async (projectId = process.env.PROJECT_ID) => {
            try{
                const sessionId = uuid.v4();
                const sessionClient = new dialogflow.SessionsClient({
                    keyFilename: "./chatbotai-9oky-404cbb9f5a63.json",
                });
                const sessionPath = sessionClient.projectAgentSessionPath(
                    projectId,
                    sessionId
                );
                const request = {
                    session: sessionPath,
                    queryInput: {
                        text: {
                            text: message,
                            languageCode: 'en-US'
                        },
                    },
                };
                const responses = await sessionClient.detectIntent(request);
                const result = responses[0].queryResult.fulfillmentText;
                socket.emit('bot reply', result);

                if(result.intent){
                    console.log(`Intent: ${result.intent.displayName}`);
                }else{
                    console.log('no intent matched');
                }
            } catch(error){
                console.log(error);
            }
        };
        callapibot();
    });
});
