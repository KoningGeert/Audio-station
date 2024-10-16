const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Maak een Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Zorg ervoor dat je de public map toegankelijk maakt voor de frontend
app.use(express.static('public'));

// Wanneer een client connectie maakt via Socket.io
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Luister naar de 'pattern' events van een instrumentpagina
    socket.on('pattern', (data) => {
        console.log(`Received pattern for instrument: ${data.instrument}`, data.pattern);

        // Stuur het ontvangen patroon door naar de leiderpagina
        io.emit('pattern', data);
    });

    // Wanneer een client disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start de server op poort 3000 (of een andere poort)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
