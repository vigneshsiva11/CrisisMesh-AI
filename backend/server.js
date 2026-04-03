require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const disasterRoutes = require('./routes/disasterRoutes');
const victimRoutes = require('./routes/victimRoutes');
const heatmapRoutes = require('./routes/heatmapRoutes');
const swarmRoutes = require('./routes/swarmRoutes');
const alertSocket = require('./sockets/alertSocket');

const app = express();
app.use(cors());
app.use(express.json());

const triageRoutes = require('./routes/triageRoutes')
const sosRoutes = require('./routes/sosRoutes')

app.use('/api/triage',triageRoutes)
app.use('/api/sos',sosRoutes)
app.use('/api/disasters', disasterRoutes);
app.use('/api/victims', victimRoutes);
app.use('/api/heatmaps', heatmapRoutes);
app.use('/api/swarm', swarmRoutes);

const server = http.createServer(app);
const io = new Server(server);
alertSocket(io);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crisismesh')
.then(()=>console.log('MongoDB connected'))
.catch(console.error);

server.listen(5000,()=>console.log('Server running'));
