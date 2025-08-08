import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:3000',
            // Production URLs
            process.env.FRONTEND_URL,
            // Allow common deployment platforms
            /^https:\/\/.*\.onrender\.com$/,
            /^https:\/\/.*\.vercel\.app$/,
            /^https:\/\/.*\.netlify\.app$/
        ].filter(Boolean),
        credentials: true,
        methods: ['GET', 'POST']
    },
});

const userSocketMap = {};

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on('connection', (socket) => {
    console.log(`[SOCKET] User Connected: ${socket.id}`);

    const userId = socket.handshake.query.userId;

    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        console.log(`[SOCKET] User added to online list: ${userId} (Socket: ${socket.id})`);
    } else {
        console.log(`[SOCKET] Connection without valid userId: ${userId}`);
    }

    console.log(`[SOCKET] Current online users: [${Object.keys(userSocketMap).join(', ')}]`);

    // Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log(`[SOCKET] User Disconnected: ${socket.id}`);

        if (userId && userId !== "undefined") {
            delete userSocketMap[userId];
            console.log(`[SOCKET] User removed from online list: ${userId}`);
        }

        console.log(`[SOCKET] Current online users after disconnect: [${Object.keys(userSocketMap).join(', ')}]`);
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    socket.on('error', (error) => {
        console.error(`[SOCKET] Socket error for ${socket.id}:`, error.message);
    });
});

export { io, app, server };