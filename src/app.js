const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/db');

const { API_VERSION, API_NAME } = process.env;

const app = express();

const http = require('http');

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:4200',
    },
});

// Importar rutas
const userRoutes = require('./router/userRouter');
const messageRoutes = require('./router/messageRouter');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('src/uploads'));
app.use(cors());

app.use((req, res, next) => {
    req.io = io;
    req.con = dbConnection;
    next();
});

// Exponer rutas
const basePath = `/${API_NAME}/${API_VERSION}`;
app.use(basePath, userRoutes);
app.use(basePath, messageRoutes);


io.on('connect', (socket) => {
    socket.on('typing', (data) => {
        io.emit('listening', data);
    });

    socket.on('disconnect', () => {
        console.log('Usuario no conectado');
    });
});

module.exports = server;