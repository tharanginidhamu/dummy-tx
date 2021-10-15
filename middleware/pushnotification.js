import {Expo } from 'expo-server-sdk';
import asyncHandler from './async.js'


export const send = asyncHandler(async(req,res,next)=>{


// function send() {
  const expo = new Expo();
  let messages = [];
  var reqObj = req.body;
var pushToken = reqObj.pushToken
  messages.push({
      // to:'ExponentPushToken[PiNVlzDAIRSJCRg2xqfDyD]',
      to:pushToken,
      title:'kunye',
      sound:"default",
      priority:'high',
       body: 'Hi you have received a new message',
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
})


// export default send
// })












// const sendNotifications = async (expo, messages) => {
//   const chunks = expo.chunkPushNotifications(messages);
//   const tickets = [];
//   for (const chunk of chunks) {
//     try {
//       const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//       tickets.push(...ticketChunk);
//     } catch (error) {
//       console.error("error sending notifications", error);
//     }
//   }

//   return tickets;
// }

// export const send = asyncHandler(async(req,res,next)=>{


//   const expo = new Expo();
  
//   // You can either get these tokens from the database
//   // or pass them in your request
// //   const tokens = [];
// var reqObj = req.body;
// var pushToken = reqObj.pushToken
// console.log(pushToken)

//   const messages = [];
  
// //   for(token of pushToken) {
//     if (!Expo.isExpoPushToken(pushToken)) {
//       console.error(`Push token ${pushToken} is not a valid Expo push token`);
//       res.send('Push token is not a valid Expo push token')
//     //   continue;
//     // }
    
//     messages.push({
//       to:pushToken,
//       title: 'Test Title',
//       body: 'Test body'
//     });
//   }
// console.log(messages)
//   try {
//     await sendNotifications(expo, messages)
//   } catch (error) {
//     console.log('error', error);
//   }

//   res.status(200).send({msg:"notification sent successfully"});
  

// })
























// // The Expo push notification service accepts batches of notifications so
// // that you don't need to send 1000 requests to send 1000 notifications. We
// // recommend you batch your notifications to reduce the number of requests
// // and to compress them (notifications with similar content will get
// // compressed).
// let chunks = expo.chunkPushNotifications(messages);
// let tickets = [];
// (async () => {
//   // Send the chunks to the Expo push notification service. There are
//   // different strategies you could use. A simple one is to send one chunk at a
//   // time, which nicely spreads the load out over time:
//   for (let chunk of chunks) {
//     try {
//       let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//       console.log(ticketChunk);
//       tickets.push(...ticketChunk);
//       // NOTE: If a ticket contains an error code in ticket.details.error, you
//       // must handle it appropriately. The error codes are listed in the Expo
//       // documentation:
//       // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
//     } catch (error) {
//       console.error(error);
//     }
//   }

// })
// });
 
 

// import FCM from 'fcm-node'
// import asyncHandler from './async.js'

// export const send = asyncHandler(async(req,res,next)=>{
//     var serverKey = 'AAAAKSozySE:APA91bHpip5gWTdOX1cMXOcIO5_BOm79cxetDcpFHJzEE9InS09UHaSm69o4OIuMgZlMAuo1b10aRuuw5byYqWcZfx6q1H0xwz59FOznluSZCoChHdT2shNTDNSwFT0uV_414vPpjGCW';
//     var fcm = new FCM(serverKey);
//     var reqObj = req.body;
//     var token = reqObj.userToken;
//     console.log("Token Value  :   " + token);
//     var message = {
//         to: token,
//         collapse_key: 'xxxxxxxxxxxxxx',
//         notification: {title: 'hello', body: 'test',sound: 'default', "click_action" : 'FCM_PLUGIN_ACTIVITY'},
//         data: {my_key: 'my value', contents: "abcv/"}
//     };
//      fcm.send(message, function (err, response) {
//         if (err) {
//             res.json({status: 0, message: err});
//             console.log("error : "+err);
//         } else {
//             console.log("MESSAGE SEND");
//             res.json({status: 1, message: response});
//         }
//     }) 

//     })






