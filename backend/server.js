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
const PORT = Number(process.env.PORT) || 5000;
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const triageRoutes = require('./routes/triageRoutes')
const sosRoutes = require('./routes/sosRoutes')
const meshRoutes=require('./routes/meshRoutes')
const dtnRoutes = require('./routes/dtnRoutes')

app.use('/api/triage',triageRoutes)
app.use('/api/sos',sosRoutes)
app.use('/api/disasters', disasterRoutes);
app.use('/api/victims', victimRoutes);
app.use('/api/heatmaps', heatmapRoutes);
app.use('/api/swarm', swarmRoutes);
app.use('/api/swarm/mesh',meshRoutes)
app.use('/api/dtn', dtnRoutes)
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['polling', 'websocket'],
});
alertSocket(io);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crisismesh')
.then(()=>console.log('MongoDB connected'))
.catch(console.error);

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the existing backend process or set a different PORT.`);
    return;
  }

  console.error('Server failed to start:', error);
});

server.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
