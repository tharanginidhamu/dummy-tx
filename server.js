import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ConnectDB from './config/db.js';
import errorHandler from './middleware/error.js';
import GroupConversation from './models/group/conversation.js';
import Conversation from './models/chat/conversation.js'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import { createServer } from 'http'
import {Expo } from 'expo-server-sdk';
import http from 'http'
const app = express();

//Cors
// app.use(cors({origin: true, credentials: true}));
// to connect with frontend url
app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
//     res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
//   });
//Router Files
import auth from './routes/user/auth.js';
import profile from './routes/profile/profile.js';
import chat from './routes/chat/conversation.js'
import group from './routes/group/group.js'
import msg from './routes/message.js'
import accont from './routes/plaidaccount.js'
//Body Parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

//Cookie parser
app.use(cookieParser());

//File uploading
// app.use(fileupload({
//     createParentPath: true
// }));

//set static folder
// app.use(express.static(path.join(process.cwd(),'public')))
app.use('/public', express.static('public'))
console.log(process.cwd() + 'public')

//LOad env 
dotenv.config({ path: './config/config.env' });
//DB Connection
ConnectDB()
//Mount Routers
app.use('/api/v1/auth', auth)
app.use('/api/v1/profile', profile)
app.use('/api/v1/chat', chat)
app.use('/api/v1/group', group)
app.use('/api/v1',msg)
app.use('/api/v1',accont)
//Error Hnalder
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  
  res.send('worked')
});

// socketio part

const server = http.createServer(app);
const io = new Server(server);
io.on("connection", socket => {
  console.log('helo socket connected')
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})
var MessageSchema = mongoose.Schema({}, { strict: false });
export var Message = mongoose.model('Message', MessageSchema);
var senderSchema = mongoose.Schema({}, { strict: false });
var Sender = mongoose.model('Sender', senderSchema);

io.on('connection', (socket) => {
socket.on('message', (msg) => {
    io.emit('my broadcast', { message: msg })
    socket.broadcast.emit('message', msg)
    console.log(msg)
    var postMessage = new Message({
      conversationId: msg.conversationId,
      senderId: msg.senderId,
      text: msg.text,
      pushToken:msg.pushToken,
      createdAt: new Date()
    });

    const expo = new Expo();
  let messages = [];
  messages.push({
      to:'ExponentPushToken[PiNVlzDAIRSJCRg2xqfDyD]',
      // to:pushToken,
      title:'push notification',
      sound:"default",
      priority:'high',
       body: 'technonix',
    channelId: "chat-messages",
  
  })
  console.log(messages)
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
 (async () => {
      for (let chunk of chunks) {
          try {
               let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
              tickets.push(...ticketChunk);
              console.log(tickets)
              console.log('notification sent successfully')
              res.send({result:"notification sent successfully",status:tickets});
              next();
          } catch (error) {
              console.error(error);
            // res.send(error)
          }
      }
  })();
    
   postMessage.save()
    Conversation.find({ "_id": msg.conversationId }).lean().updateOne({}, { $set: { updatedAt: new Date(), "lastText": msg.text } }, { multi: true })
      .exec(function (err, collection) {
        if (err) {
          console.log({ error: err })
        }
        else {
          console.log(collection)
        }
      })
     

  })
})
//get messgaes
// app.get('/api/v1/messages', (req, res) => {
//   Message.find(req.query, (err, messages) => {
//     res.status(200).json({
//       succes: true, msg: messages
//     })
//   })
// })

import io2 from './controller/group/message.js';
io2.attach(server)

import io3 from './controller/group/wallet.js'

import router from './routes/message.js';
import { send } from './middleware/pushnotification.js';

io3.attach(server)



server.listen(PORT, () => {
  console.log('listening on *:5000');
});

