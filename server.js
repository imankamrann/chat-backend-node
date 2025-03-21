// // Import the WebSocket library
// const WebSocket = require('ws');
// // Create a WebSocket server that listens on port 8080
// const wss = new WebSocket.Server({ port: 8080 });
// // When a client connects
// wss.on('connection', (ws) => {
// console.log('A client connected!');
// // Send a welcome message to the client
// ws.send('Hello, client! Welcome to the WebSocket server.');
// // When the server receives a message from the client
// ws.on('message', (message) => {
// console.log(`Received message: ${message}`);
// // Echo the received message back to the client
// ws.send(`Server says: ${message}`);
// });
// // When the connection is closed
// ws.on('close', () => {
// console.log('A client disconnected');
// });
// });
// console.log('WebSocket server is running on ws://localhost:8080');

// version 2

// // Import the WebSocket library
// const WebSocket = require('ws');
// // Create a WebSocket server that listens on port 8080
// const wss = new WebSocket.Server({ port: 8080 });
// // Store all connected clients
// const clients = [];
// // When a client connects
// wss.on('connection', (ws) => {
// console.log('A client connected!');
// // Add the new client to the clients array
// clients.push(ws);
// // Send a welcome message to the new client
// ws.send('Hello, client! Welcome to the WebSocket server.');
// // When the server receives a message from the client
// ws.on('message', (message) => {
// console.log(`Received message: ${message}`);
// // Broadcast the message to all connected clients
// clients.forEach(client => {
// if (client !== ws && client.readyState === WebSocket.OPEN) {
// client.send(message);
// }
// });
// });
// // When the connection is closed, remove the client from the clients array
// ws.on('close', () => {
// console.log('A client disconnected');
// const index = clients.indexOf(ws);
// if (index !== -1) {
// clients.splice(index, 1); // Remove the client from the list
// }
// });
// // Handle any WebSocket errors
// ws.on('error', (error) => {
// console.error(`WebSocket error: ${error}`);
// });
// });
// console.log('WebSocket server is running on ws://localhost:8080');


//v3
// // // Load environment variables from .env file
// require('dotenv').config();

// const WebSocket = require('ws');
// const mongoose = require('mongoose');
// const Message = require('./messageModel');

// // Access environment variables
// const mongoURI = process.env.MONGODB_URI;
// const secretKey = process.env.SECRET_KEY;

// // Connect to MongoDB using the URI from .env
// mongoose
//     .connect(mongoURI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Create WebSocket server
// const wss = new WebSocket.Server({ port: 8080 });
// const clients = [];

// wss.on('connection', async (ws) => {
//     console.log('A client connected!');
//     clients.push(ws);

//     // Send message history
//     try {
//         const messages = await Message.find().sort({ timestamp: -1 }).limit(10);
//         messages.reverse().forEach(msg => {
//             ws.send(`${msg.username}: ${msg.message}`);
//         });
//     } catch (error) {
//         console.error('Error retrieving messages:', error);
//     }

//     ws.send('Hello, client! Welcome to the WebSocket server.');

//     ws.on('message', async (message) => {
//         console.log(`Received message: ${message}`);
//         try {
//             const username = 'Anonymous'; // Hardcoded for now; could use secretKey for auth later
//             const newMessage = new Message({ username, message: message.toString() });
//             await newMessage.save();
//             console.log('Message saved to database');

//             clients.forEach(client => {
//                 if (client !== ws && client.readyState === WebSocket.OPEN) {
//                     client.send(message);
//                 }
//             });
//         } catch (error) {
//             console.error('Error saving message:', error);
//         }
//     });

//     ws.on('close', () => {
//         console.log('A client disconnected');
//         const index = clients.indexOf(ws);
//         if (index !== -1) {
//             clients.splice(index, 1);
//         }
//     });

//     ws.on('error', (error) => {
//         console.error(`WebSocket error: ${error}`);
//     });
// });

// console.log('WebSocket server is running on ws://localhost:8080');
// console.log(`Using secret key: ${secretKey}`); // For debugging; remove in production

//v4
// // Load environment variables from .env file
// require('dotenv').config();

// const WebSocket = require('ws');
// const mongoose = require('mongoose');
// const Message = require('./messageModel');

// // Access environment variables
// const mongoURI = process.env.MONGODB_URI;
// const secretKey = process.env.SECRET_KEY;

// // Connect to MongoDB using the URI from .env
// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('MongoademiaDB connection error:', err));

// // Create a WebSocket server
// const wss = new WebSocket.Server({ port: 8080 });
// // Store all connected clients
// const clients = [];

// // When a client connects
// wss.on('connection', (ws) => {
//     console.log('A client connected!');
//     // Add the new client to the clients array
//     clients.push(ws);
//     // Send a welcome message to the new client
//     ws.send('Hello, client! Welcome to the WebSocket server.');

//     // When the server receives a message from the client
//     ws.on('message', async (message) => {
//         console.log(`Received message: ${message}`);
//         // Save the message to the database
//         try {
//             const username = 'Anonymous'; // You can extract this from the client if needed
//             const newMessage = new Message({ username, message: message.toString() }); // Convert message to string
//             await newMessage.save(); // Save the message to MongoDB
//             console.log('Message saved to database');
//             // Broadcast the message to all connected clients
//             clients.forEach(client => {
//                 if (client !== ws && client.readyState === WebSocket.OPEN) {
//                     client.send(message);
//                 }
//             });
//         } catch (error) {
//             console.error('Error saving message:', error);
//         }
//     });

//     // When the connection is closed, remove the client from the clients array
//     ws.on('close', () => {
//         console.log('A client disconnected');
//         const index = clients.indexOf(ws);
//         if (index !== -1) {
//             clients.splice(index, 1); // Remove the client from the list
//         }
//     });

//     // Handle any WebSocket errors
//     ws.on('error', (error) => {
//         console.error(`WebSocket error: ${error}`);
//     });
// });

// console.log('WebSocket server is running on ws://localhost:8080');
// console.log(`Using secret key: ${secretKey}`); // For debugging; remove in production

// //v5 WORKING
// require('dotenv').config();

// const WebSocket = require('ws');
// const mongoose = require('mongoose');
// const Message = require('./messageModel');

// // Access environment variables
// const mongoURI = process.env.MONGODB_URI;
// const secretKey = process.env.SECRET_KEY;

// // Debug: Log environment variables
// console.log('MONGODB_URI:', mongoURI);
// console.log('SECRET_KEY:', secretKey);

// // Check if mongoURI is defined
// if (!mongoURI) {
//     console.error('Error: MONGODB_URI is not defined in the .env file');
//     process.exit(1);
// }

// // Connect to MongoDB
// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Create a WebSocket server
// const wss = new WebSocket.Server({ port: 8080 });
// const clients = [];

// wss.on('connection', async (ws) => {
//     console.log('A client connected!');
//     clients.push(ws);

//     // Step 4: Retrieve and send the last 10 messages from the database
//     try {
//         const messages = await Message.find().sort({ timestamp: -1 }).limit(10);
//         messages.reverse().forEach(msg => {
//             ws.send(`${msg.username}: ${msg.message}`);
//         });
//     } catch (error) {
//         console.error('Error retrieving messages:', error);
//     }

//     // Send a welcome message to the new client
//     ws.send('Hello, client! Welcome to the WebSocket server.');

//     ws.on('message', async (message) => {
//         console.log(`Received message: ${message}`);
//         try {
//             const username = 'Anonymous';
//             const newMessage = new Message({ username, message: message.toString() });
//             await newMessage.save();
//             console.log('Message saved to database');
//             clients.forEach(client => {
//                 if (client !== ws && client.readyState === WebSocket.OPEN) {
//                     client.send(message);
//                 }
//             });
//         } catch (error) {
//             console.error('Error saving message:', error);
//         }
//     });

//     ws.on('close', () => {
//         console.log('A client disconnected');
//         const index = clients.indexOf(ws);
//         if (index !== -1) {
//             clients.splice(index, 1);
//         }
//     });

//     ws.on('error', (error) => {
//         console.error(`WebSocket error: ${error}`);
//     });
// });

// console.log('WebSocket server is running on ws://localhost:8080');
// console.log(`Using secret key: ${secretKey}`);

// v6 with timestamp and client names

// require('dotenv').config();

// const WebSocket = require('ws');
// const mongoose = require('mongoose');
// const Message = require('./messageModel');

// const mongoURI = process.env.MONGODB_URI;
// const secretKey = process.env.SECRET_KEY;

// if (!mongoURI) {
//     console.error('Error: MONGODB_URI is not defined in the .env file');
//     process.exit(1);
// }

// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('MongoDB connection error:', err));

// const wss = new WebSocket.Server({ port: 8080 });
// const clients = new Map(); // Map to store client WebSocket objects and their usernames

// wss.on('connection', async (ws) => {
//     console.log('A client connected!');
//     clients.set(ws, 'Anonymous'); // Default username

//     try {
//         const messages = await Message.find().sort({ timestamp: -1 }).limit(10);
//         messages.reverse().forEach(msg => {
//             ws.send(JSON.stringify({
//                 username: msg.username,
//                 message: msg.message,
//                 timestamp: msg.timestamp
//             }));
//         });
//     } catch (error) {
//         console.error('Error retrieving messages:', error);
//     }

//     ws.send(JSON.stringify({
//         username: 'Server',
//         message: 'Hello, client! Welcome to the WebSocket server.',
//         timestamp: new Date().toISOString()
//     }));

//     ws.on('message', async (message) => {
//         try {
//             const messageData = JSON.parse(message);
            
//             if (messageData.type === 'setUsername') {
//                 clients.set(ws, messageData.username);
//                 console.log(`Client set username to: ${messageData.username}`);
//                 return;
//             }

//             console.log(`Received message from ${clients.get(ws)}: ${messageData.message}`);
            
//             const newMessage = new Message({
//                 username: clients.get(ws),
//                 message: messageData.message,
//                 timestamp: messageData.timestamp
//             });
//             await newMessage.save();
//             console.log('Message saved to database');

//             // Broadcast to all clients except sender
//             clients.forEach((username, client) => {
//                 if (client !== ws && client.readyState === WebSocket.OPEN) {
//                     client.send(JSON.stringify({
//                         username: clients.get(ws),
//                         message: messageData.message,
//                         timestamp: messageData.timestamp
//                     }));
//                 }
//             });
//         } catch (error) {
//             console.error('Error processing message:', error);
//         }
//     });

//     ws.on('close', () => {
//         console.log(`Client ${clients.get(ws)} disconnected`);
//         clients.delete(ws);
//     });

//     ws.on('error', (error) => {
//         console.error(`WebSocket error: ${error}`);
//     });
// });

// console.log('WebSocket server is running on ws://localhost:8080');

//v7
require('dotenv').config();

const WebSocket = require('ws');
const mongoose = require('mongoose');
const Message = require('./messageModel');

const mongoURI = process.env.MONGODB_URI;
const secretKey = process.env.SECRET_KEY;

if (!mongoURI) {
    console.error('Error: MONGODB_URI is not defined in the .env file');
    process.exit(1);
}

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Map();

wss.on('connection', async (ws) => {
    console.log('A client connected!');
    clients.set(ws, 'Anonymous');

    // Send message history immediately on connection
    try {
        const messages = await Message.find().sort({ timestamp: -1 }).limit(10);
        messages.reverse().forEach(msg => {
            ws.send(JSON.stringify({
                type: "message",
                username: msg.username,
                message: msg.message,
                timestamp: msg.timestamp.toISOString()
            }));
        });
    } catch (error) {
        console.error('Error retrieving messages:', error);
    }

    ws.send(JSON.stringify({
        type: "message",
        username: 'Server',
        message: 'Hello, client! Welcome to the WebSocket server.',
        timestamp: new Date().toISOString()
    }));

    ws.on('message', async (message) => {
        try {
            const messageData = JSON.parse(message);
            
            if (messageData.type === 'setUsername') {
                clients.set(ws, messageData.username);
                console.log(`Client set username to: ${messageData.username}`);
                return;
            }

            if (messageData.type === 'history') {
                // This is optional since we send history on connect anyway
                const messages = await Message.find().sort({ timestamp: -1 }).limit(10);
                messages.reverse().forEach(msg => {
                    ws.send(JSON.stringify({
                        type: "message",
                        username: msg.username,
                        message: msg.message,
                        timestamp: msg.timestamp.toISOString()
                    }));
                });
                return;
            }

            console.log(`Received message from ${clients.get(ws)}: ${messageData.message}`);
            
            const newMessage = new Message({
                username: clients.get(ws),
                message: messageData.message,
                timestamp: messageData.timestamp
            });
            await newMessage.save();
            console.log('Message saved to database');

            clients.forEach((username, client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        type: "message",
                        username: clients.get(ws),
                        message: messageData.message,
                        timestamp: messageData.timestamp
                    }));
                }
            });
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    ws.on('close', () => {
        console.log(`Client ${clients.get(ws)} disconnected`);
        clients.delete(ws);
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error}`);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');